const proxy = require("./index");

class TestClass {
  constructor() {
    this.collection = [];
  }
  add(a, b) {
    return a + b;
  }

  async aadd(a, b) {
    return a + b;
  }
}

let testObj = {
  v: 12,
  add: (a, b) => a + b,
  aadd: async (a, b) => a + b,
};

let testClass = new TestClass();

var testing = async () => {
  let logger = (name, arg) => console.log(name, arg);
  let alogger = async (name, arg) => console.log(name, arg);
  proxy(testObj, logger, logger);
  proxy(testClass, alogger, alogger);

  testClass.add(1, 3);
  testObj.aadd(2, 6);
  console.log(testObj.v);
};

testing();
