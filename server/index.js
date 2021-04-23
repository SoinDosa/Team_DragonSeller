const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI ,
{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(()=>console.log('mongoose connected'))
.catch(err=>console.log(err))


app.get('/api/hello', (req, res) => {
	res.send('Hello world!')
})

// 사진 업로드 페이지를 위한 라우터
//app.post('/api/product', require('./routes/product'));

const port = 5000
app.listen(port, () => {
	console.log('Example app listening at http://localhost:5000')
})

