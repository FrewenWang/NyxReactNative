import {StyleSheet} from 'react-native';
import ColorRes from '../colors/ColorRes';
import ScreenDimensions from "../dimensions/ScreenDimensions";

export const CommonStyles = StyleSheet.create({
    container: {
        //组件样式中使用flex可以使其在可利用的空间中动态地扩张或收缩。
        // 一般而言我们会使用flex:1来指定某个组件扩张以撑满所有剩余的空间
        // 如果有多个并列的子组件使用了flex:1，则这些子组件会平分父容器中剩余的空间。
        // 如果这些并列的子组件的flex值不一样，则谁的值更大，谁占据剩余空间的比例就更大（即占据剩余空间的比等于并列组件间flex值的比）。
        flex: 1,
        backgroundColor: ColorRes.common.containerBg,
    },
    searchBar: {
        width: ScreenDimensions.width * 0.7,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    }
});
