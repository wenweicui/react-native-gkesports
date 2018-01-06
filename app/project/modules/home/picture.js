import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";

export class PictureScreen extends WrapScreen{

    constructor(props) {
        super(props);
    }

    _render() {
        return (
            <View>
                <Text>Picture</Text>
            </View>
        )
    }
}
