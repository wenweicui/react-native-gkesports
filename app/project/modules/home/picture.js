import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";
import {connect} from "react-redux";
import * as Actions from '../../redux/actions'
import Urls from "../../../config/api/urls";

class PictureScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "图文",
        }
    }
    componentDidMount() {
        this.store.dispatch(Actions.request(Urls.Picture.getIdList));
    }
    _render() {
        console.log(this.props.idList)
        return (
            <View>
                <Text>Picture</Text>
            </View>
        )
    }
}

//make this component available to the app
function mapStateToProps(state) {
    return {
        idList: state.Picture.getIdList,
        requestStatus: state.Common.requestStatus
    }
}

export default connect(mapStateToProps)(PictureScreen);