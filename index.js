/*!
 * StrBuf: A javascript string buffer class
 * @author Brook (http://uedsky.com)
 * Last Modified: Jan 24, 2015
 */


(function() {
  /**
   * @class String concat
   * @return {StrBuf/String}
   * @constructor
   */
  function StrBuf(s) {
      this.__data = [];
      if(s) {
          var args = arguments, buf;
          if(this instanceof StrBuf) {
              this.push.apply(this, args);
          } else {// static invoke
              buf = new StrBuf();
              return buf.push.apply(buf, args).toString();
          }
      }
  }
  StrBuf.prototype = {
      /**
       * add String to the instance
       * @return StrBuf make it chainability
       */
      push: function(s, /*{Object/String...} */o, _undef) {
          var args = arguments, str;
          if(args.length < 2) {
              str = s === undefined ? '' : s;
          } else if(typeof o === 'object') {
              str = s.replace(/\$\{([\w.]+)\}/g, function($, $1) {
                  var parts = $1.split('.'), i = 0, len = parts.length, res = o;
                  while(i < len) {
                      try {
                          res = res[parts[i++]];
                      } catch(ex){
                          res = $;
                      }
                  }
                  return res === undefined ? _undef : res;
              });
          } else {
              str = s.replace(/\{(\d+)\}/g, function($, $1) {
                  return args[+$1 + 1];
              });
          }
          this.__data.push(str);
          return this;// chainability
      },
      pushArray: function(s, arr, _undef) {
          for(var i = 0, item; i < arr.length; i++) {
              item = arr[i];
              // item.__index = i;
              this.push(s, item, _undef);
          }
      },
      /**
       * get the final string
       * @param {String} delimiter default to ''(empty string)
       */
      toString: function(delimiter) {
          return this.__data.join(delimiter === undefined ? '' : delimiter);
      }
  };
  if(typeof module !== 'undefined') {
    module.exports = StrBuf;
  } else {
    window.strbuf = StrBuf;
  }
})();
