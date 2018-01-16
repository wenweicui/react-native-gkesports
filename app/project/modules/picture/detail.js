import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";
import {connect} from "react-redux";
import * as Actions from '../../redux/actions'
import Urls from "../../../config/api/urls";
import ActionType from "../../redux/actionType";
import {Status} from "../../../config/api/api.config";
import {Loading} from "../../components/loading";
import {ErrorPage} from "../../components";

class PictureDetailScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "图文",
        }
    }

    componentDidMount() {
        this.store.dispatch(Actions.request(Urls.Picture().getPictureList, ActionType.REQUEST_LIST));
    }

    _render() {
        console.log(this.props.idList)
        const detail = this.props.idList;
        if (this.props.requestStatus === Status.SUCCESS) {
            if (!Loading.checkData(detail)) return;
            return (
                <View>

                </View>
            )
        }else if (this.props.requestStatus === Status.FAIL) {
            return (
                <ErrorPage/>
            )
        }
    }
}

//make this component available to the app
function mapStateToProps(state) {
    return {
        idList: state.Picture.getIdList,
        requestStatus: state.Common.requestStatus
    }
}

export default connect(mapStateToProps)(PictureDetailScreen);