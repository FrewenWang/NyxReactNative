import {BaseComponent} from '../../aura/base/BaseComponent';
import {AppState, PanResponder, PanResponderInstance, StyleSheet, View, ViewProps} from 'react-native';
import React from 'react';

interface DemoPanResponderState {
    top: number;
    left: number;
    bg: any;
}

/**
 * 对于简单的 touch 事件，React Native有4个专门的 touch 组件进行处理
 *  TouchableHighlight
 *  TouchableNativeFeedback
 *  TouchableOpacity
 *  TouchableWithoutFeedback
 *
 *  他们可以绑定4种不同的响应方法:
 *  onPress
 *  onPressIn
 *  onPressOut
 *  onLonePress
 *  而对于手指滑动操作，利用上面的方法无法实现，这时就用到 gesture responder system
 *
 *  在React Native中，响应手势的基本单位是responder，具体来说，就是最常见的View组件。
 *  任何的View组件，都是潜在的responder，如果某个View组件没有响应手势操作，那是因为它还没有被“开发”。
 *
 * 将一个普通的View组件开发成为一个能响应手势操作的responder，非常简单，
 * 只需要按照React Native的gesture responder system的规范，
 * 在props上设置几个方法即可。具体如下：
 *  View.props.onStartShouldSetResponder
 *  View.props.onMoveShouldSetResponder
 *  View.props.onResponderGrant
 *  View.props.onResponderReject
 *  View.props.onResponderMove
 *  View.props.onResponderRelease
 *  View.props.onResponderTerminationRequest
 *  View.props.onResponderTerminate
 *
 *  这个是系统级别的手势相应，处理起来相对复杂，最常见的是使用 PanResponder
 *
 */
export default class DemoPanResponder extends BaseComponent<ViewProps, DemoPanResponderState> {
    private _panResponder?: PanResponderInstance;
    private _top: any;
    private _left: any;

    constructor(props: ViewProps) {
        super(props);

        this.state = {
            left: 0,
            top: 0,
            bg: 'white',
        };

        this._initPanResponder();
    }

    /**
     *
     * @private
     */
    private _initPanResponder() {
        /**
         * 在5个方法中，我们能够使用的参数有2个，分别是event和gestureState
         *
         *  event:
         *      获取触摸的位置在被响应的View中的相对坐标，
         *      evt.nativeEvent.locationX和evt.nativeEvent.locationY（这个方法很实用）
         * gestureState:
         *      dx/dy：手势进行到现在的横向/纵向相对位移
         *      vx/vy：此刻的横向/纵向速度
         *      numberActiveTouches：responder上的触摸的个数
         */
        this._panResponder = PanResponder.create({
            //onStartShouldSetPanResponder:负责处理用户通过触摸来激活一个Responder，
            // 如果返回值为 true，则表示这个 View 能够响应触摸手势被激活
            onStartShouldSetPanResponder: () => true,
            //onMoveShouldSetPanResponder: 负责处理用户通过移动来激活一个Responder，
            // 如果返回值为 true，则表示这个 View 能够响应滑动手势被激活
            onMoveShouldSetPanResponder: () => true,
            //onPanResponderGrant:如果组件被Responder激活，则调用该方法
            onPanResponderGrant: () => {
                // 当触摸事件被激活的时候，记录当前的View的左上角的坐标
                this._top = this.state.top;
                this._left = this.state.left;
                this.setState({bg: 'red'});
            },
            //onPanResponderMove:用户滑动手指时，调用该方法
            onPanResponderMove: (evt, gestureState) => {
                console.log(gestureState.dx + ' ' + gestureState.dy);
                this.setState({
                    top: this._top + gestureState.dy,
                    left: this._left + gestureState.dx,
                });
            },
            // onPanResponderRelease:用户手指离开屏幕时，调用该方法
            onPanResponderRelease: (evt, gs) => {
                this.setState({
                    bg: 'white',
                    top: this._top + gs.dy,
                    left: this._left + gs.dx,
                });
            },
        });
    }

    public render(): React.ReactElement {
        return (
            <View
                {...this._panResponder?.panHandlers}
                style={[
                    styles.reactView,
                    {
                        backgroundColor: this.state.bg,
                        top: this.state.top,
                        left: this.state.left,
                    },
                ]}></View>
        );
    }
}

const styles = StyleSheet.create({
    reactView: {
        width: 10,
        height: 10,
    },
});
