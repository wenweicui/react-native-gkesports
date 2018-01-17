import React from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Overlay} from 'teaset'
import * as Utils from '../../core/utils'
import {Divider} from "react-native-elements";

let key = null;
export const Dialog = {
    show(content, onSure, onCancel) {
        key = Overlay.show(sure(content, onSure, onCancel));
    },
    showImage(data) {
        key = Overlay.show(image(data));
    },
    hide() {
        Overlay.hide(key);
    }
};
const sure = (content, onSure, onCancel) => (
    <Overlay.PopView
        style={{alignItems: 'center', justifyContent: 'center'}}
    >
        <View style={{
            backgroundColor: '#fff',
            minWidth: 260,
            minHeight: 100,
            borderRadius: 10,
            paddingTop: 10,
        }}>
            <View
                style={{width: Utils.ws, height: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
                <Text style={{fontSize: 16, color: '#333'}}>{content}</Text>
            </View>
            <Divider style={{backgroundColor: '#ddd'}}/>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                    onCancel();
                    Dialog.hide();
                }}>
                    <Text style={{fontSize: 16, color: '#666'}}>取消</Text>
                </TouchableOpacity>
                <View style={{width: 1, height: '100%', backgroundColor: '#ddd'}}/>
                <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                    onSure(input);
                    Dialog.hide();
                }}>
                    <Text style={{fontSize: 16, color: '#4ECC80'}}>确定</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Overlay.PopView>
);


const image = (data) => {
    return (
        <Overlay.PopView
            animated={true}
            style={{alignItems: 'center', justifyContent: 'center'}}
        >
            <View style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10
            }}>
                <Image
                    source={{uri: data.hp_img_url}}
                    style={{
                        width: 300,
                        height: 300
                    }}
                />
                <Text style={{
                    color: '#555',
                    marginTop: 5,
                    textAlign: 'center',
                    fontSize: 12
                }}>{data.hp_author}</Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: '#ececec',
                    marginTop: 7,
                    marginBottom: 3,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 6,
                    paddingBottom: 6,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 33,
                        color: '#333',
                        fontWeight: '200'
                    }}>{getDay(data.hp_makettime)}</Text>
                    <Text style={{
                        fontSize: 12,
                        color: '#333',
                        fontWeight: '200',
                        marginTop: 4
                    }}>{getMonth(data.hp_makettime)} . {getYear(data.hp_makettime)}</Text>
                </View>
                <Text style={{
                    width: 320,
                    color: '#666',
                    marginTop: 8,
                    textAlign: 'center',
                    fontSize: 15,
                    lineHeight: 17,
                    fontWeight: '200'
                }}>{data.hp_content}</Text>
            </View>
        </Overlay.PopView>
    )
};

const getMonth = (data) => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return month[parseInt(data.split(" ")[0].split('-')[1])]
};
const getYear = (data) => {
    return data.split(" ")[0].split('-')[0]
};
const getDay = (data) => {
    return data.split(" ")[0].split('-')[2]
};