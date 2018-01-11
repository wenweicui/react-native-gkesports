import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";

export class ReadScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "阅读",
        }
    }

    _render() {
        return (
            <View>
                <Text>Read</Text>
            </View>
        )
    }
}
