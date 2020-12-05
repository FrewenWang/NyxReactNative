import React from 'react';
import {Button, Text, View, ViewProps} from 'react-native';
import {BasePureComponent} from '../aura/base/BasePureComponent';
import NaviPageProps from '../navigation/NaviPageProps';

const TAG = 'MyProfilePage';
export default class MyProfilePage extends BasePureComponent<NaviPageProps, any> {
    constructor(props: NaviPageProps) {
        super(props);
    }

    public componentDidMount() {
        super.componentDidMount();
    }

    public render(): React.ReactNode {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>我的!</Text>
                <Button
                    title={'切换蓝色主题'}
                    onPress={() =>
                        this.props.navigation.setParams({
                            theme: {
                                tintColor: 'blue',
                                updateTime: new Date().getTime(),
                            },
                        })
                    }
                />

                <Button
                    title={'切换红色主题'}
                    onPress={() =>
                        this.props.navigation.setParams({
                            theme: {
                                tintColor: 'red',
                                updateTime: new Date().getTime(),
                            },
                        })
                    }
                />

                <Button
                    title={'切换黄色主题'}
                    onPress={() =>
                        this.props.navigation.setParams({
                            theme: {
                                tintColor: 'yellow',
                                updateTime: new Date().getTime(),
                            },
                        })
                    }
                />
            </View>
        );
    }
}
