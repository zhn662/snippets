var cookieUtils = {
    set : function(name, value, hour, path, domain) {
        /**
         * 设置cookie及其有效期
         * name:userId, value:101, hour:24, path:/, domain:1699.mobi
         */
        var expire = new Date();
        if (hour) {
            expire.setTime(new Date().getTime() + 3600000 * hour);
        }

        var data = name + '=' + value + '; ';
        data += hour ? 'expires=' + expire.toUTCString() + '; ' : '';
        data += path ? 'path=' + path + '; ' : '';
        data += domain ? 'domain=' + domain : '';
        window.document.cookie = data;
    },
    get : function(name) {
        /**
         * 获取指定名称的cookie值
         */
        var regexp = new RegExp('(?:^|;+|\\s+)' + name + '=([^;]*)');
        var matches = window.document.cookie.match(regexp);
        return !matches ? '' : matches[1];
    },
    remove : function(name, path, domain) {
        /**
         * 删除指定cookie, 复写为过期
         */
        var data = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; ';
        data += path ? 'path=' + path + '; ' : '';
        data += domain ? 'domain=' + domain : '';
        window.document.cookie = data;
    }
};
