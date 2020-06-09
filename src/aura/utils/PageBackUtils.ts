// @ts-ignore
import {Actions} from 'react-native-router-flux';
import {BackHandler} from 'react-native';
export default function PageBackUtils() {
    let hasTip = false;
    let ts: number;
    return function () {
        if (Actions.state.routes[0].index > 0) {
            Actions.pop();
            return true;
        }
        ts = Date.now();
        if (!hasTip) {
            let handler = function () {
                let now = Date.now();
                if (now - ts < 1000) {
                    requestAnimationFrame(handler);
                } else {
                    hasTip = false;
                }
            };
            handler();
            hasTip = true;
            return true;
        } else {
            BackHandler.exitApp();
            //SplashScreen.exit();
            return true;
        }
    };
}
