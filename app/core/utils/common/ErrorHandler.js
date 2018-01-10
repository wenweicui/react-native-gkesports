let _e = require('ErrorUtils');
export const ErrorHandler = function () {
    // if (!__DEV__)
        _e.setGlobalHandler(function (err) {
            console.log('捕获了一个问题：' + err);
        });
};