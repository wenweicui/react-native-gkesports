import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";

export default class QuestionScreen extends WrapScreen{

    constructor(props) {
        super(props);
        this.header= {
            title: "问答",
        }
    }

    _render() {
        return (
            <View>
                <Text>Question</Text>
            </View>
        )
    }
}
