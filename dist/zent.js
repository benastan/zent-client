(function() {
  var Smoother, Zent;

  Smoother = require('breathe-easy/dist/smoother');

  Zent = Smoother["new"]('http://zentapp.herokuapp.com');

  Zent.register('Message', function() {
    this.base('');
    this.get('zen', 'zen.txt');
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
