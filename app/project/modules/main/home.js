import React from 'react';
import {
    Text, TouchableOpacity,
    View, WebView,
} from 'react-native';
import _ from 'lodash'
import * as Utils from "../../../core/utils";
import * as Assets from "../../assets"
import {WrapScreen} from "../wrap";
import {Icon} from "react-native-elements";
import {homeModules} from '../../../config/nav/home.router'

export class HomeScreen extends WrapScreen {
    constructor(props) {
        super(props);
    }

    static defaultProps = {}

    _render() {
        const modules = _.chunk(homeModules, 3); // 将HomeModule 每三个分成一个数组
        return (
            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <WebView
                        automaticallyAdjustContentInsets={false}
                        style={styles.webView}
                        source={Assets.H5.map}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                        scalesPageToFit={true}
                    />
                </View>
                <View style={styles.configContainer}>
                    {modules.map((item, index) => {
                        return (
                            <View style={styles.configItemRow} key={index}>
                                {
                                    item.map((module, i) => {
                                        return (
                                            <TouchableOpacity style={styles.configItem} key={i}
                                                              onPress={() => this.props.navigation.navigate(module.router)}>
                                                <Icon
                                                    size={40}
                                                    name={module.icon}
                                                    type='entypo'
                                                    color={module.color}
                                                />
                                                <Text style={styles.configText}>{module.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        )
                    })}
                </View>
                <View style={styles.tagHere}>
                    <Text style={styles.tagText}>{Assets.str.APP_NAME} {Assets.str.SPLASH_CON}</Text>
                </View>
            </View>
        );
    }
}

const styles = Utils.PLStyle({
    container: {
        flex: 1,
    },
    tagHere: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'rgba(00, 00, 00, 0)',
    },
    tagText: {
        fontSize: 20,
        color: '#666666'
    },
    mapContainer: {
        flex: 1.7,
    },
    configContainer: {
        flex: 1,
    },
    webView: {
        flex: 1
    },
    configItemRow: {
        flex: 1,
        flexDirection: 'row'
    },
    configItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    columnLine: {
        width: 1,
        backgroundColor: '#cccccc',
        opacity: 0.5
    },
    configText: {
        marginTop: 10,
        color: '#50595C'
    }
});