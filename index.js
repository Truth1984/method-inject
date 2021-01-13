/**
 *
 * @param {?(name:string, args:?array)=>{}} preAction
 * @param {?(name:string, result)=>{}} postAction
 */
module.exports = (target, preAction = () => {}, postAction = () => {}) => {
  let asyncfunc = preAction instanceof Function && preAction.constructor.name === "AsyncFunction";
  let modify = (i) => {
    if (target[i] instanceof Function) {
      let targetFunc = target[i].bind(target);
      if (asyncfunc) {
        target[i] = async (...args) => {
          await preAction(i, args);
          let result = targetFunc(...args);
          await postAction(i, result);
          return result;
        };
      } else {
        target[i] = (...args) => {
          preAction(i, args);
          let result = targetFunc(...args);
          postAction(i, result);
          return result;
        };
      }
    }
  };

  if (typeof target === "object" && target.constructor.name != "Object") {
    //class
    let properties = Object.getOwnPropertyNames(Object.getPrototypeOf(target));
    for (let i of properties) modify(i);
  } else {
    //obj
    for (let i of Object.keys(target)) modify(i);
  }
  return target;
};
