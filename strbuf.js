/*!
 * StrBuf: A javascript string buffer class
 * @author uedsky (http://uedsky.com)
 * Last Modified: Jan 24, 2015
 */

/**
 * @class String concat
 * @return {StrBuf/String}
 * @constructor
 * eg:
    var buf = new StrBuf("Hello,<br/>");
    buf.push("Today ")
    .push("is {0}, {1}<br/>", "Monday", "March 28th")
    .push("My name is ${name}, I like ${like}, my QQ is ${im.qq}, msn is ${im.msn},<br/>${test.test2.son}, ${test.test2.daughter}", {
        like: "Vim",
        name: "Brook",
        im: { qq: '123456', msn: 'brook@live.cn' },
        test: { test2: {son:'test grandson', daughter: 'test granddaughter'}}
    })
    .pushArray('<div>${name}, ${birth}</div>' , [
        {name: 'C#', birth: '2000'},
        {name: 'PHP, Java, Javascript', birth: '1995'}
    ]);
    document.write(buf);// auto call toString method
    console.log(aa);
    console.log(buf);
    console.log(StrBuf("static {0} method", "invoke"));
 */
(function() {
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
        } else if(typeof o == 'object') {
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
window.strbuf = StrBuf;
})();
