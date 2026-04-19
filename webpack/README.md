# 1.定义多css文件，自定义打包后css名称

```
// 自定义每一个名称，key与entry中属性名一致
const cssNames = {
  entryAndOutput: "css/main.css",
  copyEntryAndOutput: "css/copy-page.css",
};

// 函数形式定义每一个包名称
new MiniCssExtractPlugin({
  filename: (pathData) => {
    const chunkName = pathData.chunk && pathData.chunk.name;
    if (chunkName && cssNames[chunkName]) {
      return cssNames[chunkName];
    }
    return `css/${chunkName || "[id]"}.css`;
  },
  chunkFilename: "css/async/[id].css", // 异步 chunk 的样式，可再单独用函数细化
})

```

# 2.代码追踪调试各属性区别

 * 对比：
 * 选项	                               定位精度	       生成速度	  文件体积    适用场景
 *source-map（打包单独.map文件）         行+列（最全）	 慢	       小	      生产/开发
 *inline-source-map（打包到js中）	     行+列（最全）   慢	       大	      开发
 *eval-cheap-module-source-map（js中）   行（较快）	    很快	  小	      开发