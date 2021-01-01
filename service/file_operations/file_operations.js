const fs = require('fs');
const path = require('path')
const AppClass = require('../app-class/app-class');
const _ = require('lodash')

class FileOperations extends AppClass {

    async addData(query, data) {

        let file_path = path.join(__dirname, '../../file', query['account_id'] + "_myjson.json");

        // Check the file exists or not
        if (fs.existsSync(file_path)) {

            let data_obj = {};
            data_obj = this.readFile(file_path);

            // Check the duplicate
            if (this.findDuplicate(data_obj, query)) {
                return {
                    code: 400,
                    status: false,
                    message: "This Key is already present"
                };
            }
            // Check the data size
            if (this.checkObjectSize(data)) {

                // check the file size
                this.checkFileSize(file_path, data)

                // write the data to file
                this.writeFile(file_path, data_obj, query, data);
            }
        }
        else {
            const data_obj = {}
            // Check the data size
            if (this.checkObjectSize(data)) {

                // write the data to file
                this.writeFile(file_path, data_obj, query, data);
            }

        }

        return {
            status: true,
            message: "DATA INSERTED SUCCESSFULLY"
        };


    }

    //get the full data from file
    readFile(fileName) {
        let data = {}
        data = JSON.parse(fs.readFileSync(fileName))
        return data
    }


    checkObjectSize(data_obj) {
        const size = Buffer.byteLength(JSON.stringify(data_obj))
        if ((size / 1024) > 16) {
            return {
                code: 400,
                status: false,
                message: "Object size is greater than 16 kb"
            };
        }
        return true;
    }

    checkFileSize(fileName, data) {

        let size = Buffer.byteLength(JSON.stringify(data))
        size /= (1024 * 1024)

        let stats = fs.statSync(fileName)
        let fileSizeInBytes = stats.size;
        let fileSizeInMegabytes = (fileSizeInBytes) / (1024 * 1024);
        if ((fileSizeInMegabytes + size) > 1) {
            return {
                code: 400,
                status: false,
                message: "file size is greater than 1MB"
            };
        }
        return true
    }

    writeFile(file_path, data_obj, query, data) {
        data_obj[query['product_id']] = data;


        if (this.checkObjectSize(data_obj)) {
            let datas = JSON.stringify(data_obj)
            fs.writeFileSync(file_path, datas)
        }
    }


    findDuplicate(data_obj, query) {
        if ((query['product_id'] in data_obj)) {
            return true;
        }
        else {
            return false;
        }
    }


    async getDataById(query) {

        let file_path = path.join(__dirname, '../../file', query['account_id'] + "_myjson.json");

        if (fs.existsSync(file_path)) {
            // get the full data
            let data = this.readFile(file_path);
            if ((query['product_id'] in data)) {
                return data[query['product_id']];
            }
            else {
                return {
                    code: 400,
                    status: false,
                    message: "This Key id data is Not found"
                };
            }

        }
        else {
            return {
                code: 400,
                status: false,
                message: "Data doesnot found ! please create a file"
            };
        }

    }



    async deleteElemetById(query) {
        let file_path = path.join(__dirname, '../../file', query['account_id'] + "_myjson.json");

        if (fs.existsSync(file_path)) {
            let data = this.readFile(file_path);

            if ((query['product_id'] in data)) {

                delete data[query['product_id']];
                let datas = JSON.stringify(data)

                if (this.checkObjectSize(data_obj)) {
                    fs.writeFileSync(file_path, datas);
                }
                return {
                    status: true,
                    message: "DATA DELETED SUCCESSFULLY"
                }
            }
            else {
                return {
                    code: 400,
                    status: false,
                    message: "This Key id data is Not found"
                };
            }

        }
        else {
            return {
                code: 400,
                status: false,
                message: "Data does not found ! please create a file"
            };
        }

    }

}

module.exports = new FileOperations();