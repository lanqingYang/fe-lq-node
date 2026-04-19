// 打包自动生成html文件
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 单独提取css到新文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 优化css体积
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

const path = require("path");

let config = (env, argv) => {
  console.log("webpack 的config 中的env:", env);
  console.log("webpack 的config 中的argv:", argv);
  const config ={
    devtool: argv.mode === "development" ? "source-map" : false,
    // 打包模式 （dev 开发模式-使用相关内置优化）
    // mode: "development", // 可以直接去package.json中指定，package.json的优先级更高
    // 入口， 一个入口会对应一个chunk，包含该入口的所有模块内容；
    // 所以如果想要把 less、css文件内容分别放到两个文件下，就得引入多个入口文件才行，否则都放到index.js下引入，就会一直是一个chunk css和less代码解析后会融合到一起
    entry:{
      'entryAndOutput':path.resolve(__dirname, "src/index.js"),
      'copyEntryAndOutput':path.resolve(__dirname, "src/page/indexCopy.js"),
    } ,
    // 出口
    output: {
      path: path.resolve(__dirname, "dist"),
      // filename也可以定义为 ./[name].js，会自动根据入口文件名生成，[name] 是入口文件名
      // filename: "./entryAndOutput.js",
      filename: "./[name].js",
      clean: true, // 生成打包后内容之前，清空输入目录
    },
    // plugins 插件（给 webpack 提供更多功能）
    plugins: [
      // 生成html文件。 并且会自动将js引入到html中，无需手动在html中引入。
      // 如果有多个页面，就生成多个new HtmlWebpackPlugin html文件，使用数组配置
      new HtmlWebpackPlugin({
        // 选择html文件路径(模板文件)
        template: path.resolve(__dirname, "./src/index.html"),
        // 输出文件（重命名html文件名称）
        filename: path.resolve(__dirname, "./dist/auto-build-html-file.html"),
        // 配置开发模式下引入cdn，“useCdn”是自定义属性名，非官方定义，
        useCdn: argv.mode === "production",
        //chunks 解决的是「这个 HTML 要引用哪几条入口entry的 bundle」
        //打包后的html会引入chunks指定的chunk，即 <script src="entryAndOutput.js"></script>,若名称写错，那么js也会打包，但是不会引入到html中。
        chunks: ['entryAndOutput'], // 指定引入的chunk，默认会引入所有chunk
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/page/indexCopy.html"),
        filename: path.resolve(__dirname, "./dist/copy-auto-build-html-file.html"),
        useCdn: argv.mode === "production",
        chunks: ['copyEntryAndOutput'], // 指定引入的chunk，默认会引入所有chunk
      }),
      
      // 多入口时不要用固定名，否则多个页面的 CSS 会写到同一个文件里互相覆盖。
      // [name] 对应 entry 的 key，例如 entryAndOutput → css/entryAndOutput.css
      // chunkFilename：该入口里若有异步拆出来的 chunk，其 CSS 用此模板（可按需省略）
      // 自定义命名每一个css文件名称，可见REAME.md 文件下 第一个板块
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        // 异步拆出来的 chunk 的样式（若有）；用 [id] 避免与入口 [name] 冲突
        chunkFilename: "css/[id].css",
      }),
    ],
    // loader 加载器 （让 webpack 识别更多模块文件内容）
    module: {
      rules: [
        {
          test: /\.css$/i, // .css 结尾的文件
          /*      // CSS 打包，并且打包到js中
          use: ["style-loader", "css-loader"], // 从后向前解析 */
          // css打包，打包到新文件中
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        // less-loader
        {
          test: /\.less$/i, // .less 结尾的文件
          // less打包，打包到新文件中
          use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
        },
        // 资源图片配置
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          // 自动在 asset/resource 和 asset/inline 选 以文件8kb为例
          // 小于8kb（asset/inline ）会转为base64(打包后放到js里面) 大于8KB（asset/resource） 会变成文件（assets文件夹
          type: "asset",
          generator: {
            // [hash]占位符 对模块内容做算法计算，得到的映射字符串；
            // [ext]扩展名称 .jpg等
            // [query] 查询参数(url下生效 xxx.html?index=1 index=1 就是query)
            filename: "assets/[hash][ext][query]",
          },
        },
      ],
    },
    // 优化
    optimization: {
      // 最小化
      minimizer: [
        // 在 webpack@5. 使用`...`语法扩展现有minimizer（即`terser-webpack-plugin` , 保证js代码能够压缩）
        `...`,
        new CssMinimizerWebpackPlugin(),
      ],
      /** 对所有 chunk 做代码分割；把至少被两个 chunk 共用的模块抽到 commons 组里，并按「相关入口名拼接」命名到 commonJs/ 目录 */
      splitChunks:{// 优化-提取/分割共功能代码 把被多个入口/异步块重复用到的模块拆成单独的 JS
        chunks:'all', // 分析同步入口里的模块，也分析异步 import() 产生的 chunk
        cacheGroups:{ // 分割组
          commons:{ // 抽取公共模块
            minSize:0, // 抽取的chunk最小字节
            minChunks:2, // 至少要有 2 个 chunk 都用到同一模块，才会放进这个「公共」分组里
            reuseExistingChunk: true,  // 若已经有一个拆好的 chunk 能复用，就复用
            name(module,chunks,cacheGroupKey){ // 出来的文件起名
              const allChunksName =chunks.map(item=> item.name).join('-') // 模块名1-模块名2
              return `./commonJs/${allChunksName}` // 输出到 dist 目录下位置
            }
          }
        }
      }
    },
    // 开发服务器配置
    devServer: {
      // 静态文件目录
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      // 启动后自动打开浏览器
      open: {
        target: "/auto-build-html-file.html", // 指定打开的文件路径
      },
      // 端口号
      port: 8080,
      // 启用热模块替换
      hot: true,
    },
    resolve: {
      // 解析别名
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };


  // 生产模式下，使用的配置
  if(argv.mode === "production"){
    config.externals ={
    // key: import from "axios" 的axios
    // value: 全局变量名
      "axios": "axios",
    }
  }


  
  return config;
};

/*
 // process只有在处理webpack时才会拿到数据，在node环境下就为undefined了，
 // 如果要使用，需要在package的命令里面加上 cross-env NODE_ENV=development webpack --mode=development,  此时确保在所有平台和node进程webpack里面都能拿到准确值
 if (process.env.NODE_ENV === "development") {
  console.log("source-map");
  config.devtool = "source-map";
} */


module.exports = config;
