var express = require('express');
const query = require('../../module/db');
var router = express.Router();

//图片上传
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: __dirname + '/../../uploads' });
router.post('/upload', upload.single('file'), async function (req, res) {
  const file = req.file;
  file.url = 'http://localhost:3000/uploads/' + file.filename;
  console.log(file)
  res.send(file);
});

//获取车辆列表
router.get('/cars', async function (req, res, next) {
  let page = req.query.page;
  let data = await query(`select * from cars limit ${(page - 1) * 5},5`);
  let count = await query(`select count(*) as count from cars`);
  console.log(page)
  res.send({
    data,
    total: count[0]
  });
});

//获取车辆基本信息
router.get('/carInfo', async function (req, res) {
  let id = req.query.id;
  let data = await query(`select * from cars where id=${id}`);
  res.send(data);
});

//获取车系
router.get('/category', async function (req, res) {
  let data = await query(`select * from category`);
  res.send(data);
});

//车系筛选数据
router.get('/searchCate', async function (req, res) {
  let cateId = req.query.cateId;
  let sql = `select * from cars inner join category cate on cars.cate_id=cate.id and cate_id=${cateId}`;
  let sql2 = `select count(*) as count from cars inner join category cate on cars.cate_id=cate.id and cate_id=${cateId}`;
  let data = await query(sql);
  let count = await query(sql2);
  console.log(count)
  res.send({
    data,
    count: count[0]
  });
});

router.get('/searchCar', async function (req, res) {
  let kw = req.query.kw;
  let data = await query(`select * from cars where car_name like '%${kw}%'`);
  let count = await query(`select count(*) as count from cars where car_name like '%${kw}%'`);
  if (data.length === 0) {
    res.send({
      success: false
    });
  } else {
    res.send({
      success: true,
      data,
      count: count[0]
    });
  }
});

//新增车辆
router.post('/carInfo', async function (req, res) {
  let { data } = req.body;
  let sql = `insert into 
  cars(car_name,sale,head_img_url,car_size,car_engine,car_wheelbase,car_trans_case,car_km_fuel_consumption,offical_price,cate_id,stock) 
  values('${data.car_name}',${data.sale},'${data.head_img_url}','${data.car_size}','${data.car_engine}','${data.car_wheelbase}','${data.car_trans_case}','${data.car_km_fuel_consumption}','${data.offical_price}',${Number(data.cate_id)},${data.stock})`;
  let result = await query(sql);
  if (result.affectedRows > 0) {
    res.send({
      success: true
    });
  } else {
    res.send({
      success: false
    });
  }
});


/**
 * 新建一条记录的话就用post，
 * 更新一条记录的话就用put 
 */
//保存车辆基本信息
router.put('/carInfo', async function (req, res) {
  let { data } = req.body;
  let sql = `update cars 
  set 
    car_name='${data.carInfo.car_name}',
    sale=${data.carInfo.sale},
    stock=${data.carInfo.stock},
    cate_id=${Number(data.carInfo.cate_id)},
    head_img_url='${data.carInfo.head_img_url}',
    car_size='${data.carInfo.car_size}',
    car_engine='${data.carInfo.car_engine}',
    car_wheelbase='${data.carInfo.car_wheelbase}',
    car_trans_case='${data.carInfo.car_trans_case}',
    car_km_fuel_consumption='${data.carInfo.car_km_fuel_consumption}',
    offical_price='${data.carInfo.offical_price}'
  where id=${data.carInfo.id}`;
  let result = await query(sql);
  if (result.affectedRows === 1) {
    res.send({
      success: true
    });
  } else {
    res.send({
      success: false
    });
  }
});

//获取排量列表
router.get('/volumes', async function (req, res) {
  let data = await query(`select * from volume`);
  res.send(data);
});

//获取汽车的排量
router.get('/carVolumes', async function (req, res) {
  let id = req.query.id;
  const sql = `select * from volume
  inner join cars_volume_base mid on volume.id=mid.volume_id
  inner join cars on cars.id=mid.car_id and cars.id=${id}`;
  let data = await query(sql);
  res.send(data);
});

//修改排量
router.put('/carVolumes', async function (req, res) {
  let { carId, volumesId } = req.body;
  console.log(volumesId)
  let resDel = await query(`delete from cars_volume_base where car_id=${carId}`);
  let inertData = await query(`insert into cars_volume_base(car_id,volume_id) values ?`, volumesId);
  if (inertData.affectedRows > 0) {
    res.send({
      success: true
    });
  } else {
    res.send({
      success: false
    });
  }
});

