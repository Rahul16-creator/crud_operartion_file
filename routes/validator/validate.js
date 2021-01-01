let queryParamSchema = {
    "type": "object",
    "properties": {
        "account_id": { "type": "string" },
        "product_id": { "type": "string" }
    },
    "required": [
        "account_id",
        "product_id"
    ]
}

let productSchema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "price": {
            "type": "number"
        },
        "description": {
            "type": "string"
        }
    }
}

module.exports.queryParamSchema = queryParamSchema;
module.exports.productSchema=productSchema;


