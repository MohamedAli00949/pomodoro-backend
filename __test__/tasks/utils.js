const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose')

const fileName = path.resolve(__dirname, "data.json");

const getTaskData = () => JSON.parse(
  fs.readFileSync(
    fileName,
    { encoding: "utf-8" }
  )
).taskData;

module.exports = {
  setTokenAndUserId: (t, uId) => {
    const oldData = JSON.parse(fs.readFileSync(fileName, { encoding: "utf-8" }));
    try {
      fs.writeFileSync(
        fileName,
        JSON.stringify({ ...oldData, token: t, userId: uId }),
        { encoding: 'utf8', flag: '' }
      );
    } catch (err) {
      console.log(err);
    }
  },
  getTokenAndUserId: () => {
    const oldData = JSON.parse(
      fs.readFileSync(
        fileName,
        { encoding: "utf-8" }
      )
    );

    return { token: oldData.token, userId: oldData.userId };
  },
  getTaskData: getTaskData,
  setTaskData: (taskData, index) => {
    const oldData = JSON.parse(fs.readFileSync(fileName, { encoding: 'utf-8' }))
    if (taskData instanceof Array) {
      oldData.taskData = taskData;
    } else {
      oldData.taskData[index] = taskData;
    }
    try {
      fs.writeFileSync(
        fileName,
        JSON.stringify({ ...oldData }),
        { encoding: 'utf8', flag: '' }
      );
    } catch (err) {
      console.log(err);
    }
  },
  initializeTaskData: () => {
    try {
      const oldData = JSON.parse(fs.readFileSync(fileName, { encoding: 'utf-8' }))
      fs.writeFileSync(
        fileName,
        JSON.stringify({
          "taskData": [
            {
              "name": "test1",
              "est": 2,
              "notes": "test1 test1 test1 test1"
            }
          ],
          ...oldData
        }
        ),
        { encoding: 'utf8', flag: '' }
      );
    } catch (err) {
      console.log(err);
    }
  },
  initializeData: () => {
    try {
      fs.writeFileSync(
        fileName,
        JSON.stringify({
          "taskData": [
            {
              "name": "test1",
              "est": 2,
              "notes": "test1 test1 test1 test1"
            }
          ],
          "token": "",
          "userId": "",
          "userData": ""
        }
        ),
        { encoding: 'utf8', flag: '' }
      );
    } catch (err) {
      console.log(err);
    }
  },
  test: (body, data) => {
    const dataEntries = Object.entries(body);

    if (body._id)
      expect(mongoose.Types.ObjectId.isValid(body._id)).toBe(true);

    dataEntries.forEach(([k, v]) => {
      if (data[k])
        expect(body[k]).toStrictEqual(data[k]);
    })
  }
}