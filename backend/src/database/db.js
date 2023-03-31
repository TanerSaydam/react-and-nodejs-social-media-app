const mongoose = require("mongoose");

const uri = "mongodb+srv://tsaydam:1@socialmediadb.5z8lqet.mongodb.net/?retryWrites=true&w=majority";

const connectionDb = () =>{
    mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDb bağlantısı başarılı!");
    })
    .catch((err)=> {
        console.log("Hata: " + err.message);
    });
}


module.exports = connectionDb;

