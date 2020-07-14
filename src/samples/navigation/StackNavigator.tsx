import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import DemoPage1 from './pages/DemoPage1';
import DemoPage2 from './pages/DemoPage2';
import DemoPage3 from './pages/DemoPage3';
import DemoPage4 from './pages/DemoPage4';
import {Button, StyleSheet} from 'react-native';
import navigationHelper from '../../utils/NavigationHelper';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();
/**
 * 这个页面AuraStackNavigator
 * 具体的demo。我们后来学习：
 * https://github.com/laowenlu/react-navigation-5.x-demo
 * @constructor
 */
export default function AuraStackNavigator() {
    /**
     * NavigationContainer是导航容器。将导航前转化成为页面的Component的元素
     * 我们AuraStackNavigator的可以存放在NavigationContainer组件中
     *
     * Stack.Navigator可以传递其他参数，这个我们后续继续学习：
     * initialRouteName：初始渲染的路由名称。
     * screenOptions：该导航器下所有屏幕的默认配置
     *
     */
    // @ts-ignore
    return (
        <Stack.Navigator
            initialRouteName="HomePage"
            screenOptions={{
                headerStyle: styles.header, // 顶部标题栏的Style
                headerTintColor: '#fff', // 返回按钮和标题都使用这个属性作为它们的颜色
                headerTitleStyle: styles.headerTitle, // 顶部标题栏的Style
                headerBackTitleVisible: false, // 顶部标题栏返回标题的显示状态
                headerTitleAlign: 'center',
                cardStyle: styles.card,
                gestureEnabled: true,
                headerLeft: _backButton,
                ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen
                name={'HomePage'}
                component={BottomTabNavigator}
                options={{headerLeft: null, headerShown: false}}
            />
            <Stack.Screen name="Page1" component={DemoPage1} />
            <Stack.Screen name="Page2" component={DemoPage2} />
            <Stack.Screen name="Page3" component={DemoPage3} options={{headerLeft: null, headerShown: false}} />
            <Stack.Screen name="Page4" component={DemoPage4} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3047df',
        height: 50,
        // paddingTop: Platform.OS === 'ios' ? 0 : StatusBarHeight,
        shadowOpacity: 0, // remove shadow on iOS
    },
    headerTitle: {
        color: '#fff',
        fontSize: px2dp(32),
        alignSelf: 'center',
        textAlign: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: '#f5f5f9',
    },
});

const _backButton = () => <Button title="返回" onPress={navigationHelper.backAction} />;
