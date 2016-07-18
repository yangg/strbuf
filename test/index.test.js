'use strict';

const assert = require('chai').assert;
const strbuf = require('../');
describe('strbuf', function() {
  describe('work as a function', function() {
    it('should output object data via dot notation', function() {
      assert.equal(strbuf('My name is ${name}, Im ${info.age}', {name: 'Brook', info: {age: 26 }}), 'My name is Brook, Im 26');
    });

    it('should print undefined if not exist', function() {
      assert.equal(strbuf('My name is ${name}', {}), 'My name is undefined');
    });
    it('should accept a default value', function() {
      assert.equal(strbuf('My name is ${name}', {}, ''), 'My name is ');
    });

    it('should format {}', function() {
      assert.equal(strbuf('{0} name is {1}', 'Your', 'hello'), 'Your name is hello');
    });
  });

  describe('work as a class', function() {
    it('should push worked', function() {
      var str = new strbuf();
      str.push('My name is ${name}, Im ${info.age}', {name: 'Brook', info: {age: 26 }});
      str.push(' other info');
      assert.equal(str.toString(), 'My name is Brook, Im 26 other info')
    });
    it('should be chainable', function() {
      var str = new strbuf();
      str.push('My name is ${name}, Im ${info.age}', {name: 'Brook', info: {age: 26 }})
        .push(' other info');
      assert.equal(str.toString(), 'My name is Brook, Im 26 other info')
    });
    it('should pushArray worked', function() {
      var str = new strbuf();
      str.pushArray('${name}', [{name: 'a'}, {name: 'b'}]);
      assert.equal(str.toString(), 'ab');
    });
  });
});
