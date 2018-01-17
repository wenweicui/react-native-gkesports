import React from 'react';
import {
    View,
     FlatList,
} from 'react-native';
import {WrapScreen} from "../wrap";
import {connect} from "react-redux";
import * as Actions from '../../redux/actions'
import Urls from "../../../config/api/urls";
import ActionType from "../../redux/actionType";
import {Loading} from "../../components/loading";
import {Status} from "../../../config/api/api.config";
import {ErrorPage} from "../../components";
import PictureItem from '../picture/item'
import * as Utils from "../../../core/utils";

class PictureScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "图文",
        }
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({item}) => (
        <PictureItem id={item}/>
    );

    componentDidMount() {
        this.store.dispatch(Actions.request(Urls.Picture().getPictureList, ActionType.REQUEST_LIST));
    }

    _render() {
        const detail = this.props.idList;
        if (this.props.requestStatus === Status.SUCCESS) {
            if (!Loading.checkData(detail)) return;
            return (
                <View style={styles.container}>
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        data={detail}
                        renderItem={this._renderItem}
                    />
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
        idList: state.Picture.getIdList,
        requestStatus: state.Common.requestStatus
    }
}

export default connect(mapStateToProps)(PictureScreen);

const styles = Utils.PLStyle({
    container: {
        flex: 1,
        flexDirection: 'column',
    }
})