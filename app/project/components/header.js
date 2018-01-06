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
                    centerComponent={{text: header, style: {fontSize: 18, color: '#323232'}}}
                />
            )
        }
        else if (_.isObject(header)) {
            return (
                <Header
                    backgroundColor={'white'}
                    leftComponent={!header.left ? {} :
                        header.left.icon ?
                            <TouchableOpacity
                                onPress={() => !_.isNull(this.props.header.left.onClick) ? this.props.header.left.onClick() : this.props.navigation.pop()}>
                                <Image
                                    resizeMode={'contain'}
                                    source={header.left.icon}
                                    style={styles.headerImage}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => !_.isNull(this.props.header.left.onClick) ? this.props.header.left.onClick() : this.props.navigation.pop()}>
                                <Text>{header.left.text}</Text>
                            </TouchableOpacity>
                    }
                    centerComponent={{
                        text: !_.isNull(header.title) ? this.props.currentRouteName : header.title,
                        style: {fontSize: 18, color: '#323232'}
                    }}
                    rightComponent={!header.right ? {}
                        : (header.right.icon ?
                                <TouchableOpacity onPress={() => this.props.header.right.onClick()}>
                                    <Image
                                        resizeMode={'contain'}
                                        source={header.right.icon}
                                        style={styles.headerImage}/>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => this.props.header.right.onClick()}>
                                    <Text>{header.right.text}</Text>
                                </TouchableOpacity>
                        )
                    }
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