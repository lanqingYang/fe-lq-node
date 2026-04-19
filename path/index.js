/* 
    在Node.js中，相对路径是根据  ！终端所在的目录 来解析的，而不是根据当前文件所在的目录来解析的。 所以在Node.js中，最好使用 绝对路径！！
    __dirname 内置变量，（当前文件所在的目录的绝对路径）。
*/

console.log("__dirname:", __dirname);

// 不同系统的路径分隔符不同，Windows是\，Linux和macOS是/，path模块提供了一个平台无关的路径操作方法，可以正确处理不同系统的路径分隔符。
const path = require("path");
// 1.拼接路径
const filePath = path.join(__dirname, "index.js");
console.log("filePath:", filePath);

// 练习，读取fs文件下的fsObj.js文件
const fsObjTextPath = path.join(__dirname, "../fs", "fsObj.txt");
console.log("fsObjTextPath:", fsObjTextPath);
const fs = require("fs");
fs.readFile(fsObjTextPath, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("success 读取成功 Buffer数据流", data);
  }
});
