module.exports = {
  throttle: function (fun, delay) {
    let last, deferTimer;
    return function (args) {
      let that = this;
      let _args = arguments;
      let now = +new Date();
      if (last && now < last + delay) {
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fun.apply(that, _args);
        }, delay);
      } else {
        last = now;
        fun.apply(that, _args);
      }
    };
  },
  debounce: function (fun, delay) {
    return function (args) {
      let that = this;
      let _args = args;
      clearTimeout(fun.id);
      fun.id = setTimeout(function () {
        fun.call(that, _args);
      }, delay);
    };
  },
};
