// Used for tests

exports.parsePathCases = {
  '/api/sodocan': {
    searchObject: {project: 'sodocan'},
    contexts: {all:[]}
  },
  '/api/sodocan/ref/makeSkele': {
    searchObject: {project: 'sodocan', functionName: 'makeSkele'},
    contexts: {all:[]}
  },
  '/api/sodocan/examples': {
    searchObject: {project: 'sodocan'},
    contexts: {examples:[]}
  },
  '/api/sodocan/descriptions/all': {
    searchObject: {project: 'sodocan'},
    contexts: {descriptions:['all']}
  },
  '/api/sodocan/descriptions/1/10': {
    searchObject: {project: 'sodocan'},
    contexts: {descriptions:['1', '10']}
  },
  '/api/sodocan/all/all': {
    searchObject: {project: 'sodocan'},
    contexts: {all:['all','all']}
  },
  '/api/sodocan/tips/descriptions': {
    searchObject: {project: 'sodocan'},
    contexts: {tips: [], descriptions: []}
  },
  '/api/sodocan/all/tips/0': {
    searchObject: {project: 'sodocan'},
    contexts: {all: ['all'], tips: ['0']}
  },
  '/api/sodocan/ref/makeItPretty/descriptions/entryID-128/all': {
    searchObject: {project: 'sodocan', functionName: 'makeItPretty'},
    contexts: {descriptions: ['entryID-128', 'all']}
  },
  '/api/sodocan/ref/makeItPretty/descriptions/entryID-128/commentID-14': {
    searchObject: {project: 'sodocan', functionName: 'makeItPretty'},
    contexts: {descriptions: ['entryID-128', 'commentID-14']}
  }
};

exports.convertFormCase = {
  inputs: ['fishProj', {
    "functionName":"goldfish",
    "params":[{"name":"stuff","type":"Boolean"}],
    "returns":[{"type":"stuff"},{"type":"num"},{"type":"bool"}],
    "group":"happySaturday",
    "classContext":"",
    "index":0,
    "explanations":{
      "descriptions":"xtra cheddar",
      "examples":"",
      "tips":""
    }
  }, "aUser"],
  expectedOutput: {
    "project":"fishProj",
    "functionName":"goldfish",
    "group":"happySaturday",
    "username":"aUser",
    "reference": {
      "params": [{"name":"stuff","type":"Boolean"}],
      "returns":[{"type":"stuff"},{"type":"num"},{"type":"bool"}]
    },
    "explanations": {
      "descriptions": [],
      "examples": [],
      "tips": []
    }
  }
};

exports.parserPostCases = [
  {
    header: {project: 'testProj'},
    body: [
      {
        functionName: 'method1',
        group: 'testGroup',
        params: [],
        returns: [],
        explanations: {
          descriptions: 'descriptionblahblah',
          examples: 'examplesblahblah',
          tips: 'tipsblahblah'
        }
      },
      {
        functionName: 'method2',
        group: 'testGroup',
        params: [],
        returns: [],
        explanations: {
          descriptions: 'descriptionblahblah2',
          examples: 'examplesblahblah2',
          tips: 'tipsblahblah2'
        }
      }
    ]
  },
  {
    header: {project: 'testProj'},
    body: [
      {
        functionName: 'method1',
        group: 'testGroup',
        params: [],
        returns: [],
        explanations: {
          descriptions: 'descriptionblahblah',
          examples: 'examplesblahblah',
          tips: 'tipsblahblah'
        }
      },
      {
        functionName: 'method2',
        group: 'testGroup',
        params: [],
        returns: [],
        explanations: {
          descriptions: '',
          examples: 'examplesblahblah2_modified',
          tips: 'tipsblahblah2'
        }
      }
    ]
  },
  {
    header: {project: 'testProj'},
    body: [
      {
        functionName: 'method3',
        group: 'testGroup',
        params: [],
        returns: [],
        explanations: {
          descriptions: '',
          examples: '',
          tips: ''
        }
      }
    ]
  }
];

