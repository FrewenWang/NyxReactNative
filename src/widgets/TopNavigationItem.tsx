import React, {PureComponent} from 'react';
import {Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

type TopNavigationItemProps = {
    icon?: any;
    iconStyle?: any;
    titleStyle?: any;
    title?: string;
    onPress?: Function;
};

class TopNavigationItem extends PureComponent<TopNavigationItemProps> {
    render() {
        let icon = this.props.icon && <Image style={[styles.icon, this.props.iconStyle]} source={this.props.icon}/>;

        let title = this.props.title && <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>;
        return (
            // @ts-ignore
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                {icon}
                {title}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 27,
        height: 27,
        margin: 8,
    },
    title: {
        fontSize: 15,
        color: '#333333',
        margin: 8,
    },
});

export default TopNavigationItem;
