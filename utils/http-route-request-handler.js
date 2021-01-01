'use strict';

module.exports = exports = function (method, ...args) {


    return function (req, res, next) {

        if (!res.locals.data) {
            res.locals.data = {};
        }
        method(...args).then((result) => {
            if (result != undefined) {
                res.locals.data = result
            }
            next();
        }).catch((error) => {
            res.locals.err = true
            res.locals.data.name = error._name || error.name
            res.locals.data.status = false
            res.locals.data.message = "Something went wrong"
            res.locals.data.code = 500
            next();
        });
    };
};