exports.parserPostExpectedReturns = [
  [ // Number 1
    {
      // "_id": 0,
      "project": "testProj",
      "functionName": "method1",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1294058334
          }
        ],
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 719765163
          }
        ],
        "tips": [
          {
            "username":"testUser",
            "text": "tipsblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 907176294
          }
        ]
      },
      "__v": 0
    },
    {
      // "_id": 1,
      "project": "testProj",
      "functionName": "method2",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1461102740
          }
        ],
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 837883623
          }
        ],
        "tips": [
          {
            "username":"testUser",
            "text": "tipsblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1942306008
          }
        ]
      },
      "__v": 0
    }
  ],
  [ // Number 2
    {
      // "_id": 0,
      "project": "testProj",
      "functionName": "method1",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1294058334
          }
        ],
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 719765163
          }
        ],
        "tips": [
          {
            "username":"testUser",
            "text": "tipsblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 907176294
          }
        ]
      },
      "__v": 0
    },
    {
      // "_id": 1,
      "project": "testProj",
      "functionName": "method2",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1461102740
          }
        ],
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 837883623
          },
          {
            "username":"testUser",
            "entryID": 199356705,
            "comments": [],
            "upvotes": 0,
            "upvoters": {},
            "text": "examplesblahblah2_modified"
          }
        ],
        "tips": [
          {
            "username":"testUser",
            "text": "tipsblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1942306008
          }
        ]
      },
      "__v": 0
    }
  ],
  [ // Number 3
    {
      // "_id": 0,
      "project": "testProj",
      "functionName": "method1",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1294058334
          }
        ],
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 719765163
          }
        ],
        "tips": [
          {
            "username":"testUser",
            "text": "tipsblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 907176294
          }
        ]
      },
      "__v": 0
    },
    {
      // "_id": 1,
      "project": "testProj",
      "functionName": "method2",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1461102740
          }
        ],
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 837883623
          },
          {
            "username":"testUser",
            "entryID": 199356705,
            "comments": [],
            "upvotes": 0,
            "upvoters": {},
            "text": "examplesblahblah2_modified"
          }
        ],
        "tips": [
          {
            "username":"testUser",
            "text": "tipsblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1942306008
          }
        ]
      },
      "__v": 0
    },
    {
      //"_id": 2,
      "project": "testProj",
      "functionName": "method3",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [],
        "examples": [],
        "tips": []
      },
      "__v": 0
    }
  ]
];




