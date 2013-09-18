;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var Smoother, Zent;

  Smoother = require('breathe-easy/dist/smoother');

  Zent = Smoother["new"]('http://zentapp.herokuapp.com');

  Zent.register('Message', function() {
    this.base('');
    this.get('zen');
    this.get('zen.txt');
    this.proto(function() {
      return this.processData = function(data) {
        if (data) {
          return data.data;
        }
      };
    });
    return this.member(function() {
      this.setup(function(id) {
        return this.id = id;
      });
      return this.base(function() {
        return this.id;
      });
    });
  });

  if (typeof window !== 'undefined') {
    window.Zent = Zent;
  }

}).call(this);

},{"breathe-easy/dist/smoother":5}],2:[function(require,module,exports){
(function() {
  var Base,
    __slice = [].slice;

  Base = (function() {
    function Base(attrs) {
      attrs || (attrs = {});
      this.client = attrs.client || this.client;
      this.attributes = {};
      if (typeof this.setup === 'function') {
        this.setup.apply(this, arguments);
      }
    }

    Base.prototype["new"] = function(attributes) {
      attributes || (attributes = {});
      attributes.client = this.client;
      return new this.Instance(attributes);
    };

    Base.prototype.perform = function() {
      var ajaxOptions, data, error, success, type, urlArgs, xhr, _i, _ref;
      type = arguments[0], urlArgs = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), data = arguments[_i++];
      if (!this.client.usePromises) {
        _ref = type, type = _ref.type, data = _ref.data, urlArgs = _ref.urlArgs, success = _ref.success, error = _ref.error;
      }
      if (typeof data === 'string') {
        urlArgs.push(data);
        data = void 0;
      }
      ajaxOptions = {
        type: type,
        url: this.url.apply(this, urlArgs),
        data: this.processData(data)
      };
      ajaxOptions = this.alterXHROptions(ajaxOptions);
      xhr = $.ajax(ajaxOptions);
      return xhr;
    };

    Base.prototype.processData = function(data) {
      return data;
    };

    Base.prototype.urlBase = function() {
      var base, param, params, urlArgs, _i, _len;
      urlArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      params = this.baseParams;
      if (urlArgs.length) {
        params = params.concat(urlArgs);
      }
      base = [];
      for (_i = 0, _len = params.length; _i < _len; _i++) {
        param = params[_i];
        base.push(typeof param === 'function' ? param.apply(this) : param);
      }
      return base;
    };

    Base.prototype.url = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return [this.client.endpoint].concat(this.urlBase.apply(this, args)).join('/');
    };

    Base.prototype.post = function() {
      var urlArgs;
      urlArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.perform.apply(this, ['post'].concat(urlArgs));
    };

    Base.prototype.put = function() {
      var urlArgs;
      urlArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.perform.apply(this, ['put'].concat(urlArgs));
    };

    Base.prototype.get = function() {
      var urlArgs;
      urlArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.perform.apply(this, ['get'].concat(urlArgs));
    };

    Base.prototype.patch = function() {
      var urlArgs;
      urlArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.perform.apply(this, ['patch'].concat(urlArgs));
    };

    Base.prototype["delete"] = function() {
      var urlArgs;
      urlArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.perform.apply(this, ['delete'].concat(urlArgs));
    };

    Base.prototype.alterXHROptions = function(options) {
      return options;
    };

    Base.prototype.Builder = require('./builder');

    return Base;

  })();

  Base.endpoints = function(cb) {
    var builder;
    builder = new this.prototype.Builder({
      "class": this
    });
    return cb.apply(builder);
  };

  module.exports = Base;

}).call(this);

},{"./builder":3}],3:[function(require,module,exports){
(function() {
  var Builder,
    __slice = [].slice;

  Builder = (function() {
    Builder.prototype.base = function() {
      var baseParams, param, params;
      baseParams = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      params = [];
      if (typeof baseParams[0] !== 'function' && typeof baseParams[0] !== 'string') {
        baseParams = baseParams[0];
      }
      while (param = baseParams.shift()) {
        if (typeof param !== 'function') {
          param = (function(_param) {
            return _param;
          })(param);
        }
        params.push(param);
      }
      if (typeof this["class"].prototype.baseParams !== 'undefined') {
        return this["class"].prototype.baseParams = this["class"].prototype.baseParams.concat(params);
      } else {
        return this["class"].prototype.baseParams = params;
      }
    };

    function Builder(_arg) {
      this["class"] = _arg["class"];
    }

    Builder.prototype.data = function(cb) {
      return this["class"].prototype.processData = function(data) {
        return cb.apply(this, [data]);
      };
    };

    Builder.prototype.define = function() {
      var arg, args, type, _i, _len, _results,
        _this = this;
      type = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      _results = [];
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arg = args[_i];
        _results.push((function(_arg) {
          var camelize, fn, otherFn;
          fn = function(data) {
            return this[type](_arg, data);
          };
          fn.type = type;
          camelize = function(type, arg) {
            return "" + type + (arg[0].toUpperCase()) + (arg.substr(1));
          };
          switch (typeof _this["class"].prototype[_arg]) {
            case 'function':
              otherFn = _this["class"].prototype[_arg];
              _this["class"].prototype[camelize(otherFn.type, _arg)] = otherFn;
              return _this["class"].prototype[camelize(type, _arg)] = fn;
            case 'object':
              return _this["class"].prototype[camelize(type, _arg)] = fn;
            default:
              return _this["class"].prototype[_arg] = fn;
          }
        })(arg));
      }
      return _results;
    };

    Builder.prototype["delete"] = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.unshift('delete');
      return this.define.apply(this, args);
    };

    Builder.prototype.get = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.unshift('get');
      return this.define.apply(this, args);
    };

    Builder.prototype.member = function(endpoints) {
      return this["class"].prototype.Instance = this["class"].extend(endpoints);
    };

    Builder.prototype.setup = function(setup) {
      return this["class"].prototype.setup = setup;
    };

    Builder.prototype.patch = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.unshift('patch');
      return this.define.apply(this, args);
    };

    Builder.prototype.post = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.unshift('post');
      return this.define.apply(this, args);
    };

    Builder.prototype.proto = function(proto) {
      return proto.apply(this["class"].prototype);
    };

    Builder.prototype.put = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.unshift('put');
      return this.define.apply(this, args);
    };

    return Builder;

  })();

  module.exports = Builder;

}).call(this);

},{}],4:[function(require,module,exports){
(function() {
  var Client, settings,
    __slice = [].slice;

  settings = {
    usePromises: true
  };

  Client = (function() {
    function Client() {
      var arguments, _arguments;
      _arguments = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this["arguments"] = _arguments;
      this.usePromises = $.extend(true, settings, this["arguments"]).usePromises;
      this.setup.apply(this, this["arguments"]);
    }

    Client.prototype.setup = function() {};

    Client.prototype.usePromises = function(usePromises) {
      if (typeof usePromises === void 0) {
        return settings.usePromises = true;
      } else {
        return settings.usePromises = usePromises;
      }
    };

    return Client;

  })();

  module.exports = Client;

}).call(this);

},{}],5:[function(require,module,exports){
(function() {
  var Base, Client, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Client = require('./breathe-easy/client');

  Base = require('./breathe-easy/base');

  Base = (function(_super) {
    __extends(Base, _super);

    function Base() {
      _ref = Base.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Base.extend = function(endpoints) {
      var klass, _ref1;
      return klass = (function(_super1) {
        __extends(klass, _super1);

        function klass() {
          _ref1 = klass.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        klass.endpoints(endpoints);

        return klass;

      })(this);
    };

    Base.member = function(endpoints) {
      return this.prototype.Instance = this.extend(endpoints);
    };

    return Base;

  })(Base);

  Client = (function(_super) {
    __extends(Client, _super);

    function Client() {
      _ref1 = Client.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Client["new"] = function(endpoint, setup) {
      var client;
      client = new Client();
      client.endpoint = endpoint;
      if (typeof setup === 'function') {
        client.setup = setup;
      }
      return client;
    };

    Client.prototype.register = function(endpointName, endpoints) {
      var klass;
      klass = Base.extend(endpoints);
      klass.prototype.client = this;
      this[endpointName] = new klass;
      return klass;
    };

    return Client;

  })(Client);

  if (typeof window !== 'undefined') {
    window.Smoother = Client;
  }

  module.exports = Client;

}).call(this);

},{"./breathe-easy/base":2,"./breathe-easy/client":4}]},{},[1])
;