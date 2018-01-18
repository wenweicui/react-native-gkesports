import React from 'react';
import {
    View,
    Text, FlatList, Image, TouchableOpacity,
} from 'react-native';
import {WrapScreen} from "../wrap";
import {connect} from "react-redux";
import {Loading} from "../../components/loading";
import * as Actions from "../../redux/actions";
import ActionType from "../../redux/actionType";
import {Status} from "../../../config/api/api.config";
import Urls from "../../../config/api/urls";
import * as Utils from "../../../core/utils";
import {ErrorPage} from "../../components";

class ReadScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "文章",
        }
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({item}) => (
        <TouchableOpacity style={[styles.row, styles.item]} onPress={() => {
            this.props.navigation.navigate('EssayDetail', {
                id: item.content_id
            })
        }}>
            <Image source={{uri: item.author[0].web_url}} style={styles.itemImg}/>
            <View style={styles.itemtcontent}>
                <View>
                    <Text style={styles.title}>{item.hp_title}</Text>
                    <Text style={styles.guide}>{item.guide_word}</Text>
                </View>
                <Text style={styles.user}>{item.author[0].user_name}</Text>
            </View>
        </TouchableOpacity>
    );

    componentDidMount() {
        this.store.dispatch(Actions.request(Urls.Reading().getReadingIndex, ActionType.READ_LIST));
    }

    _render() {
        const detail = this.props.readList && this.props.readList.essay;
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
        readList: state.Read.getReadList,
        requestStatus: state.Common.requestStatus
    }
}

export default connect(mapStateToProps)(ReadScreen);

const styles = Utils.PLStyle({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    itemImg: {
        width: 110,
        height: 110
    },
    item: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#e3e3e3'
    },
    itemtcontent: {
        padding: 6,
        justifyContent: 'space-between'
    },
    title: {
        color: '#333',
        fontSize: 15,
        width: 195
    },
    guide: {
        color: '#666',
        fontSize: 11,
        fontWeight: '200',
        width: 195,
        marginTop: 5
    },
    user: {
        color: '#333',
        fontSize: 12,
        width: 195,
        fontWeight: '200',
    }
})