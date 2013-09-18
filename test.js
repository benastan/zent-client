describe("Zent.Message", function() {
  var forkId;
  it('can get all records', function(done) {
    Zent.Message.get().done(function(rsp, status) {
      rsp.should.be.a('array');
      status.should.equal('success');
      done();
    });
  });
  it('can create a record', function(done) {
    var content = 'This is just a test performed at ' + new Date();
    Zent.Message.post({ data: content }).done(function(rsp, status) {
      rsp.content.should.equal(content);
      status.should.equal('success');
      forkId = rsp.id;
      done();
    });
  });
  it('can get zen', function(done) {
    Zent.Message.zen().done(function(rsp, status) {
      rsp.content.should.be.a('string');
      status.should.equal('success');
      done();
    });
  });
  it('can get zen.txt', function(done) {
    Zent.Message['zen.txt']().done(function(rsp, status) {
      rsp.should.be.a('string');
      status.should.equal('success');
      done();
    });
  });
  it('can get a specific zen', function(done) {
    Zent.Message.new(3).get().done(function(rsp, status) {
      rsp.content.should.equal("Twitter: the ultimate irresponsible medium.");
      status.should.equal('success');
      done();
    });
  });
  it('can fork a specific zen', function(done) {
    var content = 'This is just a test performed at ' + new Date();
    Zent.Message.new(forkId).patch({ data: content }).done(function(rsp, status) {
      rsp.content.should.equal(content);
      rsp.original_message_id.should.equal(forkId);
      status.should.equal('success');
      done();
    });
  });
});
