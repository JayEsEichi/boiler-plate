  const express = require('express') // 설치한 express 모듈 가져오기
  const app = express() // 불러온 express 모듈을 통해 새로운 앱으로 생성
  const port = 5100 // 포트 번호는 3000번

  const config = require('./config/key')

  // 만들었던 User.js 엔티티 모델을 불러온다.
  const {User} = require("./models/User");
  // BodyParser 를 호출한다.
  // BodyParser 는 java랑 비교하자면 RequestBody 어노테이션으로 json 형식의 데이터들을 받아주는 객체라고 생각하면 된다.
  const bodyParser = require('body-parser');

  // application/x-www-for-urlencoded 형식의 데이터들을 받아서 분석할 수 있도록 옵션을 부여
  app.use(bodyParser.urlencoded({extended: true}));
  // application/json 형식의 데이터들을 받아서 분석할 수 있도록 옵션 부여
  app.use(bodyParser.json());

  const mongoose = require('mongoose')
  mongoose.connect(config.mongoURI, {})
  .then(() => {
    console.log('MongoDB Connected...')
  })
  .catch(err => console.log(err))

  //{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}

  app.get('/', (req, res) => {
    res.send('안녕하냐 world! ')
  }) // /루트 디렉토리에 요청을 보내고 응답을 받겠다!


  app.post('/register', async (req, res) => {
    //회원가입시 필요 정보를 client에서 가져오면
    //데이터베이스에 삽입한다
  
    //body parser를 통해 body에 담긴 정보를 가져온다
    const user = new User(req.body)
  
    // mongoDB 메서드, user모델에 저장
    // 요청 body 값이 넣어진 user 인스턴스를 저장한다.
    // 저장할 때 에러가 발생되었다면 json 형식의 데이터로 err 메세지를 보낸다.
    // 저장이 성공했으면 json 형식의 데이터로 success true를 반환한다. 

    // 또한,mongoose 특정 버전 이상으로는 콜백 함수를 지원하지 않는다고 한다.
    // 콜백 함수라는 것은 함수 내에서 실행되는 다른 함수를 의미한다.
    // 따라서 기존의 if, else 는 사용하지 못하고 then, catch 그리고 async와 await 를 사용해야 한다.
    const result = await user.save()
    .then(()=>{
      res.status(200).json({
        success: true
      })
    })
    .catch((err)=>{
      res.json({ success: false, err })
    })
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }) // app을 3000번 포트에서 실행. 실행하면 콘솔 내용이 나옴.