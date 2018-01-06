import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import * as Utils from "../../../core/utils";
import {WrapScreen} from "../wrap";

export class MapScreen extends WrapScreen {
    constructor(props) {
        super(props);
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