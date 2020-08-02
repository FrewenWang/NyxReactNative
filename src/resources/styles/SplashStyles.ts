import {StyleSheet} from 'react-native';
import ColorRes from '../colors/ColorRes';

export const SplashStyles = StyleSheet.create({
    container: {
        //组件样式中使用flex可以使其在可利用的空间中动态地扩张或收缩。
        // 一般而言我们会使用flex:1来指定某个组件扩张以撑满所有剩余的空间
        // 如果有多个并列的子组件使用了flex:1，则这些子组件会平分父容器中剩余的空间。
        // 如果这些并列的子组件的flex值不一样，则谁的值更大，谁占据剩余空间的比例就更大（即占据剩余空间的比等于并列组件间flex值的比）。
        flex: 1, //弹性布局为占满空间
        backgroundColor: ColorRes.common.containerBg,
        // 在组件的 style 中指定justifyContent可以决定其子元素沿着主轴的排列方式。
        // 子元素是应该靠近主轴的起始端还是末尾段分布呢？亦或应该均匀分布？
        // 对应的这些可选项有：flex-start、center、flex-end、space-around、space-between以及space-evenly。
        justifyContent: 'center', //主轴居中
        // 在组件的 style 中指定alignItems可以决定其子元素沿着次轴
        // （与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）的排列方式。
        // 子元素是应该靠近次轴的起始端还是末尾段分布呢？亦或应该均匀分布？
        // 对应的这些可选项有：flex-start、center、flex-end以及stretch。
        alignItems: 'center', // 次轴居中
    },
});
