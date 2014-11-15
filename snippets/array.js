var arrayUtils = {
    indexOf : function(arr, element, index) {
        /**
         * 正向查找数组元素在数组中首次出现的索引下标
         * @param {array} arr - The source array to be searched.
         * @param {object} element - The element to locate in the array.
         * @param {number} index - The index to start the search at.
         */
        if (Array.prototype.indexOf) {
            var args = Array.prototype.slice.call(arguments, 1);
            return Array.prototype.indexOf.apply(arguments[0], args);
        } else {
            if (index === null) {
                index = 0;
            } else if (index < 0) {
                index = Math.max(0, arr.length + index);
            }
            for (var i = index, len = arr.length; i < len; i++) {
                if (arr[i] === element) {
                    return i;
                }
            }
            return -1;
        }
    },
    lastIndexOf : function(arr, element, index) {
        /**
         * 反向查找数组元素在数组中首次出现的索引下标
         */
        if (Array.prototype.lastIndexOf) {
            var args = Array.prototype.slice.call(arguments, 1);
            return Array.prototype.lastIndexOf.apply(arguments[0], args);
        } else {
            if (index === null) {
                index = arr.length - 1;
            } else if (index < 0) {
                index = Math.max(0, arr.length + index);
            }
            for (var i = index; i >= 0; i--) {
                if (arr[i] === element) {
                    return i;
                }
            }
            return -1;
        }
    },
    every : function(arr, callback/*, thisp*/) {
        /**
         * 测试数组中的所有元素是否都通过了指定函数callback的测试
         * @param {array} arr - The source array to be tested.
         * @param {function} callback - The function to test for each element.
         * @param {object} thisp - The value to use as this when executing callback.
         */
        if (Array.prototype.every) {
            var args = Array.prototype.slice.call(arguments, 1);
            return Array.prototype.every.apply(arguments[0], args);
        } else {
            if ( typeof callback !== 'function') {
                throw new TypeError();
            }
            var thisp = arguments[2];
            for (var i = 0, len = arr.length; i < len; i++) {
                if ( i in arr && !callback.call(thisp, arr[i], i, arr)) {
                    return false;
                }
            }
            return true;
        }
    },
    some : function(arr, callback/*, thisp*/) {
        /**
         * 测试数组中的某些元素是否通过了指定函数callback的测试
         */
        if (Array.prototype.some) {
            var args = Array.prototype.slice.call(arguments, 1);
            return Array.prototype.some.apply(arguments[0], args);
        } else {
            if ( typeof callback !== 'function') {
                throw new TypeError();
            }
            var thisp = arguments[2];
            for (var i = 0, len = arr.length; i < len; i++) {
                if ( i in arr && callback.call(thisp, arr[i], i, arr)) {
                    return true;
                }
            }
            return false;
        }
    },
    forEach : function(arr, callback/*, thisp*/) {
        /**
         * 为每个数组元素执行一次指定的函数callback
         */
        if (Array.prototype.forEach) {
            var args = Array.prototype.slice.call(arguments, 1);
            return Array.prototype.forEach.apply(arguments[0], args);
        } else {
            if ( typeof callback !== 'function') {
                throw new TypeError();
            }
            var thisp = arguments[2];
            for (var i = 0, len = arr.length; i < len; i++) {
                if ( i in arr) {
                    callback.call(thisp, arr[i], i, arr);
                }
            }
        }
    },
    map : function(arr, callback/*, thisp*/) {
        /**
         * 返回一个由原数组中的每个元素调用指定callback方法后的返回值组成的新数组
         */
        if (Array.prototype.map) {
            var args = Array.prototype.slice.call(arguments, 1);
            return Array.prototype.map.apply(arguments[0], args);
        } else {
            if ( typeof callback !== 'function') {
                throw new TypeError();
            }
            var ret = new Array(arr.length);
            var thisp = arguments[2];
            for (var i = 0, len = arr.length; i < len; i++) {
                if ( i in arr) {
                    ret[i] = callback.call(thisp, arr[i], i, arr);
                }
            }
            return ret;
        }
    },
    filter : function(arr, callback/*, thisp*/) {
        /**
         * 返回一个由原数组中所有通过指定函数callback测试的元素创建新的数组
         */
        if (Array.prototype.filter) {
            var args = Array.prototype.slice.call(arguments, 1);
            return Array.prototype.filter.apply(arguments[0], args);
        } else {
            if ( typeof callback !== 'function') {
                throw new TypeError();
            }
            var ret = [];
            var thisp = arguments[2];
            for (var i = 0, len = arr.length; i < len; i++) {
                if ( i in arr) {
                    var item = arr[i];
                    if (callback.call(thisp, item, i, arr)) {
                        ret.push(item);
                    }
                }
            }
            return ret;
        }
    },
    reduce : function(arr, callback/*, initial*/) {
        /**
         * 对数组的每项(从左至右顺序)和前一次调用的结果运行一个函数callback并返回最后的结果
         * callback(previousValue, currentValue, index, array)
         */
        if (Array.prototype.reduce) {
            var args = Array.prototype.slice.call(arguments, 1);
            return Array.prototype.reduce.apply(arguments[0], args);
        } else {
            if ( typeof callback !== 'function') {
                throw new TypeError();
            }
            // no value to return if no initial value and an empty array
            if (!( arr instanceof Array) || arr.length === 0 && arguments.length !== 3) {
                throw new TypeError();
            }
            var value, valueFlag;
            valueFlag = false;
            if (arguments.length === 3) {
                value = arguments[2];
                valueFlag = true;
            }
            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr.hasOwnProperty(i)) {
                    if (valueFlag) {
                        value = callback.call(null, value, arr[i], i, arr);
                    } else {
                        value = arr[i];
                        valueFlag = true;
                    }
                }
            }
            if (!valueFlag) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            return value;
        }
    },
    reduceRight : function(arr, callback/*, initial*/) {
        /**
         * 对数组的每项(从右至左顺序)和前一次调用的结果运行一个函数callback并返回最后的结果
         */
        if (Array.prototype.reduceRight) {
            var args = Array.prototype.slice.call(arguments, 1);
            return Array.prototype.reduceRight.apply(arguments[0], args);
        } else {
            if ( typeof callback !== 'function') {
                throw new TypeError();
            }
            // no value to return if no initial value and an empty array
            if (!( arr instanceof Array) || arr.length === 0 && arguments.length !== 3) {
                throw new TypeError();
            }
            var value, valueFlag;
            valueFlag = false;
            if (arguments.length === 3) {
                value = arguments[2];
                valueFlag = true;
            }
            for (var i = arr.length - 1; i >= 0; i--) {
                if (arr.hasOwnProperty(i)) {
                    if (valueFlag) {
                        value = callback.call(null, value, arr[i], i, arr);
                    } else {
                        value = arr[i];
                        valueFlag = true;
                    }
                }
            }
            if (!valueFlag) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            return value;
        }
    },

    toArray : function(obj) {
        /**
         * 将任意变量转换为数组对象 (typeUtils->types.js)
         */
        var type = typeUtils.getType(obj);
        return type ? (type !== 'array' && type !== 'arguments' ? [obj] : obj) : [];
    },
    contains : function(arr, element) {
        /**
         * 判断数组是否包含某元素
         */
        return this.indexOf(arr, element) > -1;
    },
    uniquelize : function(arr) {
        /**
         * 返回由原数组中不重复元素所组成的新数组
         */
        var ret = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (!this.contains(ret, arr[i])) {
                ret.push(arr[i]);
            }
        }
        return ret;
    },
    intersect : function(arr, arr2) {
        /**
         * 返回由两个参数数组交集元素所组成的新数组 (a ∩ b)
         */
        var ret = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (this.contains(arr2, arr[i])) {
                ret.push(arr[i]);
            }
        }
        return ret;
    },
    minus : function(arr, arr2) {
        /**
         * 返回由两个参数数组差集元素所组成的新数组 (a - b)
         */
        var ret = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (!this.contains(arr2, arr[i])) {
                ret.push(arr[i]);
            }
        }
        return ret;
    },
    union : function(arr, arr2) {
        /**
         * 返回由两个参数数组并集元素所组成的新数组 (a U b)
         */
        return this.uniquelize(arr.concat(arr2));
    }
};
