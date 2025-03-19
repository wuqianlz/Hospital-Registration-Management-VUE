const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false
})
module.exports = {
  publicPath:'/',
  devServer: {                //设置本地默认端口  选填
    proxy: {                 //设置代理，必须填
      '/api': {
          target: 'http://localhost:8066', // 配置访问的服务器地址
          pathRewrite: { '^/api': '' },  // 用于将请求中的/api字符串替换为空, 然后访问地址就能正确访问，若不添加此行配置，那么访问地址就变成了： http://localhost:8080/api/request_url，这样的请求就会出现 404 操作
          ws: true, // 是否支持 websocket, 默认是 true
          changeOrigin: true // 用于控制请求头中的 host 值, 默认是 true
      }
    }
  }
}