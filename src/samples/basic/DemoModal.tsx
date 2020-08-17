import React, {ReactChildren, ReactElement} from 'react';
import {Alert, Modal, StyleSheet, Text, TouchableHighlight, View, ViewProps} from 'react-native';
import {BaseComponent} from '../../aura/base/BaseComponent';

const TAG = 'DemoFlexbox';
/**
 * API参考：https://reactnative.cn/docs/modal
 */
export default class DemoModal extends BaseComponent<ViewProps, {}> {
    state = {
        modalVisible: false,
    };

    constructor(props: ViewProps) {
        super(props);
    }

    setModalVisible = (visible: boolean) => {
        this.setState({modalVisible: visible});
    };

    public render(): ReactChildren | ReactElement {
        const {modalVisible} = this.state;

        /**
         * supportedOrientations用于指定在设备切换横竖屏方向时，modal 会在哪些屏幕朝向下跟随旋转。
         * 在 iOS 上，除了本属性外，还会受到应用的 Info.plist 文件中UISupportedInterfaceOrientations的限制。
         * 如果还设置了presentationStyle属性为pageSheet或formSheet，则在 iOS 上本属性将被忽略。
         *
         * onRequestClose:
         *  onRequestClose回调会在用户按下 Android 设备上的后退按键或是 Apple TV 上的菜单键时触发。
         *  请务必注意本属性在 Android 平台上为必填，且会在 modal 处于开启状态时阻止BackHandler事件。
         * onShow：
         *      onShow回调函数会在 modal 显示时调用。
         * transparent:
         *      transparent 属性是指背景是否透明，默认为白色，将这个属性设为：true 的时候弹出一个透明背景层的 modal。
         * animationType：
         *      animationType指定了 modal 的动画类型。
         *       slide 从底部滑入滑出。
         *       fade 淡入淡出。
         *       none 没有动画，直接蹦出来。
         * hardwareAccelerated：
         *      hardwareAccelerated属性决定是否强制启用硬件加速来绘制弹出层。
         * onDismiss:
         *      onDismiss回调会在 modal 被关闭时调用。
         *
         **/
        return (
            <View style={styles.centeredView}>
                {/*visible属性决定 modal 是否显示。*/}
                {/*supportedOrientations*/}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>

                            <TouchableHighlight
                                style={{...styles.openButton, backgroundColor: '#2196F3'}}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                }}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text style={styles.textStyle}>显示Modal</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
