import React, {ReactChildren} from 'react';
import {Text, View} from 'react-native';
import Logger from '../../../aura/utils/Logger';
import ColorRes from '../../../resources/colors/ColorRes';

interface ItemDemoFlatListProps {
    data: any;
}

interface ItemDemoFlatListState {
}

const TAG = 'ItemDemoFlatList';
export default class ItemDemoFlatList extends React.Component<ItemDemoFlatListProps, ItemDemoFlatListState> {
    private data: any;

    constructor(props: ItemDemoFlatListProps) {
        super(props);
        this.data = this.props.data;
    }

    public componentDidMount(): void {
        Logger.info(TAG, 'componentDidMount', this.data);
    }

    public componentWillUnmount(): void {
        Logger.info(TAG, 'componentWillUnmount', this.data);
    }

    public render(): React.ReactNode {
        Logger.info(TAG, 'render', this.data);
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 100,
                    backgroundColor: ColorRes.common.primary,
                }}>
                <Text>这是第{this.data}个Item</Text>
            </View>
        );
    }
}
