console.log('indexCopy.js')
import './index.css'



// 与外层inde.js 相同的js内容，测试优化-代码分割 
// ps: axios 由于设置了pro环境设置成了外部依赖 cdn。所以axios不会打进bundle，所以pro环境下不会被分割出来
import axios from "axios";
axios.get("https://api.github.com").then(res => {
  console.log(res);
});

// 与 index.js 同样引用本地模块，生产构建时才会被打进 bundle 并被 splitChunks 抽到 commons
import sleepImage from "@/assets/sleep.jpg";
import iconSvg from "@/assets/icon.svg";
const sleepImg = document.createElement("img");
const iconImg = document.createElement("img");
sleepImg.src = sleepImage;
iconImg.src = iconSvg;
document.querySelector(".content").appendChild(sleepImg);
document.querySelector(".content").appendChild(iconImg);