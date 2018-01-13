import * as Utils from "../../core/utils/index";
import {Component} from 'react'
import {View} from "react-native";
import _ from 'lodash'
import React from "react";
import {KHeader} from '../components'
import store from '../redux/store/configStore'
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
        this.store = store
        this.routeName = this.getCurrentRouteName();
        this.header = {
            title: '',
        }
    }

    render() {
        let t = this.getCurrentRouteName();
        return (
            <View style={styles.container}>
                <KHeader header={this.header} title={t} onLeftPress={() => {
                    this.props.navigation.goBack()
                }}/>
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
});