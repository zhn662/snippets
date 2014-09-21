var localStorageUtils = {
    isSupports : function() {
        return ('localStorage' in window) && window.localStorage !== null;
    },
    setItem : function(name, value) {
        if (this.isSupports()) {
            window.localStorage.setItem(name, value);
        }
    },
    getItem : function(name) {
        if (this.isSupports()) {
            return window.localStorage.getItem(name);
        }
        return null;
    },
    removeItem : function(name) {
        if (this.isSupports()) {
            window.localStorage.removeItem(name);
        }
    },
    clear : function() {
        if (this.isSupports()) {
            window.localStorage.clear();
        }
    }
};
