import NaviBottomTabContainer from './NaviBottomTabContainer';
import SwipeRecommendShopPage from '../pages/shop_recomend/SwipeRecommendShopPage';
import HomePage from '../pages/HomePage';
import ImageRes from '../resources/images/ImageRes';
import RecommendPage from '../pages/RecommendPage';
import DiscoveryPage from '../pages/DiscoveryPage';
import MyProfilePage from '../pages/MyProfilePage';
import SplashPage from '../pages/SplashPage';
import NaviMaterialTopTabContainer from './NaviMaterialTopTabContainer';

/**
 * 栈导航路由的配置表
 * 这个路由配置的对象名称和PageName需要必须保持一致
 */
export const stackRouter = {
    // 这个是我们默认栈路由的首页启动页面
    SplashPage: {
        name: 'SplashPage',
        screen: SplashPage,
    },
    MainPage: {
        name: 'MainPage',
        screen: NaviBottomTabContainer,
    },

    SwipeRecommendShopPage: {
        name: 'SwipeRecommendShopPage',
        screen: SwipeRecommendShopPage,
    },
};
/**
 * 底部标签页面的路由映射表
 * 这个路由配置的对象名称和PageName需要必须保持一致
 */
export const bottomTabRouter = {
    home: {
        pageName: 'home',
        screen: HomePage,
        tintColor: 'purple',
        activeIcon: ImageRes.main.homeSelected,
        inActiveIcon: ImageRes.main.home,
        options: {tabBarLabel: '首页', headerShown: false, tintColor: 'purple'},
    },
    // 推荐页面，我们签入顶部标签页面，
    // 所以这个地方的Screen需要设置为NaviMaterialTopTabContainer
    recommend: {
        pageName: 'recommend',
        // note 我们来换一种实现，我们不使用下面的function样式
        // 我们来使用一个单独的页面来进行布局
        screen: NaviMaterialTopTabContainer,
        // screen: RecommendPageContainer,
        tintColor: 'purple',
        activeIcon: ImageRes.main.recommendSelected,
        inActiveIcon: ImageRes.main.recommend,
        options: {tabBarLabel: '推荐', headerShown: false, tintColor: 'purple'},
    },
    discovery: {
        pageName: 'discovery',
        screen: DiscoveryPage,
        tintColor: 'purple',
        activeIcon: ImageRes.main.discoverySelected,
        inActiveIcon: ImageRes.main.discovery,
        options: {tabBarLabel: '发现', headerShown: false, tintColor: 'purple'},
    },
    myProfile: {
        pageName: 'myProfile',
        screen: MyProfilePage,
        tintColor: 'purple',
        activeIcon: ImageRes.main.myProfileSelected,
        inActiveIcon: ImageRes.main.myProfile,
        options: {tabBarLabel: '我的', headerShown: false, tintColor: 'purple'},
    },
};

/**
 * 顶部标签栏的的页面Page
 */
export const topTabRouter = {
    home: {
        name: 'home',
        screen: HomePage,
        options: {tabBarLabel: '首页'},
    },
    recommend: {
        name: 'recommend',
        screen: RecommendPage,
        options: {tabBarLabel: '最热'},
    },
    page3: {
        name: 'page3',
        screen: RecommendPage,
        options: {tabBarLabel: '页面3'},
    },
};
