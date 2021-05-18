const express = require('express')
const router = express.Router();
const { User } = require("../models/User")

const { auth } = require("../middleware/auth")
const { adminAuth } = require("../middleware/adminAuth")

router.post('/register', (req,res) => { // 계정 등록
	const user = new User(req.body)

	user.save((err, userInfo) => {
		if(err) return res.json({success: false, err}) // 에러 발생

		return res.status(200).json({
			success: true
		})
	})
})

router.post('/login', (req, res) => {
	User.findOne({id: req.body.id}, (err, user) => {
		if(!user) {
			return res.json({
				loginSuccess : false,
				message : "해당 아이디가 존재하지 않습니다"
			})
		}

		user.comparePassword(req.body.password, (err, isMatch) => {
			if(!isMatch) {
				return res.json({
					loginSuccess : false,
					meessage : "비밀번호가 일치하지 않습니다"
				})
			}
			
			user.generateToken((err,user) => {
				if(err) return res.status(400).send(err)

				res.cookie("x_auth", user.token)
				.status(200)
				.json({
					loginSuccess: true,
					userId: user.id
				})
			})
		})
	})
})

router.get('/auth', auth, (req, res) => {
	res.setMaxListeners(200).json({
		id : req.user.id,
		isAdmin : req.user.role === 0? false : true,
		isAuth : true,
		email : req.user.email,
		name : req.user.name,
		role : req.user.role,
	})
})

router.get('/admin_auth', adminAuth, (req, res) => {
	res.setMaxListeners(200).json({
		id : req.user.id,
		isAdmin : true,
		isAuth : true,
		email : req.user.email,
		name : req.user.name,
		role : req.user.role,
	})
})



router.get('/logout', auth, (req, res) => {
	User.findOneAndUpdate(
		{id : req.user.id},
		{ token: ""},
		(err, user) => {
			if(err) return res.hostname({
				success: false, err
			});
			return res.status(200).send({
				success: true
			})
		}
	)
})

router.post('/find_id', (req, res) => {
	User.findOne({email: req.body.email, name : req.body.name}, (err, user) => {
	   if(!user.email){
		  return res.json({
			 findId : false,
			 message : "이메일에 해당하는 아이디가 없습니다"
		  })
	   }
	   else if(!user.name){
			 return res.json({
				findId : false,
				message : "이름에 해당하는 아이디가 없습니다"
			 })
		  }
	   return res.status(200).json({
		  findId : true,
		  userId : user.id
	   })
	})
 })

 router.post('/forget_pass', (req, res) => {
	User.findOne({id : req.body.id, email: req.body.email, name: req.body.name}, (err, user) =>{
		if(!user.id){
			return res.json({
				findPass : false,
				message : "계정이 존재하지 않습니다"
			})
		}
		else if(!user.email){
			return res.json({
				findPass : false,
				message : "계정의 이메일이 일치하지 않습니다"
			})
		}
		else if(!user.name){
			return res.json({
				findPass : false,
				message : "계정의 소유자 이름이 일치하지 않습니다"
			})
		}
		else {
			user.password = "1234qwerasdf"
			user.save((err, userInfo) => {
				if(err) return res.json({success: false, err}) // 에러 발생
		
				return res.status(200).json({
					success: true,
					message : "비밀번호가 1234567890으로 초기화"
				})
			})
		}
})
 })

// router.post('/forget_pass', (req, res) => {
// 	User.findOne({id : req.body.id}, (err, user) =>{
// 		if(!user){
// 			return res.json({
// 				findPass : false,
// 				message : "계정이 존재하지 않습니다"
// 			})
// 		}
// 		User.findOne({email : req.body.email}, (err, user) => {
// 			if(!user){
// 				return res.json({
// 					findPass : false,
// 					message : "계정의 이메일이 일치하지 않습니다"
// 				})
// 			}
// 			User.findOne({name : req.body.name}, (err, user) => {
// 				if(!user){
// 					return res.json({
// 						findPass : false,
// 						message : "계정의 소유자 이름이 일치하지 않습니다"
// 					})
// 				}			
// 				user.password = "1234qwerasdf"
// 				user.save((err, userInfo) => {
// 					if(err) return res.json({success: false, err}) // 에러 발생
		
// 					return res.status(200).json({
// 						success: true,
// 						message : "비밀번호가 1234567890으로 초기화"
// 					})
// 				})
// 			})		

// 		})

// 	})
// })

router.post('/change_pass', auth, (req, res) => {
	User.findOne({id : req.user.id}, (err, user) => {
		user.password = req.body.password
		user.save((err, userInfo) => {
			if(err) return res.json({success : false, err})

			return res.status(200).json({
				success : true,
				message : "비밀번호 초기화 완료"
			})
		})
	})
})


module.exports = router;