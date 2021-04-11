const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./models/User')
const { auth } = require('./middleware/auth')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://sunny:151515@ds.mc5fr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{
	useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('mongoose connected'))
.catch(err=>console.log(err))


app.get('/', (req, res) => {
	res.send('Hello world!')
})
app.post('/api/users/register', (req,res) => { // 계정 등록
	const user = new User(req.body)

	user.save((err, userInfo) => {
		if(err) return res.json({success: false, err}) // 에러 발생

		return res.status(200).json({
			success: true
		})
	})
})

app.post('/api/users/login', (req, res) => {
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

app.get('/api/users/auth', auth, (req, res) => {
	res.setMaxListeners(200).json({
		id : req.user.id,
		isAdmin : req.user.role === 0? false : true,
		isAuth : true,
		email : req.user.email,
		name : req.user.name,
		role : req.user.role,
	})
})

app.get('/api/users/logout', auth, (req, res) => {
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

app.post('/api/users/find_id', (req, res) => {
	User.findOne({email: req.body.email}, (err, user) => {
		if(!user){
			return res.json({
				findId : false,
				message : "이메일에 해당하는 아이디가 없습니다"
			})
		}
		User.findOne({name : req.body.name}, (err, user) => {
			if(!user){
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
})

app.post('/api/users/forget_pass', (req, res) => {
	User.findOne({id : req.body.id}, (err, user) =>{
		if(!user){
			return res.json({
				findPass : false,
				message : "계정이 존재하지 않습니다"
			})
		}
		User.findOne({email : req.body.email}, (err, user) => {
			if(!user){
				return res.json({
					findPass : false,
					message : "계정의 이메일이 일치하지 않습니다"
				})
			}
			User.findOne({name : req.body.name}, (err, user) => {
				if(!user){
					return res.json({
						findPass : false,
						message : "계정의 소유자 이름이 일치하지 않습니다"
					})
				}			
				user.password = "1234567890"
				user.save((err, userInfo) => {
					if(err) return res.json({success: false, err}) // 에러 발생
		
					return res.status(200).json({
						success: true,
						message : "비밀번호가 1234567890으로 초기화"
					})
				})
			})		

		})

	})
})

app.post('/api/users/change_pass', auth, (req, res) => {
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

// 사진 업로드 페이지를 위한 라우터
app.post('/api/product', require('./routes_example/product'));


const port = 3000
app.listen(port, () => {
	console.log('Example app listening at http://localhost:3000')
})

