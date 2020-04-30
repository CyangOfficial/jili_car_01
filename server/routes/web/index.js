// module.exports = app => {

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const router = express.Router();
const query = require('../../module/db');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const assert = require("http-assert");
const authMiddleWare = require('../../middleware/auth');
const multer = require('multer');

const upload = multer({ dest: __dirname + '/../../uploads' });
router.post('/avatar', authMiddleWare(), upload.single('file'), async function (req, res) {
  const file = req.file;
  const { id } = req.body;
  file.url = 'http://localhost:3000/uploads/' + file.filename;
  let avatar = await query(`update users set avatar='uploads/${file.filename}' where id=${id}`);
  console.log(avatar)
  res.send(file);
});

router.get('/banner', async function (req, res) {
  const data = await query(`select * from banner`);
  res.send(data);
});

router.get('/headCars', async function (req, res, next) {
  const sql = `select * from cars`;
  const data = await query(sql);
  res.send(data);
});

//获取汽车数据
router.get('/order', async function (req, res, next) {
  const carId = req.query.id; //carId

  //根据汽车ID查询出排量列表
  const sql = `select volume.id,name from volume 
  INNER JOIN cars_volume_base mid on mid.volume_id=volume.id 
  INNER JOIN cars on cars.id=${carId} and cars.id=mid.car_id`;
  let volumeList = await query(sql);

  //根据汽车ID查询出汽车的标题和销量
  let baseInfo = await query(`select * from cars where id=${carId}`);
  //根据汽车ID查询出汽车颜色列表
  let colorList = await query(`select id,color_name,sm_url,img_url from colors where car_id=${carId}`);

  //根据汽车ID查询汽车内饰
  let inner = await query(`select * from inner_color where car_id=${carId}`);

  if (baseInfo.length === 0) {
    console.log('没有找到汽车')
    res.send(null);
  } else {
    res.send({
      baseInfo,
      volumeList,
      colorList,
      inner
    });
  }
});

//获取型号
router.get('/model', async function (req, res) {
  const volId = req.query.id;
  //根据排量ID查询出对应的型号
  let sql = `select model_name,model.id from model 
  inner join model_volume_base mv on model.id=mv.model_id
  inner join volume on volume.id=mv.volume_id and volume.id=${volId}`;
  let data = await query(sql);
  res.send(data);
});

//获取价格
router.get('/price', async function (req, res) {
  const { carId, volId, modelId } = req.query;
  let sql = `select car_price from price where car_id=${carId} and volume_id=${volId} and model_id=${modelId}`;
  let data = await query(sql);
  res.send(data);
});

//获取库存
router.get('/stock', async function (req, res) {
  const { carId, volId, modelId, colorId } = req.query;
  console.log(req.query)
  let sql = `select stock from stock where car_id=${carId} and volume_id=${volId} and model_id=${modelId} and color_id=${colorId}`;
  let data = await query(sql);
  // console.log(data);
  res.send(data);
});

//获取新闻列表
router.get('/news', async function (req, res) {
  let page = req.query.page;
  //查询新闻数据
  let newsList = await query(`select id,title,description,bowser_count,create_time,like_count,news_pic,share_count from news limit ${(page - 1) * 8},8`);
  //统计新闻数量
  let count = await query(`select count(*) as count from news`);
  res.send({
    newsList,
    count: count[0].count
  });
});

//新闻详情
router.get('/newsContent', async function (req, res) {
  let newsId = req.query.id;
  let data = await query(`select id,title,create_time,content,like_count,share_count from news where id=${newsId}`);
  res.send(data[0]);
});

//浏览量
router.get('/addBowser', async function (req, res) {
  let newsId = req.query.id;
  let bowserNum = await query(`select bowser_count from news where id=${newsId}`);
  console.log(bowserNum[0].bowser_count)
  let data = await query(`update news set bowser_count=${bowserNum[0].bowser_count + 1} where id=${newsId}`);
  res.send({
    success: true
  });
});

//新闻搜索
router.get('/search', async function (req, res) {
  let keyWords = req.query.wd;
  let data = await query(`select id,title,description,bowser_count,create_time,like_count,news_pic,share_count from news where title like '%${keyWords}%'`);
  if (data.length === 0) {
    data = await query(`select id,title,description,bowser_count,create_time,like_count,news_pic,share_count from news where content like '%${keyWords}%'`);
  }
  console.log(data)
  res.send({
    newsList: data || []
  });
});

//新闻收藏+1
router.get('/getFavors', async function (req, res) {
  let id = req.query.id;
  let likeNum = await query(`select like_count from news where id=${id}`);
  // console.log(likeNum[0].like_count)
  let updateOne = await query(`update news set like_count=${likeNum[0].like_count + 1} where id=${id}`);

  if (updateOne.changedRows === 1) {
    let data = await query(`select id,title,description,bowser_count,create_time,like_count,news_pic,share_count from news where id=${id}`);
    res.send({
      success: true,
      data: data[0]
    })
  } else {
    res.send({
      success: false,
      data: []
    })
  }
});

