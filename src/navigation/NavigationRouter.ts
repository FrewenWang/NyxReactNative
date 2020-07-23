import AuraBottomTabNavigator from './AuraBottomTabNavigator';
import SwipeRecommendShopPage from '../pages/shop_recomend/SwipeRecommendShopPage';

/**
 * 栈导航路由的配置表
 */
export const stackNavigationRouter = {
    MainPage: {
        pageName: 'MainPage',
        screen: AuraBottomTabNavigator,
    },

    SwipeRecommendShopPage: {
        pageName: 'SwipeRecommendShopPage',
        screen: SwipeRecommendShopPage,
    },
};
