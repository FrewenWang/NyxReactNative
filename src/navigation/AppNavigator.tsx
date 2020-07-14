import {useEffect} from "react";
import {BackHandler} from "react-native";
import navigationHelper from "../utils/NavigationHelper";
import {NavigationContainer} from "@react-navigation/native";

const AppNavigator = () => {
    useEffect(() => {
        // 安卓物理返回键处理
        BackHandler.addEventListener('hardwareBackPress', navigationHelper.backAction);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', navigationHelper.backAction);
        };
    }, []);

    return (
        <NavigationContainer></NavigationContainer>
    );
};

export default AppNavigator;
