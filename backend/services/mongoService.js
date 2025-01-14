const mongoose = require('mongoose');

mongoose.connect("mongodb://mongodb-0.mongodb-service:27017,mongodb-1.mongodb-service:27017/mydatabase?replicaSet=rs0", {
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

const DataSchema = new mongoose.Schema({
    original : String,
    encoded : String,
});

const DataModel = mongoose.model("Data", DataSchema);

async function storeInMongo(text){
    // console.log(text);
    const encoded = Buffer.from(text).toString("base64");
    const data = new DataModel({original : text, encoded});
    return await data.save();
}

async function fetchFromMongo(){
    const results = await DataModel.find();
    return results.map((item) =>({
        original: item.original,
        encoded: item.encoded,
        db: "MongoDB",
    }));
}

module.exports = {storeInMongo, fetchFromMongo};