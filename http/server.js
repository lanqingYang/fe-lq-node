/* 
    目标：http 模块创建 Web 服务程序
    1. 引入 http 模块
    2. 创建服务器
    3. 监听端口号，启动服务器
    4. 访问 http://localhost:3000/，显示“Hello, World!”
*/

// 1. 引入 http 模块
const http = require("http");
const fs = require("fs");
const path = require("path");

// 2. 创建服务器
const server = http.createServer((req, res) => {
  /*   res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
  res.end("Hello, World!"); */
});

// 3. 监听端口号，启动服务器
server.listen(3000, () => {
  console.log("服务器已启动，监听端口 3000");
});

// 4. 访问 http://localhost:3000/，显示“Hello, World!”
server.on("request", (req, res) => {
  console.log("req.url", req.url);
  if (req.url === "/index.html") {
    // 5. 读取 compressedHtml/dist/index.html 文件内容，并将其作为响应发送给客户端
    const htmlFilePath = path.join(
      __dirname,
      "../compressedHtml/dist/index.html",
    );
    fs.readFile(htmlFilePath, (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.end(data.toString());
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end("Hello, World!  访问 /index.html 显示压缩后的 HTML 文件内容");
  }
});
