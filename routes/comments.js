const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment.js");
const Post = require("../schemas/post.js");

//댓글 전체 조회 API
router.get("/comments/:_id", async (req, res) => {
    const abc = await Comment.find({});
    res.status(200).json(abc);
  });

//댓글 등록 API
router.post("/comments/:_id", async (req, res) => {
    const { commentId, user, password, content } = req.body;
    const { _id } = req.params;

    let today = new Date();
    const createdAt = today.toLocaleString()
  
    const post = await Post.findOne({_id});

    if(!post) {
        return res.status(404).json({message:'게시글을 찾을 수 없습니다.'})
    }

    if (!content) {
        res.status(200).json({
            success: false,
            errorMessage: "데이터 형식이 올바르지 않습니다."
          });
    } 
    const createdPosts = await Comment.create({commentId,  user, password, content , createdAt});
    res.json({posts:createdPosts});
    
  });


  
  // 댓글 수정 API
router.put('/comments/:commentId', async (req, res) => {
    const {password,content} = req.body;
    
    try {
      const result = await Comment.findOne({ password: password });
    
      if (result) {
        await Comment.updateOne({ password: password }, { $set: { content: content } });
        return res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false, message: '비밀번호에 일치하는 댓글이 없습니다.' });
      }
    } catch (error) {
      console.error("에러 발생", error);
      res.status(500).json({ success: false, message: '서버에서 문제가 발생했습니다.' });
    }
  })
  
  //댓글 삭제 API
  router.delete("/comments/:commentId", async(req,res)=> {
    const {password} = req.body;
  
    const result = await Comment.findOneAndDelete({ password: password });
      if(result){
        return res.status(200).json({ success: true, message: '댓글이 삭제되었습니다.' });
      }
      res.status(400).json({success:false, message: '댓글 삭제에 실패했습니다.'});
  })
  

  
module.exports = router;