exports.getValidCases = {
  '/api/testProj/all': [
    {
      // "_id": 0,
      "project": "testProj",
      "functionName": "method1",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1294058334
          }
        ],
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 719765163
          }
        ],
        "tips": [
          {
            "username":"testUser",
            "text": "tipsblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 907176294
          }
        ]
      },
      "__v": 0
    },
    {
      // "_id": 1,
      "project": "testProj",
      "functionName": "method2",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1461102740
          }
        ],
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 837883623
          },
          {
            "username":"testUser",
            "entryID": 199356705,
            "comments": [],
            "upvotes": 0,
            "upvoters": {},
            "text": "examplesblahblah2_modified"
          }
        ],
        "tips": [
          {
            "username":"testUser",
            "text": "tipsblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1942306008
          }
        ]
      },
      "__v": 0
    },
    {
      //"_id": 2,
      "project": "testProj",
      "functionName": "method3",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [],
        "examples": [],
        "tips": []
      },
      "__v": 0
    }
  ],

  '/api/testProj': [
    {
      // "_id": 0,
      "project": "testProj",
      "functionName": "method1",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1294058334
          }
        ],
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 719765163
          }
        ],
        "tips": [
          {
            "username":"testUser",
            "text": "tipsblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 907176294
          }
        ]
      },
      "__v": 0
    },
    {
      // "_id": 1,
      "project": "testProj",
      "functionName": "method2",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1461102740
          }
        ],
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 837883623
          }
        ],
        "tips": [
          {
            "username":"testUser",
            "text": "tipsblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1942306008
          }
        ]
      },
      "__v": 0
    },
    {
      //"_id": 2,
      "project": "testProj",
      "functionName": "method3",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [],
        "examples": [],
        "tips": []
      },
      "__v": 0
    }
  ],

  '/api/testProj/ref/method1': [
    {
      // "_id": 0,
      "project": "testProj",
      "functionName": "method1",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1294058334
          }
        ],
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 719765163
          }
        ],
        "tips": [
          {
            "username":"testUser",
            "text": "tipsblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 907176294
          }
        ]
      },
      "__v": 0
    }
  ],

  '/api/testProj/examples': [
    {
      // "_id": 0,
      "project": "testProj",
      "functionName": "method1",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 719765163
          }
        ]
      },
      "__v": 0
    },
    {
      // "_id": 1,
      "project": "testProj",
      "functionName": "method2",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 837883623
          }
        ]
      },
      "__v": 0
    },
    {
      //"_id": 2,
      "project": "testProj",
      "functionName": "method3",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "examples": []
      },
      "__v": 0
    }
  ],

  '/api/testProj/tips/descriptions': [
    {
      // "_id": 0,
      "project": "testProj",
      "functionName": "method1",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1294058334
          }
        ],
        "tips": [
          {
            "username":"testUser",
            "text": "tipsblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 907176294
          }
        ]
      },
      "__v": 0
    },
    {
      // "_id": 1,
      "project": "testProj",
      "functionName": "method2",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1461102740
          }
        ],
        "tips": [
          {
            "username":"testUser",
            "text": "tipsblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1942306008
          }
        ]
      },
      "__v": 0
    },
    {
      //"_id": 2,
      "project": "testProj",
      "functionName": "method3",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [],
        "tips": []
      },
      "__v": 0
    }
  ],

  '/api/testProj/all/tips/0': [
    {
      // "_id": 0,
      "project": "testProj",
      "functionName": "method1",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1294058334
          }
        ],
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 719765163
          }
        ],
        "tips": []
      },
      "__v": 0
    },
    {
      // "_id": 1,
      "project": "testProj",
      "functionName": "method2",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [
          {
            "username":"testUser",
            "text": "descriptionblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 1461102740
          }
        ],
        "examples": [
          {
            "username":"testUser",
            "text": "examplesblahblah2",
            "upvotes": 0,
            "upvoters": {},
            "comments": [],
            "entryID": 837883623
          },
          {
            "username":"testUser",
            "entryID": 199356705,
            "comments": [],
            "upvotes": 0,
            "upvoters": {},
            "text": "examplesblahblah2_modified"
          }
        ],
        "tips": []
      },
      "__v": 0
    },
    {
      //"_id": 2,
      "project": "testProj",
      "functionName": "method3",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "descriptions": [],
        "examples": [],
        "tips": []
      },
      "__v": 0
    }
  ],

  '/api/testProj/ref/method2/examples/entryID-199356705/all': [
    {
      // "_id": 1,
      "project": "testProj",
      "functionName": "method2",
      "group": "testGroup",
      "username":"testUser",
      "reference": {
        "params": [],
        "returns": []
      },
      "explanations": {
        "examples": [
          {
            "username":"testUser",
            "entryID": 199356705,
            "comments": [],
            "upvotes": 0,
            "upvoters": {},
            "text": "examplesblahblah2_modified"
          }
        ]
      },
      "__v": 0
    }
  ]
};

exports.getInvalidCases = [
  '/notApi/testProj',
  '/api/otherProj',
  '/api/testProj/ref/nonExistentMethod'
];

