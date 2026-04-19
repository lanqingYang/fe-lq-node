const fs = require("fs");
// 1.写入文件
fs.writeFileSync("./fsObj.txt", "hello world", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("success 写入成功");
  }
});

// 2.读取文件, 第二参数可以加上‘utf-8’输出字符串，或者通过toString()方法转换成字符串
fs.readFile("./fsObj.txt", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("success 读取成功 Buffer数据流", data);
    console.log("success 读取成功 转换成字符串", data.toString());
  }
});
