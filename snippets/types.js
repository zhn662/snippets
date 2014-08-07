var typeUtils = {
    getType : function(obj) {
        // undefined/null结果为[object Undefined/Null], 在IE8下返回结果均为[object Object].
        var type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
        if (type === 'object') {
            if ( typeof obj === 'undefined') {
                type = 'undefined';
            } else if (obj === null) {
                type = 'null';
            } else if (this.isArguments(obj)) {
                type = 'arguments';
            }
        }
        return type;
    },
    isType : function(type, obj) {
        return this.getType(obj) === type;
    },
    isArray : function(obj) {
        return Array.isArray && Array.isArray(obj) || this.isType('array', obj);
        // return obj instanceof Array;
        // return obj.constructor === 'Array';
        // return this.getType(obj) === 'array';
    },
    isArrayLike : function(obj) {
        return obj && typeof obj.length === 'number';
        // return obj !== undefined && obj !== null && typeof obj.length === 'number';
    },
    isArguments : function(obj) {
        // 判断变量的类型是否是 Arguments
        return obj && obj.callee && this.isArrayLike(obj) ? true : false;
    },
    isFunction : function(obj) {
        return this.isType('function', obj);
        // return obj.constructor === 'Function';
        // return this.getType(obj) === 'function';
    },
    isObject : function(obj) {
        return this.isType('object', obj);
        // return this.getType(obj) === 'object';
    },
    isEmptyObject : function(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
        // return Object.keys(obj).length > 0 ? false : true;
    },
    isPlainObject : function(obj) {
        return this.isObject(obj) && !this.isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
    },
    isWindow : function(obj) {
        return obj != null && obj == obj.window;
    },
    isDocument : function(obj) {
        return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
    }
};
