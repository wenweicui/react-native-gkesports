import {View} from "react-native";
import React, {Component} from "react";
import * as Utils from "../../core/utils";
import {Header, Icon} from "react-native-elements";
import _ from 'lodash'

/**
 *
 * 使用：
 如果header typeof Object ，会带有arrow-left ， 如果是 static defaultProps = {header="标题"} 则只有title
 static defaultProps = {
        header: '标题'
    }
 static defaultProps = {
        header: {
            title: "标题",
            right: {
                icon: 'home',
                type: 'entypo',
                onPress: () => {
                    alert('aaa')
                }
            }
        }
    }
 */
export class KHeader extends Component {
    constructor(props) {
        super(props);
    }


    _renderHeader = (header, title) => {
        if (_.isNull(header)) return (<View/>);
        else if (_.isString(header) && _.isEqual(header, 'none')) return (<View/>);
        else if (_.isString(header) && !_.isEqual(header, 'none')) {
            return (
                <Header
                    backgroundColor={'white'}
                    centerComponent={{text: header, style: {fontSize: 20, color: '#666'}}}
                />
            )
        }
        else if (_.isObject(header)) {
            let t = this.isNoTitle(header) ? title : header.title;
            return (
                <Header
                    backgroundColor={'white'}
                    leftComponent={
                        <Icon
                            size={26}
                            name={'chevron-left'}
                            type='feather'
                            color={'#666'}
                            onPress={this.props.onLeftPress}
                        />
                    }
                    centerComponent={{text: t, style: {fontSize: 20, color: '#666'}}}
                    rightComponent={
                        this._renderRight(header)
                    }
                />
            )
        }
    };

    _renderRight(header) {
        let right;
        if (this.isNoRight(header)) {
            right = (<View style={{width: 26}}/>)
        } else {
            right = (
                <Icon
                    size={26}
                    name={header.right.icon}
                    type={header.right.type}
                    color={'#666'}
                    onPress={header.right.onPress}
                />
            )
        }
        return right;
    }

    render() {
        return (
            <View>
                {this._renderHeader(this.props.header, this.props.title)}
            </View>
        )
    }

    isNoRight = (header) => {
        return !(_.has(header, 'right') || _.isNull(header.right))
    }

    isNoTitle = (header) => {
        return header.title === '' || !(_.has(header, 'title') || _.isNull(header.title))
    }
}

const styles = Utils.PLStyle({
    headerImage: {
        width: 18,
        height: 18
    }
});