const supertest = require("supertest");
const app = require("../server");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const MONGODB_URL = "mongodb://127.0.0.1:27017/?authMechanism=DEFAULT";

let userId, token;

const userData = { name: "testing123", email: "testing123@test.com", password: "testing123" };

beforeAll((done) => {
  mongoose.connect(MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
  ).then(async () => {
    const res = await supertest(app).post('/api/user/signup').send(userData)

    token = res.body.access_token;
    console.log(res.body);

    if (token?.length < 500) {
      const tokenData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      expect(mongoose.Types.ObjectId.isValid(tokenData.id)).toBe(true);
      userId = tokenData?.id;
      console.log(tokenData);
    } else {
      const tokenData = jwt.decode(token);
      expect(mongoose.Types.ObjectId.isValid(tokenData.id)).toBe(true);
      userId = tokenData?.id;
      console.log(tokenData);
    }

    done();
  });
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
    console.log("done")
  });
});

describe("Template APIs", () => {
  const userData = { name: "testing123", email: "testing123@test.com", password: "testing123" };

  let templateData = [
    {
      "name": "Template 1",
      "desc": "This is the Other Template",
      "tasks": [
        {
          "name": "template task 1",
          "est": 5
        },
        {
          "name": "template task 2",
          "est": 10
        }
      ],
      "visibility": true
    },
    {
      "name": "Template 2",
      "desc": "This is the Other Template",
      "tasks": [
        {
          "name": "template task 1",
          "est": 5
        },
        {
          "name": "template task 2",
          "est": 10
        }
      ],
      "visibility": false
    }
  ];

  const templateTasks = [];

  const todoTemplate = [];

  describe("Testing addTemplate controller route /api/template/add/", () => {
    it("Sending request without sending data ", (done) => {
      supertest(app)
        .post("/api/template/add/")
        .set("Authorization", `Bearer ${token}`)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("Please enter the essential data (eg: name or description) of the template");

          done();
        })
    })

    it("Sending request with invalid name", (done) => {
      supertest(app)
        .post("/api/template/add/")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...templateData[0], name: "The name length is more than 50 characters. The name length is more than 50 characters." })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("The name length is more than 50 characters.");

          done();
        })
    })

    it("Sending request with invalid description", (done) => {
      supertest(app)
        .post("/api/template/add/")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...templateData[0], desc: "The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters." })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("The description length is more than 500 characters.");

          done();
        })
    })

    it("Sending request without tasks", (done) => {
      supertest(app)
        .post("/api/template/add/")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...templateData[0], tasks: [] })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("please enter the template tasks.");

          done();
        })
    });

    it("Sending request with invalid task", (done) => {
      supertest(app)
        .post("/api/template/add/")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...templateData[0], tasks: [{ name: "dkjfs" }] })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.message).toBe("Please, complete the task data at least name and est");

          done();
        });
    });

    it("Sending valid template", (done) => {
      supertest(app)
        .post("/api/template/add/")
        .set("Authorization", `Bearer ${token}`)
        .send(templateData[0])
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(mongoose.Types.ObjectId.isValid(res.body._id)).toBe(true);
          expect(res.body.name).toBe(templateData[0].name);
          expect(res.body.description).toBe(templateData[0].desc);
          expect(res.body.description).toBe(templateData[0].desc);
          expect(res.body.visibility).toBe(templateData[0].visibility);
          expect(res.body.tasks.length).toEqual(templateData[0].tasks.length);
          expect(res.body.est).toEqual(templateData[0].tasks.reduce((total, { est }) => est + total, 0));
          expect(res.body.act).toEqual(0);
          expect(res.body.color).toEqual('#ef9b0f');
          expect(res.body.time).toEqual({ PERIOD: 1500, SHORT: 300, LONG: 900 });
          expect(res.body.timeForAll).toBe(true);
          expect(res.body.autoBreaks).toBe(false);
          expect(res.body.autoPomodors).toBe(false);
          expect(res.body.autoStartNextTask).toBe(false);
          expect(res.body.longInterval).toBe(4);
          expect(res.body.alarmType).toEqual({ name: 'alarm 1', src: 'sounds/alarm/1.mp3' });
          expect(res.body.tickingType).toEqual({ name: 'tricking 1', src: 'sounds/tricking/1.mp3' });
          expect(res.body.alarmVolume).toBe(50);
          expect(res.body.tickingVolume).toBe(50);
          expect(res.body.todo).toBe(null);

          templateTasks.push({ tasks: templateData[0].tasks });
          templateData[0] = res.body;

          done();
        })
    })

    it("Sending nonvisible template", (done) => {
      supertest(app)
        .post("/api/template/add/")
        .set("Authorization", `Bearer ${token}`)
        .send(templateData[1])
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(mongoose.Types.ObjectId.isValid(res.body._id)).toBe(true);
          expect(res.body.name).toBe(templateData[1].name);
          expect(res.body.description).toBe(templateData[1].desc);
          expect(res.body.description).toBe(templateData[1].desc);
          expect(res.body.visibility).toBe(templateData[1].visibility);
          expect(res.body.tasks.length).toEqual(templateData[1].tasks.length);
          expect(res.body.est).toEqual(templateData[1].tasks.reduce((total, { est }) => est + total, 0));
          expect(res.body.act).toEqual(0);
          expect(res.body.color).toEqual('#ef9b0f');
          expect(res.body.time).toEqual({ PERIOD: 1500, SHORT: 300, LONG: 900 });
          expect(res.body.timeForAll).toBe(true);
          expect(res.body.autoBreaks).toBe(false);
          expect(res.body.autoPomodors).toBe(false);
          expect(res.body.autoStartNextTask).toBe(false);
          expect(res.body.longInterval).toBe(4);
          expect(res.body.alarmType).toEqual({ name: 'alarm 1', src: 'sounds/alarm/1.mp3' });
          expect(res.body.tickingType).toEqual({ name: 'tricking 1', src: 'sounds/tricking/1.mp3' });
          expect(res.body.alarmVolume).toBe(50);
          expect(res.body.tickingVolume).toBe(50);
          expect(res.body.todo).toBe(null);

          templateTasks.push({ tasks: templateData[1].tasks });
          templateData[1] = res.body;

          done();
        })
    })
  });

  describe("Testing getAll controller for route /api/template/", () => {
    it("Sending vaild getAll request", (done) => {
      supertest(app)
        .get("/api/template/")
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.templates).toEqual([{ ...templateData[0] }]);
          expect(res.body.total).toBe(1);
          expect(res.body.currentPage).toBe(1);
          expect(res.body.numberOfPages).toBe(1);

          done();
        })
    })
  })

  describe("Testing getOne controller", () => {
    it("get public template", (done) => {
      supertest(app)
        .get(`/api/template/one/${templateData[0]._id}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body).toEqual(templateData[0]);

          done();
        });
    });

    it("get private template", (done) => {
      supertest(app)
        .get(`/api/template/one/private/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body).toEqual(templateData[1]);

          done();
        });
    });

    it("send invalid id using route /api/template/one/privite/djs21dsf", (done) => {
      supertest(app)
        .get(`/api/template/one/private/djs21dsf`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("Invalid id");

          done();
        });
    });

    it("send not found template id using route /api/template/one/privite/63e0180ebb43b174201482a0", (done) => {
      supertest(app)
        .get(`/api/template/one/private/63e0180ebb43b174201482a0`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("This template doesn't found.");

          done();
        });
    });

    it("get private template using route /api/template/one/63e0180ebb43b174201482a0", (done) => {
      supertest(app)
        .get(`/api/template/one/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(405)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("Not allow for you.");

          done();
        });
    });
  });

  describe("Testing getting template tasks controller", () => {
    it("get tasks from public template", (done) => {
      supertest(app)
        .get(`/api/template/one/tasks/${templateData[0]._id}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body[0]._id).toBe(templateData[0].tasks[0]);
          expect(res.body[1]._id).toBe(templateData[0].tasks[1]);

          expect(res.body[0].name).toBe(templateTasks[0].tasks[0].name);
          expect(res.body[1].name).toBe(templateTasks[0].tasks[1].name);

          expect(res.body[0].est).toBe(templateTasks[0].tasks[0].est);
          expect(res.body[1].est).toBe(templateTasks[0].tasks[1].est);

          expect(res.body[0].template._id).toBe(templateData[0]._id);
          expect(res.body[1].template._id).toBe(templateData[0]._id);

          expect(res.body[0].template.todo).toBe(false);
          expect(res.body[1].template.todo).toBe(false);

          expect(res.body[0].userId).toBe(userId);
          expect(res.body[1].userId).toBe(userId);

          templateTasks[0].tasks = res.body;

          done();
        });
    });

    it("get tasks from private template", (done) => {
      supertest(app)
        .get(`/api/template/one/tasks/private/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body[0]._id).toBe(templateData[1].tasks[0]);
          expect(res.body[1]._id).toBe(templateData[1].tasks[1]);

          expect(res.body[0].name).toBe(templateTasks[1].tasks[0].name);
          expect(res.body[1].name).toBe(templateTasks[1].tasks[1].name);

          expect(res.body[0].est).toBe(templateTasks[1].tasks[0].est);
          expect(res.body[1].est).toBe(templateTasks[1].tasks[1].est);

          expect(res.body[0].template._id).toBe(templateData[1]._id);
          expect(res.body[1].template._id).toBe(templateData[1]._id);

          expect(res.body[0].template.todo).toBe(false);
          expect(res.body[1].template.todo).toBe(false);

          expect(res.body[0].userId).toBe(userId);
          expect(res.body[1].userId).toBe(userId);

          done();
        });
    });

    it("send invalid id using route /api/template/one/tasks/privite/djs21dsf", (done) => {
      supertest(app)
        .get(`/api/template/one/tasks/private/djs21dsf`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("Invalid id");

          done();
        });
    });

    it("send not found template id using route /api/template/one/tasks/privite/63e0180ebb43b174201482a0", (done) => {
      supertest(app)
        .get(`/api/template/one/tasks/private/63e0180ebb43b174201482a0`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("This template doesn't found.");

          done();
        });
    });

    it("get tasks from private template using route /api/template/one/tasks/63e0180ebb43b174201482a0", (done) => {
      supertest(app)
        .get(`/api/template/one/tasks/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(405)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("Not allow for you.");

          done();
        });
    });
  });

  describe("Testing getting user templates using route /api/template/user/", () => {
    it("Send request without token", (done) => {
      supertest(app)
        .get("/api/template/user")
        .expect(401)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("Invalid Authentication.");

          done();
        })
    });

    it("Send request with invalid token", (done) => {
      supertest(app)
        .get("/api/template/user")
        .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QwMTIzQGV4YW1wbGUuY29tIiwiaWQiOiI2MzhjMTE2NDI1ZGI3OGI1MGJjYzFjMDgiLCJpYXQiOjE2NzEwMzE5NzMsImV4cCI6MTY3MTA4OTU3M30.6lafCmgJDX393gGNakvwPbprgCHvrvVIXxUC3wSmxMg`)
        .expect(401)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("Invalid Authentication and jwt expired");

          done();
        })
    });

    it("Valid User", (done) => {
      supertest(app)
        .get("/api/template/user")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.total).toBe(templateData.length);
          expect(res.body.currentPage).toBe(res.body.total === 0 ? 0 : 1);
          expect(res.body.numberOfPages).toBe(Math.ceil(res.body.total / 25));

          expect(res.body.templates).toEqual(templateData);

          done();
        })
    });
  });

  describe("Testing add template to todo list using route /api/template/toto/:id", () => {
    it("Sending valid template id", (done) => {
      const order = 0;
      supertest(app)
        .post(`/api/template/todo/${templateData[0]._id}`)
        .send({ order: order })
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.name).toBe(templateData[0].name);
          expect(res.body.visibility).toBe(false);
          expect(res.body.desc).toBe(templateData[0].desc);
          expect(res.body.userId).toBe(templateData[0].userId);
          expect(res.body.est).toBe(templateData[0].est);
          expect(res.body.act).toBe(0);
          expect(res.body.time).toEqual(templateData[0].time);
          expect(res.body.timeForAll).toBe(templateData[0].timeForAll);
          expect(res.body.autoBreaks).toBe(templateData[0].autoBreaks);
          expect(res.body.autoPomodors).toBe(templateData[0].autoPomodors);
          expect(res.body.autoAutoStartNextTask).toBe(templateData[0].autoAutoStartNextTask);
          expect(res.body.longInterval).toBe(templateData[0].longInterval);
          expect(res.body.alarmType).toEqual(templateData[0].alarmType);
          expect(res.body.alarmVolume).toBe(templateData[0].alarmVolume);
          expect(res.body.alarmRepet).toBe(templateData[0].alarmRepet);
          expect(res.body.tickingType).toEqual(templateData[0].tickingType);
          expect(res.body.tickingVolume).toBe(templateData[0].tickingVolume);
          expect(res.body.todo.userId).toBe(userId);
          expect(res.body.todo.order).toBe(order);

          todoTemplate.push(res.body);

          done();
        })
    });

    it("Sending invalid template id", (done) => {
      supertest(app)
        .post(`/api/template/todo/dsfdsafasf`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("Invalid id");

          done();
        });
    });

    it("Sending not template id", (done) => {
      console.log(templateData[0].tasks)
      supertest(app)
        .post(`/api/template/todo/${templateData[0].tasks[0]}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("This template doesn't found.");

          done();
        });
    })
  });

  describe("Testing get todo templates using route /api/template/todo/", () => {
    it("Send request without token", (done) => {
      supertest(app)
        .get("/api/template/todo")
        .expect(401)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("Invalid Authentication.");

          done();
        })
    });

    it("Send request with invalid token", (done) => {
      supertest(app)
        .get("/api/template/todo")
        .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QwMTIzQGV4YW1wbGUuY29tIiwiaWQiOiI2MzhjMTE2NDI1ZGI3OGI1MGJjYzFjMDgiLCJpYXQiOjE2NzEwMzE5NzMsImV4cCI6MTY3MTA4OTU3M30.6lafCmgJDX393gGNakvwPbprgCHvrvVIXxUC3wSmxMg`)
        .expect(401)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("Invalid Authentication and jwt expired");

          done();
        })
    });

    it("Valid User", (done) => {
      supertest(app)
        .get("/api/template/todo")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.total).toBe(todoTemplate.length);
          expect(res.body.currentPage).toBe(todoTemplate.length === 0 ? 0 : 1);
          expect(res.body.numberOfPages).toBe(Math.ceil(todoTemplate.length / 25));

          expect(res.body.templates).toEqual(todoTemplate);

          done();
        })
    });
  });

  describe("Testing delete template using DELETE method & route /api/template/:id", () => {
    it("Sending invalid template id", (done) => {
      supertest(app)
        .delete(`/api/template/dsfdsafasf`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("Invalid id");

          done();
        });
    });

    it("Sending not template id", (done) => {
      console.log(templateData[0].tasks)
      supertest(app)
        .delete(`/api/template/${templateData[0].tasks[0]}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("This template doesn't found.");

          done();
        });
    });

    it("Delete Public template", (done) => {
      supertest(app)
        .delete(`/api/template/${templateData[0]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.deletedTemplate).toEqual(templateData[0]);
          expect(res.body.deletedTasks.deletedCount).toBe(templateData[0].tasks.length);

          done();
        });
    });

    it("validing deleted template", (done) => {
      supertest(app)
        .get(`/api/template/one/private/${templateData[0]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("This template doesn't found.");
          templateData.filter(t => t._id === templateData[0]._id);

          done();
        });
    });

    it("validating tasks deleting", (done) => {
      supertest(app)
        .get(`/api/template/one/tasks/private/${templateData[0]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("This template doesn't found.");

          done();
        });
    });

    it("Delete Todo list template", (done) => {
      supertest(app)
        .delete(`/api/template/${todoTemplate[0]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.deletedTemplate).toEqual(todoTemplate[0]);
          expect(res.body.deletedTasks.deletedCount).toBe(todoTemplate[0].tasks.length);

          done();
        });
    });

    it("validing deleted todo list template", (done) => {
      supertest(app)
        .get(`/api/template/one/private/${todoTemplate[0]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("This template doesn't found.");

          done();
        });
    });

    it("validating tasks deleting for todo list template", (done) => {
      supertest(app)
        .get(`/api/template/one/tasks/private/${todoTemplate[0]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("This template doesn't found.");

          done();
        });
    });
  });

  describe("Testing update template using PATCH method & route /api/template/:id", () => {
    it("Sending invalid template id", (done) => {
      supertest(app)
        .patch(`/api/template/dsfdsafasf`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("Invalid id");

          done();
        });
    });

    it("Sending not template id", (done) => {
      console.log(templateData[0].tasks)
      supertest(app)
        .patch(`/api/template/${templateData[0].tasks[0]}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("This template doesn't found.");

          done();
        });
    });

    it("Sending request without data", (done) => {
      supertest(app)
        .patch(`/api/template/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("Please enter the essential data (eg: name or description) of the template");

          done();
        })
    })

    it("Sending request with invalid name", (done) => {
      supertest(app)
        .patch(`/api/template/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ ...templateData[1], name: "The name length is more than 50 characters. The name length is more than 50 characters." })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("The name length is more than 50 characters.");

          done();
        })
    })

    it("Sending request with invalid description", (done) => {
      supertest(app)
        .patch(`/api/template/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ ...templateData[1], desc: "The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters. The description length is more than 500 characters." })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("The description length is more than 500 characters.");

          done();
        })
    })

    it("Sending invalid time", (done) => {
      const newTime = { PERIOD: 1500 };
      supertest(app)
        .patch(`/api/template/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ time: newTime })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("The time should be at this format {PERIOD: ---, SHORT: ---, LONG: ---} with positive numbers");

          done();
        });
    });

    it("Sending invalid autoBreaks", (done) => {
      const autoBreaks = "false";
      supertest(app)
        .patch(`/api/template/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ autoBreaks })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("The property of the autoBreaks is boolean");

          done();
        });
    });

    it("Sending invalid volume", (done) => {
      const alarmVolume = 101;
      supertest(app)
        .patch(`/api/template/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ alarmVolume })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("invalid sound volume");

          done();
        });
    });

    it("Sending invalid sound type", (done) => {
      const alarmType = {
        name: "alarm 1"
      };

      supertest(app)
        .patch(`/api/template/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ alarmType })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("The sound type should be contines name and src.");

          done();
        });
    });

    it("Sending invalid longInterval", (done) => {
      const longInterval = 1;

      supertest(app)
        .patch(`/api/template/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ longInterval })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.message).toBe("The long interval must be more than 2");

          done();
        });
    });

    it("Update Public template", (done) => {
      const newName = "Template updated 2";
      supertest(app)
        .patch(`/api/template/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: newName })
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body).toEqual({ ...templateData[1], name: newName });

          templateData[1] = res.body;

          done();
        });
    });
  })

  describe("Adding new task for a template", () => {
    const taskData = [{ name: "new task", est: 10 }];
    it("adding task", (done) => {
      supertest(app)
        .post('/api/task/add/')
        .set("Authorization", `Bearer ${token}`)
        .send({ ...taskData[0], template: { _id: templateData[1]._id, todo: templateData[1].todo } })
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          const data = res.body;

          expect(mongoose.Types.ObjectId.isValid(data._id)).toBe(true);
          expect(data.name).toBe(taskData[0].name);
          expect(data.est).toBe(taskData[0].est);
          expect(data.act).toBe(0);
          expect(data.notes).toBe("");
          expect(data.check).toBe(false);
          expect(data.template._id).toBe(templateData[1]._id);
          expect(data.template.todo).toBe(templateData[1].todo !== null);

          taskData[0] = Object.assign(taskData[0], data);
          templateData[1].tasks.push(taskData[0]._id);

          templateTasks[1].tasks.push(data);

          done();
        });
    });

    it("verifying task adding", (done) => {
      supertest(app)
        .get(`/api/template/one/tasks/private/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body[2]).toEqual(templateTasks[1].tasks[2]);

          done();
        })
    });
  });

  describe("Update template tasks", () => {
    it("Update task", (done) => {
      const updatedTask = { name: "Updated task", act: 5 };
      supertest(app)
        .patch(`/api/task/update/${templateTasks[1].tasks[2]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedTask)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          const data = res.body;

          delete data.updatedAt;
          delete data.createdAt;
          const newTask = { ...templateTasks[1].tasks[2], ...updatedTask };
          delete newTask.updatedAt;
          delete newTask.createdAt;
          expect(data).toEqual(newTask);

          templateTasks[1].tasks[2] = data;

          done();
        });
    });

    it("verifying updated task", (done) => {
      supertest(app)
        .get(`/api/template/one/tasks/private/${templateData[1]._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          const data = res.body[2];

          delete data.updatedAt;
          delete data.createdAt;

          expect(data).toEqual(templateTasks[1].tasks[2]);

          done();
        })
    });
  })
})