//新闻收藏-1
router.get('/delFavors', async function (req, res) {
  let id = req.query.id;
  let likeNum = await query(`select like_count from news where id=${id}`);
  // console.log(likeNum[0].like_count)
  let updateOne = await query(`update news set like_count=${likeNum[0].like_count - 1} where id=${id}`);
  if (updateOne.changedRows === 1) {
    let data = await query(`select id,title,description,bowser_count,create_time,like_count,news_pic,share_count from news where id=${id}`);
    res.send({
      success: true,
      data: data[0]
    })
  } else {
    res.send({
      success: false,
      data: []
    })
  }
});

//获取用户基本信息
router.post('/basicInfo', authMiddleWare(), async function (req, res) {
  let { token } = req.body;
  let tokenData = jwt.verify(token, 'this is secret key');
  let data = await query(`
  select id,username,name,birthday,occupation,
  location,email,per_sig,sex,state,avatar 
  from users where id=${tokenData.id}`);
  console.log(data)
  res.send({
    data
  });
});

//用户个人信息修改
router.put('/basicInfo', authMiddleWare(), async function (req, res) {
  let { id, name, sex, birthday, occupation, location, email, per_sig } = req.body;
  let sql = `update users set 
  name='${name}',
  sex='${sex}',
  birthday='${birthday}',
  occupation='${occupation}',
  location='${location}',
  email='${email}',
  per_sig='${per_sig}' where id=${id}`;
  let resData = await query(sql);
  if (resData.affectedRows > 0) {
    res.send({
      state: 1,
      message: '修改成功'
    });
  } else {
    res.send({
      state: 0,
      message: '修改失败'
    });
  }
});



//用户预约
router.post('/predict', async function (req, res) {
  let { car, location, name, sex, phone, email } = req.body;
  let sql = `insert into predict(model,location,name,sex,phone,email,time) values('${car}','${location}','${name}','${sex}',${phone},'${email}','${moment().format('YYYY-MM-DD')}')`;
  let resData = await query(sql);
  res.send({
    success: true
  });
});


//修改密码
router.put('/password', authMiddleWare(), async function (req, res) {
  let { id, origin, newPas } = req.body;
  let findUser = await query(`select id,password from users where id=${req.findUser[0].id}`);
  const isValid = bcrypt.compareSync(origin, findUser[0].password);
  console.log(isValid)
  if (!isValid) {
    res.send({
      state: 1,
      message: '原始密码错误'
    });
    return
  }
  let pas = bcrypt.hashSync(newPas, 12);
  console.log(id)
  let changePasswd = await query(`update users set password='${pas}' where id=${req.findUser[0].id}`);
  if (changePasswd.affectedRows > 0) {
    res.send({
      state: 0,
      message: '修改成功，请重新登录!'
    });
  } else {
    res.send({
      state: 1,
      message: '修改失败'
    });
  }
});

//获取省
router.get('/provice', async function (req, res) {
  let data = await query(`select * from city where type=1`);
  res.send({
    data
  });
});

//获取城市
router.get('/city', async function (req, res) {
  let { id } = req.query;
  let data = await query(`select * from city where type=2 and pid=${id}`);
  res.send({
    data
  });
});


//注册接口
router.post('/register', async function (req, res, next) {
  let { username, password } = req.body;
  let sql1 = `select * from users where username='${username}'`;
  let isUser = await query(sql1);
  if (isUser.length > 0) {
    res.send({
      msg: '该用户名已存在',
      state: 0
    })
  } else {
    //注册
    let hash = bcrypt.hashSync(password, 12); //bcrypt 对密码进行加密
    let sql2 = `insert into users(username,password,reg_time) values('${username}','${hash}', '${moment().format('YYYY-MM-DD')}')`;
    let regRes = await query(sql2);
    if (regRes.affectedRows > 0) {
      res.send({
        msg: '注册成功',
        state: 1
      })
    }
  }
});

//登录接口
router.post('/login', async function (req, res) {
  let { username, password } = req.body;
  //根据用户名找用户
  const findUserSql = `select * from users where username='${username}'`;
  let userRes = await query(findUserSql);
  // assert(userRes.length !== 0, 422, '用户不存在')
  if (userRes.length === 0) {
    return res.status(422).send({
      message: '用户不存在'
    });
  }

  //校验密码
  //参数1：用户输入的密码，参数2：数据库加密后的密码
  const isValid = bcrypt.compareSync(password, userRes[0].password);
  // assert(isValid, 422, '密码错误');
  if (!isValid) {
    return res.status(422).send({
      message: '密码错误'
    });
  }
  console.log(app.get('secret'));
  //返回token
  const privateKey = 'this is private key' //加密的密文
  //app.get(xxx)只有一个参数的时候是获取配置
  const token = jwt.sign({ id: userRes[0].id }, 'this is secret key');
  // if(){

  // }
  console.log(token);
  //给客户端返回token
  res.send({ token, userId: userRes[0].id });
});

app.use(async (err, req, res, next) => {
  console.log('err:' + err)
  res.status(err.statusCode || 500).send({
    message: err.message
  });
});

module.exports = router;

// }