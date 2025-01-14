const express = require("express");
const {storeInMySQL, fetchFromMySQL} = require("../services/mysqlService");
const router = express.Router();

router.post("/", async(req, res) => {
    const {text} = req.body;

    try{
        const result = await storeInMySQL(text);
        res.status(200).json({message: "Data stored in MYSQL", data: result});
    }catch(error) {
        console.error("Error storing in MySQL : ", error);
        res.status(500).json({message: "Error storing in MySQL"});
    }

});

router.get("/", async(req, res) => {
    try{
        const data = await fetchFromMySQL();
        res.status(200).json(data);
    }catch(error){
        console.error("Error fetching from MySQL : ", error);
        res.status(500).json({message: "Error fetching from MySQL"});
    }
});

module.exports = router;