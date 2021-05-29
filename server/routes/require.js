const express = require('express')
const router = express.Router();

const { Require } = require("../models/Require")
const { auth } = require("../middleware/auth")
const { adminAuth } = require("../middleware/adminAuth")



router.post('/', (req, res) => {
  // 받아온 정보들을 db에 저장
  const require = new Require(req.body)

  require.save((err) => {
    if (err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

router.get('/getRequires', (req, res) => {
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let findArgs = {};
  Require.find(findArgs)
    .sort([[sortBy, 1]])
    .exec((err, requires) => {
      if (err) return res.status(400).json({ success: false, err })
      res.status(200).json({ success: true, requires })
    })
})
router.post('/getRequireList', (req, res) => {
  let sortBy = req.body.sortBy ? req.body.sortBy : "createAt";
  let term = req.body.searchTerm;
  let order = -1;
  let findArgs = {};
  console.log(req.body)
  for (let key in req.body.filters) {
    if (req.body.filters[key] > 0) {
      console.log("hi")
      if (key === "sortBy") {
        if (req.body.filters[key] === 1) {
          order = -1
        } else {
          order = 1
        }
      }
      else {
        findArgs[key] = req.body.filters[key]
      }
    }
    console.log("findArgs")
    console.log(findArgs)
  }


  if (term) {
    Require.find(findArgs)
      .find({ 'title': { '$regex': term, '$options': 'i' } })
      .sort([[sortBy, order]])
      .exec((err, requires) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, requires })
      })
  } else {
    Require.find(findArgs)
      .sort([[sortBy, order]])
      .exec((err, requires) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, requires })
      })
  }
})

router.get('/requires_by_id', (req, res) => {

  let requireIds = req.query.id

  Require.find({ _id: requireIds })
    .exec((err, require) => {
      if (err) return res.status(400).send(err)

      return res.status(200).send({ success: true, require })
    })
})

router.post('/addComment', auth, (req, res) => {
  Require.findOneAndUpdate(
    { _id: req.body.requireId },
    {
      $push: {
        comment: {
          id: req.body.requireId,
          comment: req.body.comment,
          date: Date.now()
        }
      }
    },
    { new: true },
    (err) => {
      if (err) return res.status(400).json({ success: false, err })
      else return res.status(200).json({ success: true })
    }
  )

})

module.exports = router;
