import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import * as Utils from "../../../core/utils";
import {WrapScreen} from "../wrap";

export class WorkScreen extends WrapScreen {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
        }
    }

    static defaultProps = {
        header: '工作'
    }

    _render() {
        return (
            <View>
                <Text>sdasdsa</Text>
            </View>
        );
    }
}

const styles = Utils.PLStyle({});