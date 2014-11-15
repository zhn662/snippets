var baseUtils = {
    now : function() {
        // 获取当前时间戳
        return new Date().getTime();
        // return +new Date();
    },
    random : function(min, max) {
        // 生成min~max区间的随机数
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    clone : function(source) {
        // 克隆一个对象
        var emptyFun = function() {
        };
        emptyFun.prototype = source;
        return new emptyFun();
    },
    trim : function(str) {
        // 清除字符串开头和结尾的空格
        return str.replace(/^\s+|\s+$/g, '');
    },
    trimLeft : function(str) {
        // 清除字符串开头的空格
        return str.replace(/^\s+/g, '');
    },
    trimRight : function(str) {
        // 清除字符串结尾的空格
        return str.replace(/\s+$/g, '');
    },
    toString : function(obj) {
        // 将任意变量转换为字符串
        return obj + '';
    },
    toSingleLine : function(str) {
        // 将带换行符的字符串转换成无换行符的字符串
        return str.replace(/\r/gi, '').replace(/\n/gi, '');
    },
    toHTML : function(str) {
        // 将字符串转换成HTML源码
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/\\/g, '&#92;');
        str = str.replace(/\'/g, '&#39;');
        str = str.replace(/\"/g, '&quot;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/ /g, '&nbsp;');
        str = str.replace(/\r\n/g, '<br />');
        str = str.replace(/\n\r/g, '<br />');
        str = str.replace(/\n/g, '<br />');
        str = str.replace(/\r/g, '<br />');
        return str;
    },
    isURL : function(str) {
        // 判断字符串是否是URL格式 (http|https|ftp)
        var regexp = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i;
        //var regexp = new RegExp('^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+', 'i');
        return regexp.test(str);
    },
    isEmail : function(str) {
        // 判断字符串是否是Email格式
        var regexp = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        return str.search(regexp) !== -1 ? true : false;
    },
    isNumber : function(str) {
        // 判断字符串是否是数字
        return str.search(/^\d+$/) !== -1 ? true : false;
    },
    isEmpty : function(obj) {
        // 判断变量是否空值
        // undefined, null, '', false, 0, [], {} 均返回true, 否则返回false
        switch(typeof obj) {
        case 'undefined':
            return true;
        case 'string':
            if (obj.replace(/^\s+|\s+$/g, '').length === 0)
                return true;
            break;
        case 'boolean':
            if (!obj)
                return true;
            break;
        case 'number':
            if (obj === 0)
                return true;
            break;
        case 'object':
            if (obj === null)
                return true;
            if (obj.length !== undefined && obj.length === 0)
                return true;
            for (var key in obj) {
                return false;
            }
            return true;
        default:
            break;
        }
        return false;
    },
    capitalize : function(str) {
        // 将字符串中的英文单词首字母转换成大写
        return str.replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
    },
    getByteLength : function(str) {
        // 计算字符串的字节长度, 一个汉字2个字节
        return str.replace(/[^\x00-\xff]/g, 'xx').length;

        //var len = 0;
        //for (var i = 0; i < str.length; i++) {
        //    if (str.charCodeAt(i) > 255) {
        //        len += 2;
        //    } else {
        //        len++;
        //    }
        //}
        //return len;
    },
    getQueryString : function(obj) {
        // 将对象转换为URL查询参数 user=znyyang
        var ret = [];
        for (var key in obj) {
            ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return ret.join('&');
    },
    getQueryParams : function(str) {
        // 将URL查询参数转换为对象 {'user':'znyang'}
        var ret = {};
        str = str && str.split('#')[0] || window.location.search;
        var index = str.indexOf('?');
        if (index > -1) {
            str = str.substring(str.indexOf('?') + 1);
            for (var i = 0, arr = str.split('&'); i < arr.length; i++) {
                index = arr[i].indexOf('=');
                var key = decodeURIComponent(arr[i].substring(0, index));
                var value = decodeURIComponent(arr[i].substring(index + 1));
                ret[key] = value;
            }
        }
        return ret;
    },
    encodeHtmlSimple : function(str) {
        // HTML正文编码, 对需要出现在HTML正文里(除了HTML属性外)的不信任输入进行编码
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/'/g, '&#39;');
        return str;
    },
    decodeHtmlSimple : function(str) {
        // HTML正文解码, 对encodeHtmlSimple结果进行解码
        str = str.replace(/&amp;/g, '&');
        str = str.replace(/&gt;/g, '>');
        str = str.replace(/&lt;/g, '<');
        str = str.replace(/&quot;/g, '"');
        str = str.replace(/&#39;/g, '\'');
        return str;
    },
    encodeHtmlAttributeSimple : function(str) {
        // HTML属性编码, 对需要出现在HTML属性(如:value属性)里的不信任输入进行编码
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/'/g, '&#39;');
        str = str.replace(/=/g, '&#61;');
        str = str.replace(/`/g, '&#96;');
        return str;
    }
};
