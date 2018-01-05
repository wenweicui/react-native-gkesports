import * as Utils from "../../core/utils/index";
import {Component} from 'react'
import {Image, Text, TouchableOpacity, View} from "react-native";
import _ from 'lodash'
import React from "react";
import {Header, Button} from "react-native-elements";
import * as Assert from "../assets";

/**
 * BaseScreen
 */
export class WrapScreen extends Component {
    componentDidMount() {
        if (!_.isEqual(this.getCurrentRouteName(), "Splash"))
            this.showStatusBar('transparent');

    }

    constructor(props) {
        super(props);
        this.utils = Utils;
        this.routeName = this.getCurrentRouteName();
    }

    static defaultProps = {
        header: {
            left: {
                icon: Assert.Home.work_selected,
            }
        }
    }

    _renderHeader = (header) => {
        if (_.isNull(header)) return (<View/>);
        else if (_.isString(header) && _.isEqual(header, 'none')) return (<View/>);
        else if (_.isString(header) && !_.isEqual(header, 'none')) {
            return (
                <Header
                    backgroundColor={'white'}
                    centerComponent={{text: header, style: {fontSize: 17, color: '#323232'}}}
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
                        text: !_.isNull(header.title) ? this.getCurrentRouteName() : header.title,
                        style: {fontSize: 17, color: '#323232'}
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
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderHeader(this.props.header)}
                {this._render()}
            </View>
        )
    }

    showStatusBar = (color?: string) => {
        Utils.StatusBarUtil.show();
        if (!_.isNull(color)) Utils.StatusBarUtil.setBackgroundColor(color).setTranslucent(true)

    };

    hideStatusBar = () => {
        Utils.StatusBarUtil.hidden();
    }

    getCurrentRouteName = () => {
        if (_.isNull(this.props.navigation)) return;
        return this.props.navigation.state.routeName
    }
}

const styles = Utils.PLStyle({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerImage: {
        width: 18,
        height: 18
    }
});