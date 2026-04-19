/* 
    目标：简单体验压缩html文件
    1. 读取html文件
    2. 正则替换掉html文件中的换行符和多余的空格
    3. 将压缩后的内容写入到新的html文件中
*/

const fs = require("fs");
const path = require("path");
// 1.读取html文件
const htmlFilePath = path.join(__dirname, "index.html");
fs.readFile(htmlFilePath, (err, data) => {
  if (err) {
    console.error("读取html文件时出错:", err);
  } else {
    // ==============================================
    // 【安全压缩】不会破坏 JS / CSS 的正则
    // ==============================================
    let htmlContent = data.toString();

    // 提取并保护 <script> 和 <style> 标签内容
    const scriptMatches = [];
    const styleMatches = [];

    // 临时替换 <script> 内容
    htmlContent = htmlContent.replace(
      /<script[^>]*>([\s\S]*?)<\/script>/gi,
      (match, content) => {
        scriptMatches.push(content);
        return `<script>${"__SCRIPT_PLACEHOLDER_" + (scriptMatches.length - 1)}__</script>`;
      },
    );

    // 临时替换 <style> 内容
    htmlContent = htmlContent.replace(
      /<style[^>]*>([\s\S]*?)<\/style>/gi,
      (match, content) => {
        styleMatches.push(content);
        return `<style>${"__STYLE_PLACEHOLDER_" + (styleMatches.length - 1)}__</style>`;
      },
    );

    // 压缩 HTML 部分
    htmlContent = htmlContent
      .replace(/\r?\n|\r/g, "") // 删掉换行
      .replace(/\s+/g, " ") // 多个空格变一个
      .replace(/>\s+</g, "><") // 标签之间空格删掉
      .replace(/<!--[\s\S]*?-->/g, "") // 删掉注释（可选）
      .trim(); // 首尾去空格

    // 恢复 <script> 和 <style> 内容
    scriptMatches.forEach((content, index) => {
      htmlContent = htmlContent.replace(
        `<script>__SCRIPT_PLACEHOLDER_${index}__</script>`,
        `<script>${content}</script>`,
      );
    });

    styleMatches.forEach((content, index) => {
      htmlContent = htmlContent.replace(
        `<style>__STYLE_PLACEHOLDER_${index}__</style>`,
        `<style>${content}</style>`,
      );
    });

    // 3. 将压缩后的内容写入到新的html文件中
    const compressedHtmlFilePath = path.join(__dirname, "dist/index.html");
    fs.writeFile(compressedHtmlFilePath, htmlContent, "utf-8", (err) => {
      if (err) {
        console.error("写入压缩后的html文件时出错:", err);
      } else {
        console.log("压缩后的html文件已成功写入");
      }
    });
  }
});
