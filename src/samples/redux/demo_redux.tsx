import React from 'react';
import {
    SafeAreaView,
} from 'react-native';
import {Provider} from "react-redux";
import Store from "./store";
import {PersistGate} from "redux-persist/integration/react";
import AppContainer from "./navigation/navigations";


const DemoRedux = () => {
    return (
        <>
            <SafeAreaView style={{flex: 1}}>
                <Provider store={Store().store}>
                    <PersistGate loading={null} persistor={Store().persist}>
                        <AppContainer/>
                    </PersistGate>
                </Provider>
            </SafeAreaView>
        </>
    );
};

export default DemoRedux;
