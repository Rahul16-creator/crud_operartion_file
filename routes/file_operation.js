'use strict'

const express = require('express');
const router = express.Router();

const Validator = require('express-json-validator-middleware').Validator;
const validate = new Validator({ allErrors: true }).validate;
const schema = require('./validator/validate');

const reqHandler = require('../utils/http-route-request-handler');
const Service = require('../service/file_operations/file_operations');
const resSender = require('../utils/http-route-response-sender');



router.get('/get_product', validate({ query: schema.queryParamSchema }), (req, ...args) => reqHandler(Service.getDataById, req.query)(req, ...args), (req, res, next) => {
    next()
}, resSender);


router.post('/add_product', validate({ query: schema.queryParamSchema, body: schema.productSchema }), (req, ...args) => reqHandler(Service.addData, req.query, req.body)(req, ...args), (req, res, next) => {
    next()
}, resSender);


router.delete('/delete_product', validate({ query: schema.queryParamSchema }), (req, ...args) => reqHandler(Service.deleteElemetById, req.query)(req, ...args), (req, res, next) => {
    next()
}, resSender);



module.exports = router;