//获取汽车颜色/图片
router.get('/colors', async function (req, res) {
  const id = req.query.id;
  let data = await query(`select * from colors where car_id=${id}`);
  console.log(data)
  res.send(data);
});

//更新汽车颜色/图片
router.put('/colors', async function (req, res) {
  let { carId, colors } = req.body;
  console.log(colors)
  colors = colors.map(item => {
    return [Number(item.car_id), item.color_name, item.sm_url, item.img_url]
  });
  console.log(colors)
  let delRes = await query(`delete from colors where car_id=${carId}`);
  let insertRes = await query(`insert into colors(car_id,color_name,sm_url,img_url) values ?`, colors);
  if (insertRes.affectedRows > 0) {
    res.send({
      success: true
    });
  } else {
    res.send({
      success: false
    });
  }
})

//获取型号列表
router.get('/model', async function (req, res) {
  let data = await query(`select * from model`);
  res.send(data);
});

//更新型号
router.get('/volAndModelMid', async function (req, res) {
  const id = req.query.id;
  const sql1 = `select volume_id from volume
  inner join cars_volume_base mid on volume.id=mid.volume_id
  inner join cars on cars.id=mid.car_id and cars.id=${id}`;
  let volData = await query(sql1);
  let str = '(';
  for (let i = 0; i < volData.length; i++) {
    str = str + volData[i].volume_id + (i === volData.length - 1 ? ')' : ',')
  }
  let sql2 = `select model.id,model.model_name,volume_id from model 
  inner join model_volume_base mid on model.id=mid.model_id
  inner join cars on cars.id=mid.car_id and car_id=${id}
  inner join volume on volume.id=mid.volume_id and volume_id in ${str}`;
  let data = await query(sql2);
  res.send(data);
});

//更新汽车型号
router.put('/model', async function (req, res) {
  let { carId, list } = req.body;
  let delRes = await query(`delete from model_volume_base where car_id=${carId}`);
  let insertRes = await query(`insert into model_volume_base(car_id,volume_id,model_id) values ?`, list);
  if (insertRes.affectedRows > 0) {
    res.send({
      success: true
    });
  } else {
    res.send({
      success: false
    });
  }
});

//获取汽车内饰信息
router.get('/inner', async function (req, res) {
  let id = req.query.id;
  let data = await query(`select * from inner_color where car_id=${id}`);
  res.send({
    data
  });
});

//更新汽车内饰
router.put('/inner', async function (req, res) {
  let { carId, list } = req.body;
  console.log(list)
  list = list.map(item => {
    return [Number(item.car_id), item.sm_url, item.img_url, item.title, item.description, item.col_name]
  });
  console.log(list);
  let delRes = await query(`delete from inner_color where car_id=${carId}`);
  let insertRes = await query(`insert into inner_color(car_id,sm_url,img_url,title,description,col_name) values ?`, list);
  if (insertRes.affectedRows > 0) {
    res.send({
      success: true
    });
  } else {
    res.send({
      success: false
    });
  }
})


//新闻列表
router.get('/news', async function (req, res) {
  let { page } = req.query;
  let data = await query(`select * from news`);
  console.log(data)
  res.send({
    data
  });
});

//获取新闻详情
router.get('/news/content', async function (req, res) {
  console.log('sdfsdfsdfsd');
  let id = req.query.id;
  let data = await query(`select * from news where id=${id}`);
  console.log(data);
  res.send(
    data
  );
});

//修改新闻
router.put('/news', async function (req, res) {
  let { id, title, description, create_time, content, mod_time, news_pic } = req.body;
  let sql = `update news set
  title='${title}',
  description='${description}',
  content='${content}',
  mod_time='${mod_time}',
  create_time='${create_time}',
  news_pic='${news_pic}'
  where id=${id}`;
  let result = await query(sql);
  console.log(result);
  if (result.affectedRows === 1) {
    res.send({
      success: true
    });
  } else {
    res.send({
      success: false
    });
  }

});

//发布新闻
router.post('/news', async function (req, res) {
  let { title, description, create_time, content, mod_time, news_pic } = req.body;
  console.log(req.body);
  let sql = `insert into 
  news(title,description,content,create_time,mod_time,news_pic) 
  values('${title}','${description}','${content}','${create_time}','${mod_time}','${news_pic}')`
  let result = await query(sql);
  console.log(result);
  
  res.send({
    success: true
  });
});

//获取预约列表
router.get('/predict', async function (req, res) {
  let data = await query(`select * from predict`);
  res.send({
    data
  });
});

//获取用户列表
router.get('/users', async function (req, res) {
  let data = await query(`select * from users`);
  res.send({
    data
  });
});



module.exports = router;
