const express = require("express");
const router = express.Router();
const Post = require("../schemas/post.js");

//게시글 전체 조회 API
router.get("/posts", async (req, res) => {
  let posts = await Post.find({});

  posts = posts.map((post) => {
    return post._getPost;
  })

  
  res.status(200).json(posts);
});

//게시글 상세 조회 API
router.get("/posts/:_id",async (req, res) => {
  const { _id } = req.params;
  const posts = await Post.findById({_id});

  res.status(200).json(posts);
});
router.post("",function(){})

//게시글 등록 API
router.post("/posts/", async (req, res) => {
  const {user, password, title, content } = req.body;
  let today = new Date();
  const createdAt = today.toLocaleString()
  const posts = await Post.findById({user});

  if (posts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "데이터 형식이 올바르지 않습니다."
    });
  }
  const createdPosts = await Post.create({user, password, title, content , createdAt});

  res.json({posts:createdPosts});
});

// 게시글 수정 API
router.put('/posts/:_id', async (req, res) => {
  const {password,content} = req.body;
  
  try {
    const result = await Post.findOne({password: password });
    console.log(`result: ${result}`)
    if (result) {
      await Post.updateOne({ password: password }, { $set: { content : content } });
      return res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: '비밀번호에 일치하는 게시물이 없습니다.' });
    }
  } catch (error) {
    console.error("에러 발생", error);
    res.status(500).json({ success: false, message: '서버에서 문제가 발생했습니다.' });
  }
})

//게시글 삭제 API
router.delete("/posts/:_id", async(req,res)=> {
  const {password} = req.body;

  const result = await Post.findOneAndDelete({ password: password });
    if(result){
      return res.status(200).json({ success: true, message: '게시물이 삭제되었습니다.' });
    }
    res.status(400).json({success:false, message: '게시물 삭제에 실패했습니다.'});
})

module.exports = router;