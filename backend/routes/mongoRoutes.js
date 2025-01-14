const express = require('express');
const {storeInMongo, fetchFromMongo} = require('../services/mongoService');
const router = express.Router();

router.post("/", async(req, res) => {
    // console.log("Req:",req.body);
    const {text} = req.body;
    // console.log("In Route:",text);

    try{
        const result = await storeInMongo(text);
        res.status(200).json({message : "Data stored in MongoDB", data : result});
    }catch(error) {
        console.error("Error storing in MongoDB:", error);
        res.status(500).json({message: "Error storing in MongoDB"});
    }

});

router.get("/", async(req, res) => {
    try{
        const data = await fetchFromMongo();
        res.status(200).json(data);
    }catch(error){
        console.error("Error fetching data from MongoDB:", error);
        res.status(500).json({message : "Error fetching from MongoDB"});
    }
});

module.exports = router;