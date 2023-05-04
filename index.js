const express = require('express') // 설치한 express 모듈 가져오기
const app = express() // 불러온 express 모듈을 통해 새로운 앱으로 생성
const port = 3000 // 포트 번호는 3000번


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://wlstpgns51:s3eA6UhzoAltPfdU@cluster0.6ifamrb.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

//{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}

app.get('/', (req, res) => {
  res.send('Hello World!')
}) // /루트 디렉토리에 요청을 보내고 응답을 받겠다!

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) // app을 3000번 포트에서 실행. 실행하면 콘솔 내용이 나옴.