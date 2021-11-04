const sleep = (duration, message) => {
  const start = Date.now();
  let time = 0;
  while (duration - time > 0) {
    time = Date.now() - start;
  }
  console.log(message || 'sleep:', time);
};

function consoleMethodArg(object, methodName) {
  const originMethod = object[methodName];
  // eslint-disable-next-line no-param-reassign
  object[methodName] = function newMethod(...args) {
    console.log(args[0]);
    originMethod.apply(this, args);
  };
}

module.exports = {
  sleep,
  consoleMethodArg,
};