exports.addEntryCases = [
  { // case 1
    should: 'should add an entry and get it',
    postJson: {
      project: 'testProj',
      functionName: 'method1',
      context: 'tips',
      text: 'Adding a test entry'
    },
    getUri: 'http://localhost:3000/api/testProj/ref/method1/tips/entryID-346578302',
    expectedRef: {
      project: 'testProj',
      functionName: 'method1',
      group: 'testGroup',
      username: 'testUser',
      reference: {returns:[], params: []},
      explanations: {tips: [{
        username: 'testUser',
        entryID: 346578302,
        text: 'Adding a test entry',
        upvotes: 0,
        upvoters: {},
        comments: []
      }]},
      "__v": 0
    }
  },
  { // case 2
    should: 'should add a comment and get it',
    postJson: {
      project: 'testProj',
      functionName: 'method1',
      context: 'tips',
      entryID: 346578302,
      text: 'Adding a test comment'
    },
    getUri: 'http://localhost:3000/api/testProj/ref/method1/tips/entryID-346578302/commentID-192693359',
    expectedRef: {
      project: 'testProj',
      functionName: 'method1',
      group: 'testGroup',
      username: 'testUser',
      reference: {returns:[], params: []},
      explanations: {tips: [{
        username: 'testUser',
        entryID: 346578302,
        text: 'Adding a test entry',
        upvotes: 0,
        upvoters: {},
        comments: [{
          username: 'testUser',
          commentID: 192693359,
          text: 'Adding a test comment',
          upvotes: 0,
          upvoters: {},
        }]
      }]},
      "__v": 0
    }
  }
];

exports.upvoteCases = [
  { // case 1
    should: 'should upvote an entry and get entries by descending upvotes and no comments',
    addEntryJson: {
      project: 'testProj',
      functionName: 'method1',
      context: 'tips',
      text: 'Adding another test entry'
    },
    upvoteJson: {
      project: 'testProj',
      functionName: 'method1',
      context: 'tips',
      entryID: 415745888
    },
    getUri: 'http://localhost:3000/api/testProj/ref/method1/tips/all',
    expectedRef: {
      project: 'testProj',
      functionName: 'method1',
      group: 'testGroup',
      username: 'testUser',
      reference: {returns:[], params: []},
      explanations: {tips: [
        {
          username: 'testUser',
          entryID: 415745888,
          text: 'Adding another test entry',
          upvotes: 1,
          upvoters: {'testUser2': 1},
          comments: []
        },
        {
          username: 'testUser',
          entryID: 907176294,
          comments: [],
          upvotes: 0,
          upvoters: {},
          text: 'tipsblahblah'
        },
        {
          username: 'testUser',
          entryID: 346578302,
          text: 'Adding a test entry',
          upvotes: 0,
          upvoters: {},
          comments: []
        }
      ]},
      "__v": 0
    }
  },
  { // case 2
    should: 'should upvote a comment and get top-voted comment',
    addEntryJson: {
      project: 'testProj',
      functionName: 'method1',
      context: 'tips',
      entryID: 346578302,
      text: 'Adding another test comment'
    },
    upvoteJson: {
      project: 'testProj',
      functionName: 'method1',
      context: 'tips',
      entryID: 346578302,
      commentID: 1653167667
    },
    getUri: 'http://localhost:3000/api/testProj/ref/method1/tips/entryID-346578302/1',
    expectedRef: {
      project: 'testProj',
      functionName: 'method1',
      group: 'testGroup',
      username: 'testUser',
      reference: {returns:[], params: []},
      explanations: {tips: [{
        username: 'testUser',
        entryID: 346578302,
        text: 'Adding a test entry',
        upvotes: 0,
        upvoters: {},
        comments: [{
          username: 'testUser',
          commentID: 1653167667,
          text: 'Adding another test comment',
          upvotes: 1,
          upvoters: {'testUser2': 1},
        }]
      }]},
      "__v": 0
    }
  }
];

