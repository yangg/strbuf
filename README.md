# strbuf

[![Build Status](https://travis-ci.org/yangg/strbuf.svg?branch=master)](https://travis-ci.org/yangg/strbuf) [![Code Climate](https://codeclimate.com/github/yangg/strbuf/badges/gpa.svg)](https://codeclimate.com/github/yangg/strbuf)

Concat Javascript string in es6 way

## Usage
### Using as a function
```js
strbuf('hello, ${name}, ${info.age}', {name: 'Brook', info: { age: 26 }});
strbuf('hello, {0}, {1}', 'Brook', 26);
```

### Using as a class
```js
var html = new strbuf('<ul>');
html.push('<li>${title}</li>', {title: 'Title'})
  .push('<li>{0}{1}</li>', 'sub', 'title');
var data = [
  {name: 'name1', date: '2016/7'},
  {name: 'name2', date: '2016/6'}
];
html.pushArray('<li>${name} - ${date}</li>', data);
html.toString();
```

## License
MIT
