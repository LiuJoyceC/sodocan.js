var methodsDB = require('../Databases/Models/methods.js');
var passport = require('passport');
var jwt = require('jwt-simple');

if (!process.env.TOKEN_SECRET) {
  var authConfig = require('../authenticationConfig');
}

/* Server Response Actions */

var send404 = exports.send404 = function(res, errorMessageOrObj) {
  if (typeof errorMessageOrObj === 'string') {
    log('Error', errorMessageOrObj);
  } else {
    console.error(errorMessageOrObj);
  }
  console.error(new Error('404').stack);
  res.sendStatus(404);
};

/* Database Actions */

// successC (required), notFoundC, and errorC are all callback functions
// successC takes the found reference as a parameter
// errorC takes the error as a parameter
// if sortObj is null, then findOne is used instead of find
var mongoFind = function(res, searchObj, sortObj, successC, notFoundC, errorC) {
  notFoundC = notFoundC || function() {send404(res, 'reference not found');};
  errorC = errorC || function(err) {send404(res, err);};

  var finder = sortObj
    ? methodsDB.find(searchObj).sort(sortObj).lean()
    : methodsDB.findOne(searchObj);

  finder.exec(function(error, references) {
    if (error) {
      errorC(error);
    } else if (sortObj ? !references.length : !references) {
      notFoundC();
    } else {
      successC(references);
    }
  });
};

/* Other Helpers */

var parseApiPath = exports.parseApiPath = function(path) {
  var pathArray = path.split('/');
  var pathArrayPointer = 0;
  var next = function() { //next moves us down the array one
    pathArrayPointer++;
    return pathArray[pathArrayPointer];
  };

  if (next() !== 'api') {
    log('must use api word in url');
    return;
  }

  var searchObject = {}; //will be sent through mongoose
  searchObject.project = next();
  if (!searchObject.project) { //if you didn't give us a project name (just /api)
    log('no project name provided');
    return;
  }

  var nextPath = next();
  if (nextPath === 'ref') { //if the very next section says ref, we then pull out the method name
    searchObject.functionName = next();//this Means that you are looking for a specif method
    nextPath = next();  //as opposed all methods of a context, or in general (all methods)
  }

  var contexts = {};
  var context = 'all'; //setting default context
  do {
    if (!nextPath
      || nextPath === 'all'
      || nextPath.slice(0,7) === 'entryID'
      || nextPath.slice(0,9) === 'commentID'
      || !isNaN(+nextPath)) {
      //the first time through, this will put an empty array into context
      //ex (contexts[description] = [])
      contexts[context] = contexts[context] || [];
      if (nextPath) { // not necessary, since will just push undefined to array
        //pushes the depth, comment, all, or entry ID into context
        //{example:[1,all]}
        contexts[context].push(nextPath);
      }
    } else {
      //we've entered a new context, so switch the context for contexts object
      context = nextPath;
      contexts[context] = contexts[context] || [];
    }
    nextPath = next();
  } while (nextPath);

  return {
    searchObject: searchObject,
    contexts: contexts
  };
};

var convertToDBForm = exports.convertToDBForm = function(projectName, skeleObj, username) {
  var dbForm = {
    project: projectName,
    functionName: skeleObj.functionName,
    group: skeleObj.group,
    username: username,
    timestamp: new Date(),
    reference: {
      params: skeleObj.params,
      returns: skeleObj.returns
    },
    explanations: {descriptions: [], examples: [], tips:[]}
  };
  return dbForm;
};

var runAfterAsync = exports.runAfterAsync = function(res, numOfCallbacks) {
  var finished = 0;
  var failed = false;
  return function(err){
    if(!failed && !err){
     finished++;
      if(finished === numOfCallbacks){
        res.sendStatus(202);
      }
    }
    if(err && !failed){
      failed = true;
      send404(res, err);
    }
  };
};

