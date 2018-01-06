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
            </View>
        );
    }
}

const styles = Utils.PLStyle({
    container: {
        flex: 1,
    },
    mapContainer: {
        flex: 1.8,
    },
    configContainer: {
        flex: 1,
        backgroundColor: 'blue'
    },
    webView: {
        flex: 1
    }
});