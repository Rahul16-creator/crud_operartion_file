const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const _ = require('lodash')

const port=process.env.PORT || 3000;
const fileOperationRoutes=require('./routes/file_operation');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(fileOperationRoutes);

app.use(function (err, req, res, next) {
    if (err.name == "JsonSchemaValidationError") {
        
        let errorMessage = ""
        if (err.validationErrors.query) {
            errorMessage = (_.map(err.validationErrors.query, "message")).join(", ")
        } else if (err.validationErrors.params) {
            errorMessage = (_.map(err.validationErrors.params, "message")).join(", ")
        } else {
            errorMessage = (_.map(err.validationErrors.body, "message")).join(", ")
        }
        
        
        res.status(406).json({
            "status": false,
            "message": "Error in Input Validations.",
            "error_obj": err
        })
    }
    else {
        
        res.status(err.code || 500)
        
        res.json({
            status: false,
            name: err.errors,
            message: err.msg,
            error: err.stack
        })
    }
})

app.listen(port,()=>{
    console.log("APP CONNECTED TO THE PORT "+port);
})