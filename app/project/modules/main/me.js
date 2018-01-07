import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";

export class MeScreen extends WrapScreen {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        header: '我的'
    }

    _render() {
        return (
            <View>
            </View>
        )
    }
}
