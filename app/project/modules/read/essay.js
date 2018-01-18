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

class EssayDetailScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "文章",
        }
    }

    componentDidMount() {
        const contentId = this.props.navigation.state.params.id;
        this.store.dispatch(Actions.request(Urls.Reading(contentId).getEssay, ActionType.ESSAY_DETAIL));
    }

    _render() {
        console.log(this.props.essay)
        const detail = this.props.essay;
        if (this.props.requestStatus === Status.SUCCESS) {
            if (!Loading.checkData(detail)) return;

            this.setTitle(detail.hp_title);
            return (
                <View>

                </View>
            )
        } else if (this.props.requestStatus === Status.FAIL) {
            return (
                <ErrorPage/>
            )
        }
    }
}

//make this component available to the app
function mapStateToProps(state) {
    return {
        essay: state.Read.getEssay,
        requestStatus: state.Common.requestStatus
    }
}

export default connect(mapStateToProps)(EssayDetailScreen);