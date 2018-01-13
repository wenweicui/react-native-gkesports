import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";

export default class VideoScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header={
            title: "影视",
        }
    }


    _render() {
        return (
            <View>
                <Text>Video</Text>
            </View>
        )
    }
}
