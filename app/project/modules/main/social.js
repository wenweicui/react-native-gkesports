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
    ActivityIndicator
} from 'react-native';
var InteractionManager = require('InteractionManager');
var Animated = require('Animated');
import {WrapScreen} from "../wrap";
import * as Utils from "../../../core/utils";
import * as Assets from '../../assets'
import {Avatar, Button, Divider, List, ListItem,ButtonGroup} from "react-native-elements";
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import MainRow from './mainRow';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const userData = [
  {
    username: 'Wenwei Cui',
  },
  {
    username: 'Yujia Tang',
  },
]
const generalData = [
  {
    user: {
      username: 'Wenwei Cui',
    },
    content: '求一起玩游戏的室友',
    game: '绝地求生',
    likes: {
      count: 10
    },
    comments: {
      count:10
    },
    tags: {
      text: ['PUBG','娱乐局','求带','SEA']
    },
    created_time: '1518757354'
  },
  {
    user: {
      username: 'Yujia Tang',
    },
    content: '求一起玩游戏的室友',
    game: '绝地求生',
    likes: {
      count: 15
    },
    comments: {
      count:53
    },
    tags: {
      text: ['PUBG','上分局','求带', 'NA']
    },
    created_time: '1518958891'
  }
]

const eatData = [
  {
    user: {
      username: 'Wenwei Cui',
    },
    content: '有没有人想吃m记的',
    game: '绝地求生',
    likes: {
      count: 10
    },
    comments: {
      count:10
    },
    tags: {
      text: ['PUBG','娱乐局','求带','SEA']
    },
    created_time: '1518757354'
  },
  {
    user: {
      username: 'Yujia Tang',
    },
    content: '点外卖 想一起的私聊',
    game: '绝地求生',
    likes: {
      count: 15
    },
    comments: {
      count:53
    },
    tags: {
      text: ['PUBG','上分局','求带', 'NA']
    },
    created_time: '1518958891'
  }
]

const gameData = [
  {
    user: {
      username: 'Wenwei Cui',
    },
    content: '二缺二 美服2000分 求不坑',
    game: '绝地求生',
    likes: {
      count: 10
    },
    comments: {
      count:10
    },
    tags: {
      text: ['PUBG','娱乐局','求带','SEA']
    },
    created_time: '1518757354'
  },
  {
    user: {
      username: 'Yujia Tang',
    },
    content: '三缺一 求大神带',
    game: '绝地求生',
    likes: {
      count: 15
    },
    comments: {
      count:53
    },
    tags: {
      text: ['PUBG','上分局','求带', 'NA']
    },
    created_time: '1518958891'
  },
  {
    user: {
      username: 'Yujia Tang',
    },
    content: '三缺一 求大神带',
    game: '绝地求生',
    likes: {
      count: 15
    },
    comments: {
      count:53
    },
    tags: {
      text: ['PUBG','上分局','求带', 'JP/KR']
    },
    created_time: '1518358891'
  },
  {
    user: {
      username: 'Yujia Tang',
    },
    content: '三缺一 求大神带',
    game: '绝地求生',
    likes: {
      count: 15
    },
    comments: {
      count:53
    },
    tags: {
      text: ['PUBG','上分局','求带', 'EU']
    },
    created_time: '1518258891'
  },
]

gameData.sort(function(a,b){
 return parseInt(b.created_time) - parseInt(a.created_time);
})

