import AuraBottomTabNavigator from './AuraBottomTabNavigator';
import SwipeRecommendShopPage from '../pages/shop_recomend/SwipeRecommendShopPage';
import HomePage from '../pages/HomePage';
import ImageRes from '../resources/images/ImageRes';
import RecommendPage from '../pages/RecommendPage';
import DiscoveryPage from '../pages/DiscoveryPage';
import MyProfilePage from '../pages/MyProfilePage';

/**
 * 栈导航路由的配置表
 * 这个路由配置的对象名称和PageName需要必须保持一致
 */
export const stackNavigationRouter = {
    splashPage: {
        pageName: 'splashPage',
        screen: AuraBottomTabNavigator,
    },
    MainPage: {
        pageName: 'MainPage',
        screen: AuraBottomTabNavigator,
    },

    SwipeRecommendShopPage: {
        pageName: 'SwipeRecommendShopPage',
        screen: SwipeRecommendShopPage,
    },
};
/**
 * 底部标签页面的路由映射表
 * 这个路由配置的对象名称和PageName需要必须保持一致
 */
export const bottomTabNavigationRouter = {
    home: {
        pageName: 'home',
        screen: HomePage,
        tintColor: 'purple',
        activeIcon: ImageRes.main.homeSelected,
        inActiveIcon: ImageRes.main.home,
        options: {tabBarLabel: '首页', headerShown: false},
    },
    recommend: {
        pageName: 'recommend',
        screen: RecommendPage,
        tintColor: 'purple',
        activeIcon: ImageRes.main.recommendSelected,
        inActiveIcon: ImageRes.main.recommend,
        options: {tabBarLabel: '推荐'},
    },
    discovery: {
        pageName: 'discovery',
        screen: DiscoveryPage,
        tintColor: 'purple',
        activeIcon: ImageRes.main.discoverySelected,
        inActiveIcon: ImageRes.main.discovery,
        options: {tabBarLabel: '发现'},
    },
    myProfile: {
        pageName: 'myProfile',
        screen: MyProfilePage,
        tintColor: 'purple',
        activeIcon: ImageRes.main.myProfileSelected,
        inActiveIcon: ImageRes.main.myProfile,
        options: {tabBarLabel: '我的'},
    },
};
