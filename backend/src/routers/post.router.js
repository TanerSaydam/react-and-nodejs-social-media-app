const express = require("express");
const Post = require("../models/post")
const response = require("../services/response.service");
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const upload = require("../services/upload.service");

//Get All Post With Pagination
router.post("/posts", async (req, res)=>{
    response(req,res, async () =>{
        const {pageSize, userId} = req.body;        
        const posts = 
            await Post
                .aggregate([
                            {
                                $lookup: {
                                    from: "users",
                                    localField: "userId",
                                    foreignField: "_id",
                                    as: "users"
                                }
                            },
                            {
                                $lookup: {
                                    from: "likeposts",
                                    localField: "_id",
                                    foreignField: "postId",
                                    as: "likes"
                                }
                            },
                            {
                                $lookup: {
                                    from: "comments",
                                    let: { postId: "$_id" },
                                    pipeline: [
                                        { 
                                            $match: { 
                                                $expr: { $eq: ["$postId", "$$postId"] } 
                                            } 
                                        },
                                        {
                                            $lookup: {
                                                from: "users",
                                                localField: "userId",
                                                foreignField: "_id",
                                                as: "user"
                                            }
                                        },
                                       {
                                        $unwind: "$user"
                                       }
                                    ],
                                    as: "comments"
                                }
                            },
                            { $sort: { createdDate: -1 } },
                            { $limit: pageSize }
                           ])                           

        res.json(posts);
    })
});


//Add Post
router.post("/post/add", upload.single("file"),async(req,res)=>{
    response(req,res, async()=>{
        const {userId, content, fileType} = req.body;

        const post = new Post({
            _id: uuidv4(),
            content: content,
            userId: userId,
            createdDate: new Date(),
            video: fileType == "video" ? req.file : {},
            image: fileType == "image" ? req.file : {},
        });

        await post.save();

        res.json({message: "Post başarıyla kaydedildi!"});
    });
})

module.exports = router;