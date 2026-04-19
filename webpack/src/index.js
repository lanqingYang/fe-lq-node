/**
 * 目标1： webpack 打包过程
 * ！webpack 默认只识别js代码。
 * 插件：让webpack可以实现更多功能，比如 htmlWebpackPlugin 自动打包html文件
 * 加载器：识别更多类型的代码 ：比如css-loader识别css代码
 */

// 1.1 打包代码
import { checkCode, checkPhone } from "./utils/check";
checkCode("111111")
checkPhone("111111")
console.log(checkCode("111111"));
console.log(checkPhone("111111"));
alert("进入了index.js");

// 1.2 webpack打包化境 npm i webpack webpack-cli --save-dev

// 1.3 运行自定义命令打包观察效果（npm run 自定义命令）
// package.json:  "build":"webpack"

// 1.4 dist/main.js 压缩了代码

/**
 * 目标2： 通过webpack.config.js 修改打包入口和出口
 * 观察打包内容
 */

/**
 * 目标3： 引入 html-webpack-plugin 打包时自动生成html文件
 * 自动将js引入到html中，无需手动在html中引入
 */

/**
 * 目标4: 打包css代码
 * 引入css
 * 下载 css-loader 和style-loader
 * 配置 webpack.config.js
 *
 */
import "./index.css";

/**
 * 目标5：优化，提取css代码到单独的文件 。 mini-css-extract-plugin
 * 好处： css文件可以被浏览器缓存，减少js体积。
 *       浏览器可以同时下载css和js，加快页面展示速度
 *
 * 注意 style-loader 和 mini-css-extract-plugin不能一起使用，因为style-loader 是打包到js中， mini-css-extract-plugin是提取到新文件
 */

/**
 * 目标6： 优化居于5，提取后的css代码没有被压缩。 使用 css-minimizer-webpack-plugin
 */

/**
 * 目标7： less代码打包 less-loader.
 * 引入less文件
 * less转css再转mini-css-extract-plugin或style-loader
 */
import "./index.less";

/**
 * 目标9： 打包资源模块（图片）。
 * 无需下载其他插件，资源模块 字体、图片等都是内置的
 * assets模式下  小于8kb会转为base64(打包后放到js里面) 大于8KB 会变成文件（assets文件夹下）,打包后src是 http://
 */
import sleepImage from "./assets/sleep.jpg";
import iconSvg from "./assets/icon.svg";
const sleepImg = document.createElement("img");
const iconImg = document.createElement("img");
sleepImg.src = sleepImage;
iconImg.src = iconSvg;
document.querySelector(".content").appendChild(sleepImg);
document.querySelector(".content").appendChild(iconImg);

/**
 * 目标10： 配置开发环境 webpack-dev-server 热更新
 *  下载 webpack-dev-server
 *  配置文件设置为开发模式，package.json配置命令 dev: webpack server --open(启动自动打开浏览器)
 *
 */
// 注意1.借助http模块创建8080 莫问 web服务
// 注意2：默认以 public 文件作为服务器根目录（这里我没有用public文件夹，所以访问不到资源，自己拼接一下地址 http://localhost:8080/auto-build-html-file.html）
// 注意3： webpack-dev-server 根据配置，打包相关代码在内存中，以 output.path 的值作为服务器根目录（所以可以直接拼接访问dis目录 http://localhost:8080/auto-build-html-file.html） 或者可以通过 devServer 配置指定的打开路径
console.log("观察变动是否自动打包更新");

/**
 * 目标11： 打包模式设置
 * development : 开发模式 调试代码，实施加载，热更新（快）
 * production：线上模式 压缩代码，资源优化，更轻量（小）
 *
 * 设置方式：
 * webpack.config.js： mode:production/ development
 * package.json: --mode = production （优先级更高）
 */
// 切换--mode值 运行 npm run build 查看打包结果

/**
 * 目标12： 注入环境变量，开发模式下打印内容，非开发模式下不打印。
 * 问题：cross-env 设置只在node环境生效，前端代码无法访问 process.env.NODE_ENV，但是webpack5已经可以自动将 process.env.NODE_ENV 在前端代码中转换为字符串，也就是设置的mode:production/development字符串
 * 无需使用内置 DefinePlugin 插件了
 */
if (process.env.NODE_ENV === "production") {
  console.log("当前是正式环境", process.env);
}

/**
 * 目标13： source-map开发环境使用 调试代码 追踪error warning原始位置
 * 在开发模式下，设置inline-source-map 可以将源码位置信息打包到js文件，错误定位到代码行
 * source-map inline-source-map eval-cheap-module-source-map 的区别，见README.md 文件2模块
 *
 */
console.warn("测试错误信息代码定位");

/**
 * 目标14： 别名解析 alias
 * 在配置文件中，配置解析别名 @ 来代表 src 绝对路径
 */
import { checkUsername } from "@/utils/check";
console.log("别名@ 引入函数", checkUsername("111111"));


/**
 * 目标15： 外部依赖（cdn）在生产模式下引入cnd
 * 在html中引入第三方库 CND 地址，用模板语法判断
 * 在webpack.config.js中配置 externals 属性，将第三方库排除在打包之外
 * dev和pro 模式下打包观察
 */
import axios from "axios";
axios.get("https://api.github.com").then(res => {
  console.log(res);
});

/**
 * 目标16：多页面打包
 * 配置多个入口文件 当前多了page文件夹
 * 配置webpack文件夹 更改enter，output对象形式多属性，增加new htmlWebpackPlugin文件（每个对象里面一定要+chunk，确定html要引入哪个js文件）， new MiniCssExtractPlugin 也修改配置
 */

/**
 * 目标17：优化-分割提取公共代码
 * 配置webpack中 splitChunks分割功能
 */