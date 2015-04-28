
describe('Service: <%= providerNs %>Foo', function() {
  'use strict';

  beforeEach(module('<%= moduleName %>'));

  var <%= providerNs %>Foo;

  beforeEach(inject(function(_<%= providerNs %>Foo_) {
    <%= providerNs %>Foo = _<%= providerNs %>Foo_;
  }));

  it('should know what bars are made of', function() {
    var barContents = <%= providerNs %>Foo.thisBarIsMadeOf();
    expect(barContents).toBe('foo');
  });
});