var hashCode = function(string) {
  var hash = 0, i, chr, len;
  if (string.length === 0){
   return hash;
  }
  for (i = 0, len = string.length; i < len; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

/* Uncategorized so far */
/*
sodocan.com/api/*:projectName/ref/:functionName/:explanationType/:numEntriesOrEntryID/:numCommentsOrCommentID
api/:projectName/1/all
*/
var getReferences = exports.getReferences = function(path, res) {

  var parsedPath = parseApiPath(path);
  if (!parsedPath) {
    send404(res, 'Path parsing failed');
    return;
  }

  // mongoFind(res, searchObj, sortObj, successC, notFoundC, errorC)
  mongoFind(res, parsedPath.searchObject, {functionName: 1}, function(references) {
    var contexts = parsedPath.contexts;

    var newReferences = references.map(function(reference) {
      var entriesObj = reference.explanations;
      for (var context in entriesObj) {
        //go through each contexts (not just the ones mentioned)
        //if a specific context is mentioned, use it's depth
        //otherwise use the one specified in all
        var depthSpecs = contexts[context] || contexts.all;
        if (depthSpecs) {
          //default depth is 1, default addtion is 0
          var entryDepth = depthSpecs[0] || '1';
          var addDepth = depthSpecs[1] || '0';
          var contextArray;
          //the prefix entryID means we are looking for a specific ID
          if (entryDepth.slice(0,7) === 'entryID') {
            id = +entryDepth.slice(8);
            var found = false;
            for (var i = 0; i < entriesObj[context].length; i++) {
              if (entriesObj[context][i].entryID === id) {
                //search the all entries for that method until you find the specific one
                contextArray = entriesObj[context] = [entriesObj[context][i]];
                found = true;
                break;
              }
            }
            if (!found) {
              contextArray = entriesObj[context] = [];
            }

          } else if (entryDepth === 'all') {
            contextArray = entriesObj[context];
          } else { // else entryDepth is a number
            //so we get the n (depth) amount of entries
            contextArray = entriesObj[context] = entriesObj[context].slice(0, +entryDepth);
          }
          //checking to see if we want a specific comment
          //very similar to what we did for entries
          for (var i = 0; i < contextArray.length; i++) {
            if (addDepth.slice(0,9) === 'commentID') {
              id = +addDepth.slice(10);
              var commentsArray = contextArray[i].comments;
              var foundAdd = false;
              for (var j = 0; i < commentsArray.length; j++) {
                if (commentsArray[j].commentID === id) {
                  contextArray[i].comments = [commentsArray[j]];
                  foundAdd = true;
                  break;
                }
              }
              if (!foundAdd) {
                contextArray[i].comments = [];
              }

            } else if(addDepth !== 'all'){
              contextArray[i].comments = contextArray[i].comments.slice(0, +addDepth);
            }
          }
        } else {//if there was no depth, that means we don't want it. delete.

          delete entriesObj[context];
        }
      }
      return reference;
    });

    res.send(newReferences);
  });
};

var upvote = exports.upvote = function(upvoteInfo, res) {
  /*
  {
    username:
    project:
    functionName:
    context:
    entryID:
    [commentID:]
  }
  */
  var searchObject = {
    project: upvoteInfo.project,
    functionName: upvoteInfo.functionName
  };

  if (!searchObject.project || !searchObject.functionName) {
    send404(res, 'project or functionName not provided');
    return;
  }

  var username = upvoteInfo.username;

  // mongoFind(res, searchObj, sortObj, successC, notFoundC, errorC)
  mongoFind(res, searchObject, null, function(reference) {
    var context = upvoteInfo.context;
    var entryID = upvoteInfo.entryID;

    var commentID = upvoteInfo.commentID;

    var entryFound = false;
    var explanations = JSON.parse(JSON.stringify(reference.explanations));
    var contextArray = explanations[context];
    if (!contextArray) {
      send404(res, 'context not found');
      return;
    }
    for (var i = 0; i < contextArray.length; i++) {
      if (contextArray[i].entryID === entryID) {
        entryFound = true;
        if (!commentID) {
          var entry = contextArray[i];
          if (!entry.upvoters.hasOwnProperty(username) && username !== entry.username) {
            entry.upvotes++;
            entry.upvoters[username] = 1;

            while (i > 0 && entry.upvotes > contextArray[i-1].upvotes) {
              contextArray[i] = contextArray[i-1];
              contextArray[i-1] = entry;
              i--;
            }
          } else {
            send404(res, 'cannot vote more than once or for your own entry');
            return;
          }
        } else {
          var commentFound = false;
          var comments = contextArray[i].comments;
          for (var j = 0; j < comments.length; j++) {
            var comment = comments[j];
            if (comment.commentID === commentID) {
              commentFound = true;
              if (!comment.upvoters.hasOwnProperty(username) && username !== comment.username) {
                comment.upvotes++;
                comment.upvoters[username] = 1;
                while (j > 0 && comment.upvotes > comments[j-1].upvotes) {
                  comments[j] = comments[j-1];
                  comments[j-1] = comment;
                  j--;
                }
              } else {
                send404(res, 'cannot vote more than once or for your own entry');
                return;
              }
              break;
            }
          }
          if (!commentFound) {
            send404(res, 'commentID not found');
            return;
          }
        }
        break;
      }
    }
    if (!entryFound) {
      send404(res, 'entryID not found');
      return;
    }

    // Mongoose will not save the modifications to the explanations object
    // unless you reassign its value to a different object
    reference.explanations = explanations;

    reference.save(function(err) {
      if (err) {
        send404(res, err);
      } else {
        res.sendStatus(202);
      }
    });
  });
};

var addEntry = exports.addEntry = function(addEntryInfo, res) {
  /*
  {
    username:
    project:
    functionName:
    context:
    text:
    [entryID:]
  }
  */

  if (!addEntryInfo.text || !addEntryInfo.text.trim()) {
    send404(res, 'no content in text');
    return;
  }

  if (!addEntryInfo.project || !addEntryInfo.functionName) {
    send404(res, 'project or functionName not provided');
    return;
  }

  var searchObject = {
    project: addEntryInfo.project,
    functionName: addEntryInfo.functionName
  };

  // mongoFind(res, searchObj, sortObj, successC, notFoundC, errorC)
  mongoFind(res, searchObject, null, function(reference) {
    var context = addEntryInfo.context;
    var explanations = JSON.parse(JSON.stringify(reference.explanations));
    var contextArray = explanations[context];
    if (!contextArray) {
      send404(res, 'context not found');
      return;
    }
    var id = hashCode(addEntryInfo.text);

    var entryID = addEntryInfo.entryID;
    if (entryID) {
      var entryFound = false;
      for (var i = 0; i < contextArray.length; i++) {
        var entry = contextArray[i];
        if (entry.entryID === entryID) {
          entryFound = true;
          var comments = entry.comments;
          var ids = [];
          for (var j = 0; j < comments.length; j++) {
            if (comments[j].text === addEntryInfo.text) {
              send404(res, 'duplicate entry');
              return;
            }
            ids.push(comments[j].commentID);
          }
          while (ids.indexOf(id) !== -1) {
            id++;
          }
          var comment = {
            username: addEntryInfo.username,
            commentID: id,
            timestamp: new Date(),
            text: addEntryInfo.text,
            upvotes: 0,
            upvoters: {}
          };
          comments.push(comment);
          break;
        }
      }
      if (!entryFound) {
        send404(res, 'entryID not found');
        return;
      }
    } else {
      var ids = [];
      for (var i = 0; i < contextArray.length; i++) {
        var currEntry = contextArray[i];
        if (currEntry.text === addEntryInfo.text) {
          send404(res, 'duplicate entry');
          return;
        }
        ids.push(currEntry.entryID);
      }
      while (ids.indexOf(id) !== -1) {
        id++;
      }
      var entry = {
        username: addEntryInfo.username,
        entryID: id,
        timestamp: new Date(),
        text: addEntryInfo.text,
        upvotes: 0,
        upvoters: {},
        comments: []
      };
      contextArray.push(entry);
    }

    // Mongoose will not save the modifications to the explanations object
    // unless you reassign its value to a different object
    reference.explanations = explanations;

    reference.save(function(err) {
      if (err) {
        send404(res, err);
      } else {
        res.sendStatus(202);
      }
    });
  });
};

var editEntry = exports.editEntry = function(editEntryInfo, res) {
  /*
  {
    username:
    project:
    functionName:
    context:
    entryID:
    text:
    delete:
    [commentID:]
  }
  */
  var text = editEntryInfo.text;
  if (!editEntryInfo.delete && (!text || !text.trim())) {
    send404(res, 'no content in text');
    return;
  }

  if (!editEntryInfo.project || !editEntryInfo.functionName) {
    send404(res, 'project or functionName not provided');
    return;
  }

  var searchObject = {
    project: editEntryInfo.project,
    functionName: editEntryInfo.functionName
  };

  // mongoFind(res, searchObj, sortObj, successC, notFoundC, errorC)
  mongoFind(res, searchObject, null, function(reference) {
    // var validUpdate;
    var context = editEntryInfo.context;
    var entryID = editEntryInfo.entryID;

    var commentID = editEntryInfo.commentID;

    var entryFound = false;
    var explanations = JSON.parse(JSON.stringify(reference.explanations));
    var contextArray = explanations[context];
    if (!contextArray) {
      send404(res, 'context not found');
      return;
    }
    for (var i = 0; i < contextArray.length; i++) {
      if (contextArray[i].entryID === entryID) {
        entryFound = true;
        if (!commentID) {
          var entry = contextArray[i];
          if (editEntryInfo.username === entry.username) {
            if (editEntryInfo.delete) {
              contextArray.splice(i, 1);
              // validUpdate = true;
            } else if (entry.text !== text) {
              entry.text = text;
              // validUpdate = true;
            } else {
              send404(res, 'no change in content found');
              return;
            }
          } else {
            send404(res, 'not authorized to edit this entry');
            return;
          }
        } else {
          var commentFound = false;
          var comments = contextArray[i].comments;
          for (var j = 0; j < comments.length; j++) {
            var comment = comments[j];
            if (comment.commentID === commentID) {
              commentFound = true;
              if (editEntryInfo.username === comment.username) {
                if (editEntryInfo.delete) {
                  comments.splice(j, 1);
                  // validUpdate = true;
                } else if (comment.text !== text) {
                  comment.text = text;
                  // validUpdate = true;
                } else {
                  send404(res, 'no change in content found');
                  return;
                }
              } else {
                send404(res, 'not authorized to edit this entry');
                return;
              }
              break;
            }
          }
          if (!commentFound) {
            send404(res, 'commentID not found');
            return;
          }
        }
        break;
      }
    }
    if (!entryFound) {
      send404(res, 'entryID not found');
      return;
    }
    // if (!validUpdate) {
    //   send404(res, 'not a valid edit');
    //   return;
    // }

    // Mongoose will not save the modifications to the explanations object
    // unless you reassign its value to a different object
    reference.explanations = explanations;

    reference.save(function(err) {
      if (err) {
        send404(res, err);
      } else {
        res.sendStatus(202);
      }
    });
  });

};



var findAndUpdateMethod = exports.findAndUpdateMethod = function(method, completedMethodEntry, skull, username) {
  var searchObj = {
    project: skull.project,
    functionName: method.functionName
  };

  // replacement using helper
  var cb = {

    success: function(foundMethod) {
      var explanations = method.explanations;
      for (var context in explanations) { //should be changed to explanations
        var newEntryText = explanations[context]; // this is a string
        if (newEntryText) { //only do work if there is text
          var existingEntries = foundMethod.explanations[context]; // array
          var match = false;
          for (var j = 0; j < existingEntries.length; j++) {
            var existingEntry = existingEntries[j]; // object
            if (newEntryText === existingEntry.text) {
              match = true;
              break;
            }
          }
          if (!match) {
            var newEntry = {
              username: username,
              text: newEntryText,
              upvotes: 0,
              upvoters: {},
              comments: [],
              entryID: hashCode(newEntryText),
              timestamp: new Date()
            };
            existingEntries.push(newEntry);
          }
        }
      }

      methodsDB.update({
        project: foundMethod.project,
        functionName: foundMethod.functionName
      },
      {
        explanations: foundMethod.explanations
      }, function(err){
        if(err){
          completedMethodEntry(err);

        } else {
          completedMethodEntry();
        }
      });
    },

    notFound: function() {
      (new methodsDB(convertToDBForm(skull.project, method, username))).save(function(err, newMethod){
        if(err){
          completedMethodEntry(err);
        } else {
          cb.success(newMethod);
        }
      });
    },

    error: function(err) {
      console.error(err);
      completedMethodEntry(err);
    }

  };

  // Since the third argument is null, this will use mongo's findOne
  // mongoFind(res, searchObj, sortObj, successC, notFoundC, errorC)
  mongoFind(null, searchObj, null, cb.success, cb.notFound, cb.error);
};

var createToken = exports.createToken = function(req, res, next, authenticateType) {
  passport.authenticate(authenticateType, {session: false}, function(err, user) {
    if (err) { console.log('error loggin'); }
    if (!user) {
      return res.sendStatus(401);
    }
    var token = jwt.encode({
      username: user.username,
      expiration: calculateTokenExpiration(),
      session: user.session
    }, process.env.TOKEN_SECRET || authConfig.tokenSecret);
    res.send({access_token: token});
  })(req, res, next);
};

var calculateTokenExpiration = exports.calculateTokenExpiration = function() {
  var timeInHours = 24;
  var timeInMilliseconds = timeInHours * 3600000;
  return Date.now() + timeInMilliseconds;
};
