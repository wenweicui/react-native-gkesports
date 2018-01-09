/**
 * Created by coderxuan on 2017/5/6.
 */
import React from 'react';
import {WrapScreen} from "../../project/modules/wrap";
import * as Utils from '../../core/utils/index'
import {WebView} from "react-native";

export class WebScreen extends WrapScreen {

    static defaultProps = {
        header: 'none'
    };

    _render() {
        return (
            <WebView
                bounces={false}
                startInLoadingState={false}
                allowUniversalAccessFromFileURLs
                source={this.props.navigation.state.params.url}
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


