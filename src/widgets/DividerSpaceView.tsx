import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';

/**
 * 页面上的布局分割线
 */
class DividerSpaceView extends PureComponent<{}> {
    public render() {
        return <View style={styles.container}></View>;
    }
}

const styles = StyleSheet.create({
    container: {
        height: 14,
        backgroundColor: '#f3f3f3',
    },
});

export default SpacingView;
