const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
      
    user: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },

    createdAt: {
        type: String,
        required: true
    }

});


commentSchema.virtual('_getPost').get(function() {
    return {
        postId : this._id,
        user: this.user,
        password:this.password,
        title : this.title,
        content : this.content,
        createdAt: this.createdAt
    } 
  });

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;

