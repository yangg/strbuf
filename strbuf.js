/*!
 * @author: uedsky
 * Last Modified: Dec 17, 2011
 */

(function() {
/**
 * @class String concat
 * @return {StrBuf/String}
 * @constructor
 * eg:
    var buf = new StrBuf("contructor str<br/>");
    buf.push("hello,<br/>")
    .push("Today is {0}, {1}<br/>", "Monday", "March 28th")
    .push("I like ${like}, my name is ${name}, my qq is ${im.qq}, msn is ${im.msn}", {
        like: "Vim",
        name: "yang",
        im: {qq: '999999', msn: 'me@live.cn'}
    });
    document.write(buf);// auto call toString method
    console.log(buf);
    console.log(StrBuf("static {0} method", "invoke"));
 */
StrBuf = function(s) {
    this.data = [];
    if (s) {
        var args = arguments, buf;
        if (this instanceof StrBuf) {
            this.push.apply(this, args);
        } else {// static invoke
            buf = new StrBuf();
            return buf.push.apply(buf, args).toString();
        }
    }
};
StrBuf.prototype = {
    /**
     * add String to the instance
     * @return StrBuf make it chainability
     */
    push: function(s, o) {
        var args = arguments;
        if (args.length < 2) {
            this.data.push(getStr(s));
        } else if(typeof o == 'object') {
            this.data.push(s.replace(/\$\{([\w.]+)\}/g, function($, $1) {
                var parts = $1.split('.'), i = 0, len = parts.length, res = o;
                while(i < len) {
                    try {
                        res = res[parts[i++]];
                    } catch(ex){
                        res = $;
                    }
                }
                return res;
            }));
        } else {
            this.data.push(s.replace(/\{(\d+)\}/g, function($, $1) {
                return args[+$1 + 1];
            }));
        }
        return this;// chainability
    },
    /**
     * get the final string
     * @param {String} delimiter default to ''(empty string)
     */
    toString: function(delimiter) {
        return this.data.join(getStr(delimiter));
    }
};

function getStr(s) {
    return s == undefined ? '' : s;
}
})();
