import React, {Component} from 'react';
import {
    Text, TouchableOpacity,
    View,
} from 'react-native';
import Urls from "../../../config/api/urls";
import * as Utils from '../../../core/utils'
import PropTypes from 'prop-types'
import {Card} from "react-native-elements";
import _ from 'lodash'
import {Dialog} from "../../components";

export default class PictureItem extends Component {

    constructor(props) {
        super(props);
        this.header = 'none';
        this.state = {
            data: null
        }
    }

    static propTypes = {
        ...View.propTypes,
        id: PropTypes.string.isRequired,
    };

    static defaultProps = {
        id: '1958',
    };

    componentDidMount() {
        Utils.fetch(Urls.Picture(this.props.id).getPictureDetail).then((data) => {
            this.setState({
                data: data
            })
        })
    }

    render() {
        let data = this.state.data;
        return !_.isNull(data) ? (
            <TouchableOpacity onPress={() => {
                Dialog.showImage(data)
            }}>
                <Card
                    containerStyle={{margin: 0, padding: 0}}
                    image={{uri: data.hp_img_url}}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Text style={{fontSize: 13, color: '#888'}}>{data.hp_author}</Text>
                    </View>
                </Card>
            </TouchableOpacity>
        ) : (
            <View/>
        )
    }
}
