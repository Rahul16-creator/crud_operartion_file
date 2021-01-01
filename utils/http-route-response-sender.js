'use strict';

module.exports = exports = function (req, res, next) {

    let locals = res.locals;

    let status = 200;
    
        console.log("************");
        if ("code" in res.locals.data) {
            status = res.locals.data.code
            delete res.locals.data['code']
        }
    

    if (locals.data) {
        return res.status(status).send(locals.data);
    }
    next();
};
