import React, {Component} from 'react';
import {Text, View} from 'react-native';
import * as Utils from "../../core/utils";
import PropTypes from 'prop-types'

// create a component
export class DefaultPage extends Component {

    static defaultProps = {
        content: '暂无数据'
    }
    static propTypes = {
        content: PropTypes.string
    }

    render() {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{this.props.content}</Text>
            </View>
        );
    }
}

const styles = Utils.PLStyle({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        color: '#666666',
        fontSize: 16
    }
});