exports.duplicateEntryCases = [
  {
    type: 'entry',
    postJson: {
      project: 'testProj',
      functionName: 'method1',
      context: 'tips',
      text: 'Adding another test entry'
    }
  },
  {
    type: 'comment',
    postJson: {
      project: 'testProj',
      functionName: 'method1',
      context: 'tips',
      entryID: 346578302,
      text: 'Adding another test comment'
    }
  }
];

exports.editEntryCases = [
  { // case 1
    should: 'should edit an entry and get the new version',
    postJson: {
      project: 'testProj',
      functionName: 'method1',
      context: 'tips',
      entryID: 415745888,
      text: 'The entry has been edited!'
    },
    getUri: 'http://localhost:3000/api/testProj/ref/method1/tips/2',
    expectedRef: {
      project: 'testProj',
      functionName: 'method1',
      group: 'testGroup',
      username: 'testUser',
      reference: {returns:[], params: []},
      explanations: {tips: [
        {
          username: 'testUser',
          entryID: 415745888,
          text: 'The entry has been edited!',
          upvotes: 1,
          upvoters: {'testUser2': 1},
          comments: []
        },
        {
          username: 'testUser',
          entryID: 907176294,
          comments: [],
          upvotes: 0,
          upvoters: {},
          text: 'tipsblahblah'
        },
      ]},
      "__v": 0
    }
  },
  { // case 2
    should: 'should edit a comment and get the new version',
    postJson: {
      project: 'testProj',
      functionName: 'method1',
      context: 'tips',
      entryID: 346578302,
      commentID: 192693359,
      text: 'The comment has been edited!'
    },
    getUri: 'http://localhost:3000/api/testProj/ref/method1/tips/entryID-346578302/all',
    expectedRef: {
      project: 'testProj',
      functionName: 'method1',
      group: 'testGroup',
      username: 'testUser',
      reference: {returns:[], params: []},
      explanations: {tips: [
        {
          username: 'testUser',
          entryID: 346578302,
          text: 'Adding a test entry',
          upvotes: 0,
          upvoters: {},
          comments: [{
            username: 'testUser',
            commentID: 1653167667,
            text: 'Adding another test comment',
            upvotes: 1,
            upvoters: {'testUser2': 1},
          },
          {
            username: 'testUser',
            commentID: 192693359,
            text: 'The comment has been edited!',
            upvotes: 0,
            upvoters: {},
          }]
        }
      ]},
      "__v": 0
    }
  },
  { // case 3
    should: 'should delete a comment',
    postJson: {
      project: 'testProj',
      functionName: 'method1',
      context: 'tips',
      entryID: 346578302,
      commentID: 1653167667,
      delete: true
    },
    getUri: 'http://localhost:3000/api/testProj/ref/method1/tips/entryID-346578302/all',
    expectedRef: {
      project: 'testProj',
      functionName: 'method1',
      group: 'testGroup',
      username: 'testUser',
      reference: {returns:[], params: []},
      explanations: {tips: [{
        username: 'testUser',
        entryID: 346578302,
        text: 'Adding a test entry',
        upvotes: 0,
        upvoters: {},
        comments: [{
          username: 'testUser',
          commentID: 192693359,
          text: 'The comment has been edited!',
          upvotes: 0,
          upvoters: {},
        }]
      }]},
      "__v": 0
    }
  },
  { // case 4
    should: 'should delete an entry',
    postJson: {
      project: 'testProj',
      functionName: 'method1',
      context: 'tips',
      entryID: 415745888,
      delete: true
    },
    getUri: 'http://localhost:3000/api/testProj/ref/method1/tips',
    expectedRef: {
      project: 'testProj',
      functionName: 'method1',
      group: 'testGroup',
      username: 'testUser',
      reference: {returns:[], params: []},
      explanations: {tips: [{
        username: 'testUser',
        entryID: 907176294,
        comments: [],
        upvotes: 0,
        upvoters: {},
        text: 'tipsblahblah'
      }]},
      "__v": 0
    }
  }
];
