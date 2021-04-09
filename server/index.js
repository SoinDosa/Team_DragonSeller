const express = require('express')
const app = express()

app.get('/', (req, res) => {
	res.send('Hello world!')
})

const port = 5000
app.listen(port, () => {
	console.log('Example app listening at http://localhost:5000')
})

