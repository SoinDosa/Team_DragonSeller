const express = require('express');
const router = express.Router();
const multer = require('multer');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload_example/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
})
   
var upload = multer({ storage: storage }).single("file")




router.post('/image', (req, res) => {

    // 가져온 이미지를 저장  (multer를 사용)
    upload(req, res, err => {
        if(err){
            return res.json({ success: false, err})
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename
        })
    }) 
})


<<<<<<< Updated upstream

=======
  //mongoDB condition 말하는 것
    let order = req.body.order ? req.body.order: "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
  
  // data fetch할때 order, ~대로 sorting, 띄우는 수 제한, skip
    Product.find()
      //.populate("Writer")
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(skip)
      .exec((err,products) => {
        if(err) return res.status(400).json({success: false, err})
        res.status(200).json({success:true, products, postSize: products.length})
      })
  })
>>>>>>> Stashed changes

module.exports = router;