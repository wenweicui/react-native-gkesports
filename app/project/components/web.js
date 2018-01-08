/**
 * Created by coderxuan on 2017/5/6.
 */
import React from 'react';
import {WrapScreen} from "../../project/modules/wrap";
import * as Utils from '../../core/utils/index'
import * as Assets from '../../project/assets'
import {WebView} from "react-native";

export class Web extends WrapScreen {

    render() {
        const source = Assets.H5.resume;
        return (
            <WebView
                bounces={false}
                startInLoadingState={false}
                allowUniversalAccessFromFileURLs
                ref={webView => {
                    this.webView = webView
                }}
                source={source}
                style={styles.webView}
            />
        );
    }
}

const styles = Utils.PLStyle({
    webView: {
        width: Utils.sw,
        height: Utils.sh
    }
});


