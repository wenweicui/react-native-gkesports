import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import {WrapScreen} from "../wrap";
import * as Utils from "../../../core/utils";
import * as Assets from '../../assets'
import {Avatar, Button, Divider, List, ListItem} from "react-native-elements";

const CardHeight = (Dimensions.get('window').width - 30) * 0.63;
const list = [
  {
    title: '通用',
    icon: 'ios-construct-outline'
  },
  {
    title: '通知',
    icon: 'ios-notifications-outline'
  },
  {
    title: 'Language',
    icon: 'ios-globe-outline'
  },
  {
    title: '邀请好友',
    icon: 'ios-person-add-outline'
  },
  {
    title: '向作者反馈',
    icon: 'ios-bulb-outline'
  },
  {
    title: '退出登陆',
    icon: 'ios-exit-outline'
  },
]

export class MeScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = 'none'
        this.state = {
            images: Assets.Me.Images
        }
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({item}) => (
        <Image
            source={item}
            style={styles.image}
        />

    );

    _renderHead() {
        return (
            <View>
                <View style={styles.head}>
                  <Text style={{color:'#5e5959', fontSize:30,fontWeight:'bold',alignSelf:'flex-end'}}>我的</Text>
                  <Avatar
                      width={40}
                      height={40}
                      rounded
                      source={Assets.Me.avatar}
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.7}
                  />
                </View>
                <View style={styles.card}>
                  <Image style={[styles.cardImageBg]} source={require('../../assets/images/logoBg.png')}/>
                  <View style={styles.cardContent}>
                    <View style={{position:'absolute',top:0,left:10}}>
                      <Text style={styles.cardName}>{'Wenwei Cui'.toUpperCase()}</Text>
                      <Text style={styles.cardTitleSmall}>{'name'.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.cardTitle}>GK ESPORTS</Text>
                    <View style={{position:'absolute',bottom:0,left:10}}>
                      <Text style={styles.cardName}>1884 2018 001</Text>
                      <Text style={styles.cardTitleSmall}>{'Member No.'.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.cardType}>Standard</Text>
                  </View>
                  <View style={{position:'absolute',top:15,right:15}}>
                    <Image style={[styles.cardImageSm]} source={require('../../assets/images/logo.png')}/>
                  </View>
                </View>
                <View style={styles.info}>
                  <View style={{alignItems:'center'}}>
                    <Text style={styles.infoTitle}>积分</Text>
                    <Text style={styles.infoText}>999</Text>
                  </View>
                  <View style={{alignItems:'center'}}>
                    <Text style={styles.infoTitle}>等级</Text>
                    <Text style={styles.infoText}>Standard</Text>
                  </View>
                  <View style={{alignItems:'center'}}>
                    <Text style={styles.infoTitle}>余额</Text>
                    <Text style={styles.infoText}>$20.50</Text>
                  </View>
                </View>
            </View>
        )
    }

    _render() {
        return (
            <ScrollView style={styles.container}>
              {this._renderHead()}
              <List containerStyle={{marginBottom: 40,borderColor:'#f5f5f5'}}>
                {
                  list.map((item, i) => (
                    <ListItem
                      key={i}
                      title={item.title}
                      rightIcon={{name: item.icon,type: 'ionicon',color:'#7e7a7a',style:{fontSize:32,padding:10}}}
                      containerStyle={{borderBottomColor:'#f5f5f5',paddingRight:20,paddingTop:15,paddingBottom:15}}
                      titleStyle={{fontSize:20,fontWeight:"300",color:'#5e5959'}}
                    />
                  ))
                }
              </List>
            </ScrollView>
        )
    }
}

const styles = Utils.PLStyle({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 10,
        marginTop:20
    },
    head: {
        justifyContent:'space-between',
        height:100,
        flexDirection:'row',
        padding:10,
        paddingRight:15,
        paddingLeft:20,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2'
    },
    h1: {
        fontSize: 30,
        color: '#323232',
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 10
    },
    card: {
      margin:15,
      padding:20,
      height:CardHeight,
      borderRadius:15,
      backgroundColor:'#16314A',
      shadowOffset:{  width: 1,  height: 1,  },
      shadowOpacity: 0.7,
    },
    info: {
      flexDirection:'row',
      margin:15,
      paddingHorizontal: 10,
      justifyContent:'space-between'
    },
    infoTitle: {
      fontSize:18,
      fontWeight:'300',
      color:'#5e5959'
    },
    infoText: {
      fontSize:22,
      fontWeight:'300',
      color:'#5e5959'
    },
    cardContent: {
      flex:1,
      backgroundColor:'transparent'
    },
    cardTitle: {
      fontSize:30,
      color:'#E8E3D7',
      fontWeight: '600',
      position:'absolute',
      top:70,
      left:10
    },
    cardName: {
      fontSize:20,
      color:'#E8E3D7',
    },
    cardNumber: {
      fontSize:20,
      color:'#E8E3D7'
    },
    cardTitleSmall: {
      fontSize:12,
      color:'#E8E3D7',
    },
    cardImageSm: {
      width: 80,
      height:80
    },
    cardImageBg: {
      width: 200,
      height:200,
      position:'absolute',
      top:0,
      right:0,
      overflow: 'hidden',
      zIndex:0
    },
    cardType: {
      fontSize:20,
      color:'#E8E3D7',
      position:'absolute',
      bottom:0,
      right:10
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
    images: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 1
    },
    image: {
        width: Utils.sw / 3 - 2,
        height: Utils.sw / 3 - 2,
        margin: 1
    }
})