export class SocialScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = 'none'
        const dataSource = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.state = {
          index: 0,
          routes: [
            { key: '1', title: '游戏' },
            { key: '2', title: '外卖' },
            { key: '3', title: '其他' },
          ],
          images: Assets.Me.Images,
          gameDataSource: dataSource.cloneWithRows([]),
          eatDataSource: dataSource.cloneWithRows([]),
          generalDataSource: dataSource.cloneWithRows([]),
          isReady : false,
          userInfo:{data:null},
          loaded: false
        }
        this._isMounted = false;
    }

    componentDidMount() {
      this._isMounted = true;
      InteractionManager.runAfterInteractions(() => {
        this._isMounted && this.setState({loaded: true});
        this._loadGameData();
        this._loadEatData();
        this._loadGeneralData();
      });
    }

    _loadGameData(){
      let self = this;
      let data = gameData;
      const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
      self.setState({gameDataSource: dataSource.cloneWithRows(data),isReady:true,userInfo:userData});
    }

    _loadEatData(){
      let self = this;
      let data = eatData;
      const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
      self.setState({eatDataSource: dataSource.cloneWithRows(data),isReady:true,userInfo:userData});
    }

    _loadGeneralData(){
      let self = this;
      let data = generalData;
      const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
      self.setState({generalDataSource: dataSource.cloneWithRows(data),isReady:true,userInfo:userData});
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

    _renderRow(rowData){
      if(rowData.hasOwnProperty('content')){
        return(
          <MainRow data = {rowData}/>
        )
      }
      else{
        return(
          <MainRow data = {rowData}/>
        )
      }
    }

    _handleIndexChange = index =>
      this.setState({
        index,
      });

    _handleTabItemPress = ({ route }) => {
      if (route !== this.state.routes[this.state.index]) {
        return;
      }
      switch (route.key) {
        case '1':
          if (this._first) {
            this._first.scrollTo({ y: 0 });
          }
          break;
        case '2':
          if (this._second) {
            this._second.scrollTo({ y: 0 });
          }
          break;
        case '3':
          if (this._third) {
            this._third.scrollTo({ y: 0 });
          }
          break;
      }
    };

    _renderLabel = props => ({ route, index }) => {
      const inputRange = props.navigationState.routes.map((x, i) => i);
      const outputRange = inputRange.map(
        inputIndex => (inputIndex === index ? '#1bbc9b' : '#aaa')
      );
      const color = props.position.interpolate({
        inputRange,
        outputRange,
      });

      return (
        <Animated.Text style={[styles.label, { color }]}>
          {route.title}
        </Animated.Text>
      );
    };

    _renderHeader = props => (
      <TabBar
        {...props}
        pressColor="#1bbc9b"
        onTabPress={this._handleTabItemPress}
        renderLabel={this._renderLabel(props)}
        indicatorStyle={styles.indicator}
        tabStyle={styles.tab}
        style={styles.tabbar}
      />
    );

    _renderScene = ({ route }) => {
      switch (route.key) {
        case '1':
          return (
            <View style={styles.listViewContainer}>
              <ListView style={styles.container}
                dataSource={this.state.gameDataSource}
                renderRow={(rowData) => this._renderRow(rowData)}
              />
            </View>
          );
        case '2':
          return (
            <View style={styles.listViewContainer}>
              <ListView style={styles.container}
                dataSource={this.state.eatDataSource}
                renderRow={(rowData) => this._renderRow(rowData)}
              />
            </View>
          );
        case '3':
          return (
            <View style={styles.listViewContainer}>
              <ListView style={styles.container}
                dataSource={this.state.generalDataSource}
                renderRow={(rowData) => this._renderRow(rowData)}
              />
            </View>
          );
        default:
          return null;
      }
    };

    _render() {
      const buttons = ['游戏', '外卖', '其他']
      const { selectedIndex } = this.state
      if(this.state.isReady){
        return (
          <View style={styles.container}>
            <View style={[styles.header, { borderBottomWidth: 0,borderBottomColor:'rgba(192,192,192,0.3)'}]}>
               <View style={{paddingHorizontal:15,height:50,justifyContent:'space-between',flexDirection:'row'}}>
                 <View style={{flex:1}}/>
                 <View style={{flex:2.5,alignSelf:'center'}}>
                   <Text style={{color:'#5E5959', fontSize:20,fontWeight:'bold',alignSelf:'center'}}>圈子</Text>
                 </View>
                 <TouchableOpacity style={{flex:1,alignItems:"flex-end",justifyContent:'center'}}>
                   <Icon name="ios-add-outline" size={34} color="#5e5959" />
                 </TouchableOpacity>
               </View>
            </View>
            <TabViewAnimated
               style={{flex:1}}
               navigationState={this.state}
               renderScene={this._renderScene}
               renderHeader={this._renderHeader}
               onIndexChange={this._handleIndexChange}
               initialLayout={initialLayout}
             />
          </View>
        )
      } else {
      return(
        <View style={styles.container}>
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
      paddingTop:10,
      ...ifIphoneX({
             marginTop: 50
         }, {
             marginTop: 20
         })
     },
    listViewContainer:{
      flex:1,
      alignSelf:'stretch'
    },
    loadingActivityContainer:{
      alignSelf:'stretch',
      flex:1,
      justifyContent:'center'
    },
    indicator: {
      backgroundColor: '#1bbc9b',
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: '#aaa',
      margin: 8,
    },
    tabbar: {
      backgroundColor: '#fff',
    },
    tab: {
      opacity: 1,
    },
    page: {
      backgroundColor: '#f9f9f9',
    }
  })
