const Comment = require("../models/comment");
const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const response = require("../services/response.service");

router.post("/add", async (req,res)=>{
    response(req,res,async ()=>{
        const comment = new Comment(req.body);
        comment._id = uuidv4();
        comment.createdDate = new Date();
        await comment.save();
        res.json({message: "Yorum başarıyla kaydedildi!"});
    });
});


module.exports = router;
