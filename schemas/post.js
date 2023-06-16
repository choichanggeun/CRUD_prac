const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    


    user: {
        type: String,
        required: true,
        unique: true,
   
    },
    password: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
        unique: true,
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

postSchema.virtual('_getPost').get(function() {
    return {
        postId : this._id,
        user: this.user,
        password:this.password,
        title : this.title,
        content : this.content,
        createdAt: this.createdAt
    } 
  });
const Post = mongoose.model("post", postSchema);
module.exports = Post;


