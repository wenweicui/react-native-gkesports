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
        header: '消息'
    }

    _render() {
        return (
            <View>
            </View>
        )
    }
}
