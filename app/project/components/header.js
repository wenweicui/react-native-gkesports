import {View, Text, TouchableOpacity, Image} from "react-native";
import React, {Component} from "react";
import * as Utils from "../../core/utils";
import {Header} from "react-native-elements";
import _ from 'lodash'

export class KHeader extends Component {
    constructor(props) {
        super(props);
    }

    _renderHeader = (header) => {
        if (_.isNull(header)) return (<View/>);
        else if (_.isString(header) && _.isEqual(header, 'none')) return (<View/>);
        else if (_.isString(header) && !_.isEqual(header, 'none')) {
            return (
                <Header
                    backgroundColor={'white'}
                    centerComponent={{text: header, style: {fontSize: 20, color: '#666'}}}
                />
            )
        }
        else if (_.isObject(header)) {
            return (
                <Header
                    backgroundColor={'white'}
                    leftComponent={{icon: 'chevron-left', type: 'feather', color: '#666', size: 25}}
                    centerComponent={{text: this.props.currentRouteName, style: {fontSize: 20, color: '#666'}}}
                    rightComponent={{}}
                />
            )
        }
    };

    render() {
        return (
            <View>
                {this._renderHeader(this.props.header)}
            </View>
        )
    }
}

const styles = Utils.PLStyle({
    headerImage: {
        width: 18,
        height: 18
    }
});