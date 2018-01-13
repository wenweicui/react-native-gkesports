import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";

export default class MusicScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "音乐",
        }
    }

    _render() {
        return (
            <View>
                <Text>Music</Text>
            </View>
        )
    }
}
