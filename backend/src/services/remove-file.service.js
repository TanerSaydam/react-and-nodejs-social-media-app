const fs = require("fs");

const removeFile = ([files]) =>{
    if(files != undefined){
        for (const file of files) {
            fs.unlink(file.path, ()=> {});
        }
    }
}

module.exports = removeFile;