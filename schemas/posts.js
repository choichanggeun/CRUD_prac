const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            requried: true,
            ref: "User"
        },
        nickname: {
            type: String,
            ref: "User"
        },
        title: {
            type: String
        },
        content: {
            type: String
        },
       
    },
    {
        timestamps: true
    },
    {
        versionKey: false,
    } ///__v나오는거 삭제해줌
);

postsSchema.virtual("postId").get(function () {
    return this._id.toHexString();
});
postsSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("Posts", postsSchema);