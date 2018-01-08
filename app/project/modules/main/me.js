import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";
import * as Utils from "../../../core/utils/style";
import * as Assets from '../../assets'
import {Avatar, Button, Divider} from "react-native-elements";

export class MeScreen extends WrapScreen {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        header: 'none'
    }

    _render() {
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <Avatar
                        width={120}
                        height={120}
                        rounded
                        source={Assets.Me.avatar}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                    />
                    <Text style={styles.h1}>MiFind Xuan</Text>
                    <Button
                        backgroundColor={'#F6490D'}
                        textStyle={{paddingLeft: 10, paddingRight: 10, fontWeight: '600'}}
                        borderRadius={100}
                        title='FOLLOW ME'/>
                </View>
                <Divider style={{backgroundColor: '#eee', marginTop: 20}}/>
                <View style={styles.follows}>
                    <View style={styles.followItem}>
                        <Text style={{fontWeight: '300', fontSize: 20, color: '#ccc'}}>Resume</Text>
                        <Text style={{fontWeight: '400', fontSize: 16, color: '#666', marginTop: 10}}>简历</Text>
                    </View>
                    <View style={styles.followItem}>
                        <Text style={{fontWeight: '300', fontSize: 20, color: '#ccc'}}>Skill</Text>
                        <Text style={{fontWeight: '400', fontSize: 16, color: '#666', marginTop: 10}}>技能</Text>
                    </View>
                    <View style={styles.followItem}>
                        <Text style={{fontWeight: '300', fontSize: 20, color: '#ccc'}}>Blog</Text>
                        <Text style={{fontWeight: '400', fontSize: 16, color: '#666', marginTop: 10}}>博客</Text>
                    </View>
                </View>
                <View style={styles.images}>

                </View>
            </View>
        )
    }
}

const styles = Utils.PLStyle({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 40,
    },
    head: {
        alignItems: 'center'
    },
    h1: {
        fontSize: 30,
        color: '#323232',
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 10
    },
    follows: {
        flexDirection: 'row',
        height: 100
    },
    followItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    images: {}
})
