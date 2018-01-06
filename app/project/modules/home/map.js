import React from 'react';
import {
    Text,
    View, WebView,
} from 'react-native';
import * as Utils from "../../../core/utils";
import * as Assets from "../../assets"
import {WrapScreen} from "../wrap";

export class MapScreen extends WrapScreen {
    constructor(props) {
        super(props);
    }

    static defaultProps = {}

    _render() {
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
                    <Text>地图</Text>
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
        flex: 1.6,
    },
    configContainer: {
        flex: 1,
    },
    webView: {
        flex: 1
    }
});