const file = [
  {
    "id": "633ac9993dfa7510a140c539",
    "__v": 0,
    "createdAt": {"$date": "2022-10-03T11:38:01.920Z"},
    "creator": "6320631951037f099445c68f",
    "name": "auth",
    "nodeType": 3,
    "pid": "",
    "relationshipRequestId": ""
  },
  {
    "id": "633ac99c3dfa7510a140c53f",
    "__v": 0,
    "createdAt": {"$date": "2022-10-03T11:38:04.658Z"},
    "creator": "6320631951037f099445c68f",
    "name": "账号密码登陆",
    "nodeType": 1,
    "pid": "633ac9993dfa7510a140c539",
    "relationshipRequestId": "633ac99c3dfa7510a140c53c"
  },
  {
    "id": "633bd3e7428ae40f1502153c",
    "__v": 0,
    "createdAt": {"$date": "2022-10-04T06:34:15.757Z"},
    "creator": "6320631951037f099445c68f",
    "name": "workspace",
    "nodeType": 3,
    "pid": "",
    "relationshipRequestId": ""
  },
  {
    "id": "633bd3ed428ae40f15021546",
    "__v": 0,
    "createdAt": {"$date": "2022-10-04T06:34:21.035Z"},
    "creator": "6320631951037f099445c68f",
    "name": "列出workspace",
    "nodeType": 1,
    "pid": "633bd3e7428ae40f1502153c",
    "relationshipRequestId": "633bd3ec428ae40f15021543"
  }
]
const request = [
  {
    "id": "633ac99c3dfa7510a140c53c",
    "__v": 0,
    "body": {
      "body": "{\n  \"username\": \"zt\",\n  \"password\":\"zt\"\n}",
      "contentType": "",
      "_id": {"$oid": "633ac99c3dfa7510a140c53d"}
    },
    "createdAt": {"$date": "2022-10-03T11:38:04.592Z"},
    "endpoint": "{{url}}/passwordLogin",
    "headers": [],
    "method": "POST",
    "params": [
      {
        "key": "name",
        "value": "zt",
        "active": true
      },
      {
        "key": "age",
        "value": "18",
        "active": true
      }
    ]
  },
  {
    "id": "633b07fa8db3a2d8a74b3324",
    "__v": 0,
    "body": {
      "body": "",
      "contentType": "",
      "_id": {"$oid": "633b07fa8db3a2d8a74b3325"}
    },
    "createdAt": {"$date": "2022-10-03T16:04:10.301Z"},
    "endpoint": "asfasfas",
    "headers": [],
    "method": "PUT",
    "params": [
      {
        "key": "asfas",
        "value": "asfasf",
        "active": true
      }
    ]
  },
  {
    "_id": {"$oid": "633bd3ec428ae40f15021543"},
    "__v": 0,
    "body": {
      "body": "{}",
      "contentType": "",
      "_id": {"$oid": "633bd3ec428ae40f15021544"}
    },
    "createdAt": {"$date": "2022-10-04T06:34:20.996Z"},
    "endpoint": "http://127.0.0.1:8080/listworkspace",
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp0IiwiaWQiOiI2MzIwNjMxOTUxMDM3ZjA5OTQ0NWM2OGYiLCJyb2xlcyI6W10sImlhdCI6MTY2NDg2NTI0MSwiZXhwIjoxOTgwNDQxMjQxfQ.TLMxtD6DRGt9V5Kf2s9Eh_Au8J1vkHBveUqgq4wqEwU",
        "active": true
      }
    ],
    "method": "POST",
    "params": [
      {
        "key": "5556",
        "value": "8777",
        "active": true
      }
    ]
  }
]
