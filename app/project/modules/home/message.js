import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";
import * as Assert from '../../assets'

export class MessageScreen extends WrapScreen {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        header: {
            title: '消息',
            left: {
                icon: Assert.Home.work_selected,
                text: 'back',
                onClick: () => {
                    alert('消息aaa');
                }
            },
            right: {
                icon: Assert.Header.filter,
                onClick: () => {
                    alert('消息保存');
                }
            }
        }
    }

    _render() {
        return (
            <View>
                <Text>sssssss</Text>
                <Text>sssssss</Text>
                <Text>sssssss</Text>
                <Text>sssssss</Text>
                <Text>sssssss</Text>
                <Text>sssssss</Text>
                <Text>sssssss</Text>
            </View>
        )
    }
}
