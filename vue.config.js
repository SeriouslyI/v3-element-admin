module.exports = {
  publicPath: "./",
  // chainWebpack: config => {
  //   config.module
  //       .rule(/\.(png|gif|jpg|svg|jpeg|ico|cur)$/i)
  //       .use('file-loader')
  //       .loader('file-loader')
  //       .options({
  //           // name: 'assets/[hash].[ext]',
  //       })
  //       .end()
        
  // },
  configureWebpack: {
    devServer: {
      before(app) {
        let userpoor = [{
            username: 'admin',
            password: '123456'
          },
          {
            username: 'liang',
            password: '123456'
          },
          {
            username: '123456789@qq.com',
            password: '123456'
          }
        ]
        
        app.get('/api/register', (req, res) => {
          const {
            username,
            password
          } = req.query
          const userlength = userpoor.filter(v => v.username == username).length
          if (userlength > 0) {
            res.json({
              success: false,
              message: '用户名已存在'
            })
          } else {
            res.json({
              code: 1,
              message: '开发中'
            })
          }
        })

        let tokenKey = 'lcy'
        app.get('/api/login', (req, res) => {
          console.log(req.body)
          const {
            username,
            password
          } = req.query
          // return req;
          if (username == 'admin' && password == '123456') {
            res.json({
              code: 0,
              message: '登录成功',
              token: tokenKey + '-' + username + '-' + (new Date().getTime() + 60 * 60 * 1000)
            })
          } else {
            res.json({
              code: 1,
              message: '账号或密码错误'
            })
          }
        })
      }
    }
  }
}