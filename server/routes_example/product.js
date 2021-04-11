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




app.post('/image', (req, req) => {

    // 가져온 이미지를 저장  (multer를 사용)
    upload(req, res, err => {
        if(err){
            return res.json({ success: false, err})
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename
        })
    }) 
})




module.exports = router;