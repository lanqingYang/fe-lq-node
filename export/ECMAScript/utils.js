const a = "11";
const getA = () => {
  return a;
};

// 命名导出
export const b = "22";

// 默认导出
export default {
  a,
  getA,
};
