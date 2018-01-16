import React, {Component} from 'react';
import {Text, View} from 'react-native';
import * as Utils from "../../core/utils";
import PropTypes from 'prop-types'

// create a component
export class ErrorPage extends Component {
    static defaultProps = {
        content: '抱歉，您的请求有问题，该页面无法显示'
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
