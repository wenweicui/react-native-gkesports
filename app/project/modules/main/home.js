import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ListView,
    Image,
    ScrollView,
    StatusBar,
    Dimensions,
    ActivityIndicator,
    Platform
} from 'react-native';
var InteractionManager = require('InteractionManager');
var Animated = require('Animated');
import {WrapScreen} from "../wrap";
import * as Utils from "../../../core/utils";
import * as Assets from '../../assets'
import {Avatar, Button, Divider, List, ListItem,ButtonGroup} from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainRow from './mainRow';
import { ifIphoneX } from 'react-native-iphone-x-helper';
const SCREEN_WIDTH = Dimensions.get('window').width;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;
const HEADER_POSOTION = 300 - HEADER_HEIGHT;
const HEADER_APPEAR = HEADER_POSOTION - HEADER_HEIGHT;
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export class HomeScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = 'none'
        this.state = {
          prevOffset : 0,
          aniY: new Animated.Value(0),
          transform:[],
          isReady : false,
          userInfo:{data:null},
          loaded: false,
          fill:40
        }
        this._isMounted = false;
    }

    componentDidMount() {
      this._isMounted = true;
      InteractionManager.runAfterInteractions(() => {
        this._isMounted && this.setState({loaded: true,isReady:true});
      });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    _renderLoadingView(){
      return(
        <View style={styles.loadingActivityContainer}>
          <ActivityIndicator
            animating={ !this.state.isReady }
            style={[styles.centering, {height: 80}]}
            size="large"
          />
        </View>
      )
    }

    handleScroll(event: Object) {
      const { aniY } = this.state;
      let offset = event.nativeEvent.contentOffset.y;
      if (offset > HEADER_APPEAR && this.state.prevOffset < HEADER_APPEAR) {
        return this.setState({prevOffset: offset})
      }
      if (offset < HEADER_APPEAR && this.state.prevOffset > HEADER_APPEAR) {
        return this.setState({prevOffset: offset})
      }
      aniY.setValue(offset);
    }

    _render() {
      let width = SCREEN_WIDTH;
      let height = width - 100;
      const buttons = ['游戏', '外卖', '其他']
      const { selectedIndex } = this.state
      if(this.state.isReady){
        return (
          <View style={{ flex:1, backgroundColor: '#fff' }}>
            <StatusBar
               backgroundColor="transparent"
               barStyle="default"
             />
            <View style={[styles.header]}>
               <View style={{paddingHorizontal:15,justifyContent:'space-between',flexDirection:'row',paddingHorizontal:30}}>
                 <View style={{alignItems:'flex-start'}}>
                    <Text style={{color:'#5E5959', fontSize:24,fontWeight:'bold'}}>Mr.Cui</Text>
                    <View style={{flexDirection:'row',marginTop:5,marginBottom:10}}>
                      <View style={{backgroundColor:"#81CFE0",padding:5,borderRadius:5}}>
                        <Text style={{color:'#fff', fontSize:14,fontWeight:'bold'}}>Level.1</Text>
                      </View>
                      <View style={{justifyContent:'center'}}>
                        <Text style={{color:'#b7b7b7', fontSize:16,fontWeight:'500',paddingLeft:5}}>普通会员</Text>
                      </View>
                    </View>
                    <Text style={{color:'#ccc', fontSize:16,fontWeight:'500',paddingLeft:5}}>升级还需60小时游戏时间</Text>
                 </View>
                 <View style={{justifyContent:"center"}}>
                    <AnimatedCircularProgress
                       size={90}
                       width={5}
                       fill={this.state.fill}
                       tintColor="#3498DB"
                       backgroundColor="#ccc">
                       {
                         (fill) => (
                           <Text style={{color:'#3498DB',fontSize:16}}>
                             { this.state.fill } 小时
                           </Text>
                         )
                       }
                      </AnimatedCircularProgress>
                 </View>
               </View>
            </View>
            <View style={{flex:1,backgroundColor:'white',paddingTop:10}}>
               <View  style={styles.container}>
                  <View style={styles.imgContainer}>
                    <Image style={styles.img} source={require('../../images/banner.png')} />
                  </View>
                 <View style={{paddingTop:20}}>
                    <View style={{flexDirection:'row', justifyContent:"space-between",paddingHorizontal:30}}>
                      <TouchableOpacity style={{alignItems:'center'}} onPress={() => {this.props.navigation.navigate('Menu')}}>
                        <Image style={styles.icon} source={require('../icons/menu.png')} />
                        <Text style={styles.iconText}>菜单</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{alignItems:'center'}} onPress={() => {this.props.navigation.navigate('Me')}}>
                        <Image style={styles.icon} source={require('../icons/vip.png')} />
                        <Text style={styles.iconText}>会员卡</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{alignItems:'center'}} onPress={() => {this.props.navigation.navigate('Seat')}}>
                        <Image style={styles.icon} source={require('../icons/seat.png')} />
                        <Text style={styles.iconText}>订座</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{alignItems:'center'}}>
                        <Image style={styles.icon} source={require('../icons/wallet.png')} />
                        <Text style={styles.iconText}>充值</Text>
                      </TouchableOpacity>
                    </View>
                 </View>
                 <View style={{paddingTop:30}}>
                    <View style={styles.btnContainer}>
                      <View style={{flex:1,paddingRight:15,borderRightWidth:1,borderRightColor:'#eee'}}>
                        <TouchableOpacity style={styles.topBtn} onPress={() => {this.props.navigation.navigate('NearBy')}}>
                          <Text style={styles.iconText}>附近的玩家</Text>
                          <Image style={styles.iconLg} source={require('../icons/people.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.lowBtn}>
                          <Text style={styles.iconText}>留言板</Text>
                          <Image style={styles.iconLg} source={require('../icons/book.png')} />
                        </TouchableOpacity>
                      </View>
                      <View style={{flex:1,paddingLeft:15}}>
                        <TouchableOpacity style={styles.topBtn} onPress={() => {this.props.navigation.navigate('Reward')}}>
                          <Text style={styles.iconText}>积分兑换</Text>
                          <Image style={styles.iconLg} source={require('../icons/gift.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.lowBtn}>
                          <Text style={styles.iconText}>折扣券</Text>
                          <Image style={styles.iconLg} source={require('../icons/coupons.png')} />
                        </TouchableOpacity>
                      </View>
                    </View>
                 </View>
               </View>
             </View>
          </View>
        )
      } else {
      return(
        <View style={styles.container}>
          <StatusBar
             backgroundColor="transparent"
             barStyle="default"
           />
          { this._renderLoadingView() }
        </View>
      );
    }
    }
}

const styles = Utils.PLStyle({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: StatusBar.currentHeight
    },
    header: {
      paddingTop:20,
      ...ifIphoneX({
             marginTop: 50
         }, {
             marginTop: 20
         })
     },
    loadingActivityContainer:{
      alignSelf:'stretch',
      flex:1,
      justifyContent:'center'
    },
    img: {
      width: SCREEN_WIDTH,
      height: 200
    },
    icon: {
      width:30,
      height:30,
      backgroundColor: 'transparent',
      marginBottom: 10
    },
    iconLg: {
      width:40,
      height:40,
      backgroundColor: 'transparent',
    },
    iconText: {
      color:'#5e5959',
      fontSize:16
    },
    btnContainer: {
      paddingVertical:20,
      flexDirection:'row',
      justifyContent:"space-between",
      paddingHorizontal:30,
      borderWidth:1,
      borderColor:'#eee'
    },
    topBtn: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"space-between",
      paddingBottom:10,
      borderBottomWidth:1,
      borderBottomColor:'#eee'
    },
    lowBtn: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"space-between",
      paddingTop:10
    },
    imgContainer:{
      backgroundColor: 'transparent',
      overflow: 'hidden',
      height: 200,
      width: SCREEN_WIDTH,
    },
    linearGradient: {
      position: 'absolute',
      top: -10,
      left: 0,
      right: 0,
      height:250,
    },
    stickyHeader: {
      backgroundColor:'white',
    },
  })
