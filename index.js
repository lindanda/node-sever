var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')
function staticRoot(staticPath, req, res){
  var pathObj = url.parse(req.url, true)
  if(pathObj.pathname === '/'){
    pathObj.pathname += 'test.html'
  }
  var filePath = path.join(staticPath, pathObj.pathname)
  fs.readFile(filePath, function(err, fileContent){
    if(err){
      res.writeHead(404, 'not found')
      res.end('<h1>404 Not Found</h1>')
    }else{
      res.writeHead(200, 'OK')
      res.write(fileContent)
      res.end()      
    }
  })
}
var server = http.createServer(function(req, res){
  staticRoot(path.join(__dirname, 'sample'), req, res)
})
server.listen(8080)



