```
var http = require('http')  //  创建服务器http模块
var path = require('path')  //处理url，因为在windows 和Linux上路径是不同的 
var fs = require('fs')     //读写文件
var url = require('url')   //自动解析url 相当于location
function staticRoot(staticPath, req, res){


  var pathObj = url.parse(req.url, true) //将url解析成对象
  if(pathObj.pathname === '/'){   
    pathObj.pathname += 'test.html'  //设置读取默认文件 test.html
  }
  var filePath = path.join(staticPath, pathObj.pathname)

  //通过fs.readFile 读取文件
  fs.readFile(filePath, function(err, fileContent){
    if(err){  //如果文件不存在设置404 ，
      res.writeHead(404, 'not found')
      //在页面显示404
      res.end('<h1>404 Not Found</h1>')
    }else{
      //读取成功，将文件内容发送出去
      res.writeHead(200, 'OK')
      res.write(fileContent)
      res.end()      
    }
  })
}

var server = http.createServer(function(req, res){ //创建sever
//__dirname 内置函数，获取当前绝对路径
  staticRoot(path.join(__dirname, 'sample'), req, res)
})
server.listen(8080) //设置8080端口
```

