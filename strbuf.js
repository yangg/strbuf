/*
 * @author: uedsky
 * @version: 1.1
 * Last Modified: March 28, 2011
 */

/**
 * @class String concat
 * @return {StrBuf/String}
 * @constructor
 * eg:
    var buf = new StrBuf("contructor str<br/>");
    buf.push("hello,<br/>")
    .push("Today is {0}, {1}", "Monday", "March 28th")
    .push("${name} is a good ${category} company", {name: "Google", category: "Intenet"});
    document.write(buf);// auto call toString method
    console.log(buf);
    console.log(StrBuf("static {0} method", "invoke"));
 */
var StrBuf = function(s) {
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
    // add String to the instance
    push: function(s, j) {
        var args = arguments;
        if (args.length < 2) {
            this.data.push(s || "");
        } else if(typeof j == 'object') {
            this.data.push(s.replace(/\$\{([\w.]+)\}/g, function($, $1) {
                return ($1 in j) ? j[$1] : $;
            }));
        } else {
            this.data.push(s.replace(/\{(\d+)\}/g, function($, $1) {
                return args[+$1 + 1];
            }));
        }
        return this;// chainability
    },
    toString: function() {
        return this.data.join("");
    }
};