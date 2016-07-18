# strbuf

[![Build Status](https://travis-ci.org/yangg/strbuf.svg?branch=master)](https://travis-ci.org/yangg/strbuf) [![Code Climate](https://codeclimate.com/github/yangg/strbuf/badges/gpa.svg)](https://codeclimate.com/github/yangg/strbuf)

Concat javascript string in es6 way, and more!

## Usage

Given:

```js
var json = {
  msg: "foo",
  info: { bar: 'hello'},
  list: [
    { name: 'a', date: '2016/7'},
    { name: 'b', date: '2016/8'},
  ]
};
```
Expect:
#### Using as a function
```js
strbuf('hello, ${msg}, ${info.bar}', json);
strbuf('hello, {0}, {1}', 'foo', 'hello');
```

#### Using as a class
```js
var html = new strbuf('<ul>');
html.push('<li>${msg}-${info.bar}</li>', json)
  .push('<li>{0}-{1}</li>', 'foo', 'hello');
html.pushArray('<li>${name} - ${date}</li>', json.list);
html.toString();
```

## License
MIT
