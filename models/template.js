const mongoose = require("mongoose");

/**
 * {
 *   "_id": ObjectId("id"),
 *   "name":"First Template",
 *   "visibility": false,
 *   "description": "This is the first Template",
 *   "tasks": [
 *      ObjectId("id"),
 *      ObjectId("id")
 *    ],
 *   "userId": userId,
 *   "est": Number,
 *   "act": Number,
 *   "color": "#ef9b0f",
 *   "usedBy": 1,
 *   "time": {
 *      "PERIOD": 1500,
 *      "SHORT": 300,
 *      "LONG": 900
 *   },
 *   "timeForAll": true,
 *   "autoBreaks": false,
 *   "autoPomodors": false,
 *   "autoStartNextTask": false,
 *   "longInterval": 4,
 *   "alarmType": {
 *       "name": "alarm 1",
 *       "src": "sounds/alarm/1.mp3"
 *    },
 *    "alarmVolume": 50,
 *    "alarmRepet": false,
 *    "tickingType": { 
 *        "name": "tricking 1",
 *        "src": "sounds/tricking/1.mp3"
 *    },
 *    "tickingVolume": 50,
 *    "comments": [],
 *    "templateClone": ""
 * }
 */

const templateSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "please enter the template name!"]
  },
  visibility: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    require: [true, "please enter the template visibility!"]
  },
  tasks: {
    type: Array,
    require: [true, "please enter the tasks ids"]
  },
  userId: {
    type: String,
    require: [true, "You should enter the userId."]
  },
  est: {
    type: Number,
    require: [true, "please enter the est pomodoro"],
    default: 1,
  },
  act: {
    type: Number,
    default: 0,
  },
  iconURL: {
    type: String
  },
  color: {
    type: String,
    default: '#ef9b0f'
  },
  usedBy: {
    type: Number,
    default: 1
  },
  time: {
    type: Object,
    default: {
      ["PERIOD"]: 1500,
      ["SHORT"]: 300,
      ["LONG"]: 900,
    }
  },
  timeForAll: { // 
    type: Boolean,
    default: true
  },
  autoBreaks: {
    type: Boolean,
    default: false
  },
  autoPomodors: {
    type: Boolean,
    default: false
  },
  autoStartNextTask: {
    type: Boolean,
    default: false
  },
  longInterval: {
    type: Number,
    default: 4
  },
  alarmType: {
    type: Object,
    default: {
      name: "alarm 1",
      src: 'sounds/alarm/1.mp3'
    }
  },
  alarmVolume: {
    type: Number,
    default: 50,
  },
  alarmRepet: {
    type: Boolean,
    default: false
  },
  tickingType: {
    type: Object,
    default: {
      name: "tricking 1",
      src: "sounds/tricking/1.mp3"
    }
  },
  tickingVolume: {
    type: Number,
    default: 50,
  },
  comments: {
    type: Array,
    default: []
  },
  /**
 * todo: {
 *  userId: userId,
 *  order: 1
 * }
 */
  todo: {
    type: Object,
    default: null
  },
  templateClone: {
    type: String,
    default: "",
  }
}, {
  timeseries: true,
}
);

module.exports = mongoose.model("Template", templateSchema);