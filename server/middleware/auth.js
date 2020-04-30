module.exports = options => {
  return async (req, res, next) => {
    const jwt = require('jsonwebtoken');
    const query = require('../module/db');
    //前端传来的token过滤 Bearer
    const token = String(req.headers.authorization || '').split(' ')[1];
    // assert(token, 401, '请登录1');
    if (!token) {
      res.status(401).send({
        message: '请先登录1'
      });
      return
    }

    //验证token是否正确
    let tokenData = '';
    try {
      tokenData = jwt.verify(token, 'this is secret key');
    } catch (err) {
      res.status(401).send({
        message: '请先登录2'
      });
      return 
    }
    // if (!tokenData.id) {
    //   res.status(401).send({
    //     message: '请先登录2'
    //   });
    //   return
    // }

    //如果没找到用户ID
    req.findUser = await query(`select * from users where id=${tokenData.id}`);
    if (req.findUser.length === 0) {
      res.status(401).send({
        message: '请先登录3'
      });
    }
    await next();
  }

}