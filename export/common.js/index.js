/* 
    在node.js中，使用的时Common.js 导入语法为 require()，而不是ES6的import语法。
    1. require() 是 Common.js 模块系统的导入语法，用于在 Node.js 中引入模块。
    2. import 是 ES6 模块系统的导入语法，主要用于在浏览器环境中引入模块。
    3. 在 Node.js 中，默认使用 Common.js 模块系统，因此需要使用 require() 来引入模块。
    4. 如果想在 Node.js 中使用 ES6 的 import 语法，需要进行一些配置，例如使用 Babel 转译或者在 package.json 中设置 "type": "module"。
    5. 导出模块时，Common.js 使用 module.exports，而 ES6 模块使用 export default 或 export 进行导出。
*/

// 1.引入 utils.js 模块
const utils = require("./utils");
console.log(utils);
