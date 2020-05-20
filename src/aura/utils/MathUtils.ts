export default class MathUtils {
  /**
   * 获取对应数据范围之间的随机数getRandom()函数
   * 原理是 随机数和最大值减最小值的差相乘 最后再加上最小值。
   * @param min
   * @param max
   */
  public static getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
