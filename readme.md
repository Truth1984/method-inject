## func-injector

add custom function before and after each function call

usage: you don't want to modify an old module, but you want to know what each function produces and `proxy` doesn't serve your purpose

## example

```js
const FI = require("func-injector");
const CLS = class {
  constructor() {}
  add(a, b) {
    return a + b;
  }
};

let map = {
  a: 10,
  add: (a, b) => a + b,
};
let cls = new CLS();

let logger = (name, value) => console.log({ name, value });

FI(map, logger, logger);
FI(cls, logger, logger);

map.add(1, 3);
//{ name: 'add', value: [ 1, 3 ] }
//{ name: 'add', value: 4 }
```

## api

#### (target, preAction = () => {}, postAction = () => {}) => {}

preAction: (name, args) action before performing task,

postAction: (name, value) action after getting a value

all of them can be async, but the result will be async too, so be careful
