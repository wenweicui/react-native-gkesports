import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";

export class VideoScreen extends WrapScreen {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        header: {
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
