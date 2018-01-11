import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";

export class RadioScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "电台",
        }
    }

    _render() {
        return (
            <View>
                <Text>Radio</Text>
            </View>
        )
    }
}
