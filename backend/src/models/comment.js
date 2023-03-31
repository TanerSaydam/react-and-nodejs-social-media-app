const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    _id: String,
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdDate: Date
    // parentCommentId: String,
    // children: [{
    //     type: String,
    //     ref: 'Comment'
    // }]
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;