import {compose, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
// syncStorage has been extracted from react-native core and will be removed in a future release.
// It can now be installed and imported from `@react-native-community/async-storage` instead of 'react-native'.
// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import reducer from './reducers/CreateReducer';

// 实例化中间件
const middleWares = [thunk];

// 静态对象
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

// TODO 这个地方需要好好学习 Redux的基础学习
export default function Store() {
    const enhancer = compose(applyMiddleware(...middleWares));
    const persistedReducer = persistReducer(persistConfig, reducer);
    // 创建Store
    const store = createStore(persistedReducer, enhancer);
    // 持久化Store
    // @ts-ignore
    const persist = persistStore(store);
    return {store, persist};
}
