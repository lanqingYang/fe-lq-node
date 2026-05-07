/**
 * ajax 原理 XMLHttpRequest
 */
// 1. 创建 XMLHttpRequest 对象
const xhr = new XMLHttpRequest();

// 2. 配置请求参数
xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1");
// 2.1 get参数请求
// xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1?userId=1");

// 3. 页面加载完成时，处理响应结果
xhr.addEventListener("loadend", () => {
  console.log(xhr.response);
});
// 4. 发送请求
xhr.send();
// 4.1 post参数请求
// xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.send(JSON.stringify({ title: "foo" }));
