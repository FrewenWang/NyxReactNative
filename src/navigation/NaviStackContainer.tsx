import React from 'react';
// createStackNavigator这个是react-navigation
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import DemoPage1 from '../samples/navigation/pages/DemoPage1';
import DemoPage3 from '../samples/navigation/pages/DemoPage3';
import DemoPage4 from '../samples/navigation/pages/DemoPage4';
import DemoPage2 from '../samples/navigation/pages/DemoPage2';
import {Button, Platform, StyleSheet} from 'react-native';
import navigationHelper from '../utils/NavigationHelper';
import {stackRouter} from './NavigationRouter';
import ColorRes from "../resources/colors/ColorRes";

const Stack = createStackNavigator();
/**
 * 这个页面AuraStackNavigator
 * 具体的demo。我们后来学习：
 * @constructor
 */
export default function NaviStackContainer() {
    /**
     * NavigationContainer是导航容器。将导航前转化成为页面的Component的元素
     * 我们AuraStackNavigator的可以存放在NavigationContainer组件中
     *
     * Stack.Navigator可以传递其他参数，这个我们后续继续学习：
     * initialRouteName：初始渲染的路由名称。
     * screenOptions：该导航器下所有屏幕的默认配置
     *
     */
    return (
        <Stack.Navigator
            initialRouteName={stackRouter.SplashPage.name}
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
            {/*栈管理路由器的起始页面我们希望打开的是Splash页面*/}
            <Stack.Screen
                name={stackRouter.SplashPage.name}
                component={stackRouter.SplashPage.screen}
                options={{headerLeft: undefined, headerShown: false}}
            />

            {/*栈管理路由器包含的是一个底部标签的路由容器*/}
            <Stack.Screen
                name={stackRouter.MainPage.name}
                component={stackRouter.MainPage.screen}
                options={{headerLeft: undefined, headerShown: true}}
            />

            {/*带有滑动效果的店铺列表配置页面*/}
            <Stack.Screen
                name={stackRouter.SwipeRecommendShopPage.name}
                component={stackRouter.SwipeRecommendShopPage.screen}
            />
            <Stack.Screen name="Page1" component={DemoPage1}/>
            <Stack.Screen name="Page2" component={DemoPage2}/>
            <Stack.Screen name="Page3" component={DemoPage3} options={{headerLeft: undefined, headerShown: false}}/>
            <Stack.Screen name="Page4" component={DemoPage4}/>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: ColorRes.common.primary,
        height: 100,
        paddingTop: Platform.OS === 'ios' ? 0 : 80,
        shadowOpacity: 0, // remove shadow on iOS
    },
    headerTitle: {
        color: '#fff',
        fontSize: 26,
        alignSelf: 'center',
        textAlign: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: '#f5f5f9',
    },
});

const _backButton = () => <Button title="返回" onPress={navigationHelper.backAction}/>;
