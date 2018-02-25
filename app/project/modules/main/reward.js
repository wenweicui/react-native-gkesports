import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput,
    ScrollView,
    RefreshControl,
    Dimensions
} from 'react-native';
import * as Utils from "../../../core/utils";
import * as Assets from '../../assets'
import {Avatar, Button, Divider, List, ListItem} from "react-native-elements";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Icon from 'react-native-vector-icons/SimpleLineIcons';

let typeList = [
  { nickname: '曾泰', picture: '', letter: 'Z' },
  { nickname: '狄仁杰', picture: '', letter: 'D' },
  { nickname: '李元芳', picture: '', letter: 'L' },
  { nickname: '曾泰', picture: '', letter: 'A' },
  { nickname: '狄仁杰', picture: '', letter: 'B' },
  { nickname: '李元芳', picture: '', letter: 'C' },
]

let addressAllList = [
  { title: 'A', number: 0, scrollHeight: 0 },
  { title: 'B', number: 0, scrollHeight: 0 },
  { title: 'C', number: 0, scrollHeight: 0 },
  { title: 'D', number: 0, scrollHeight: 0 },
  { title: 'E', number: 0, scrollHeight: 0 },
  { title: 'F', number: 0, scrollHeight: 0 },
  { title: 'G', number: 0, scrollHeight: 0 },
  { title: 'H', number: 0, scrollHeight: 0 },
  { title: 'I', number: 0, scrollHeight: 0 },
  { title: 'J', number: 0, scrollHeight: 0 },
  { title: 'K', number: 0, scrollHeight: 0 },
  { title: 'L', number: 0, scrollHeight: 0 },
  { title: 'M', number: 0, scrollHeight: 0 },
  { title: 'N', number: 0, scrollHeight: 0 },
  { title: 'O', number: 0, scrollHeight: 0 },
  { title: 'P', number: 0, scrollHeight: 0 },
  { title: 'Q', number: 0, scrollHeight: 0 },
  { title: 'R', number: 0, scrollHeight: 0 },
  { title: 'S', number: 0, scrollHeight: 0 },
  { title: 'T', number: 0, scrollHeight: 0 },
  { title: 'U', number: 0, scrollHeight: 0 },
  { title: 'V', number: 0, scrollHeight: 0 },
  { title: 'W', number: 0, scrollHeight: 0 },
  { title: 'X', number: 0, scrollHeight: 0 },
  { title: 'Y', number: 0, scrollHeight: 0 },
  { title: 'Z', number: 0, scrollHeight: 0 },
]

class Reward extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      searchText: '',
      isFocused: false,
      addressList: [],
      friendList: [],
      y: 0,
      rowHeight: 0,
      onNumber: 0
    }
    this.addressListSource = []
    this.friendListSource = []
    this.area = { min: null, max: null }
  }
  componentDidMount () {
    const that = this
    setTimeout(function () {
      that.refs.friendArea.measure((x, y, width, height, left, top) => {
        console.log('好友列表从高度' + y + '开始渲染***************')
        that.setState({ y })
      })
      that.refs.friendItem.measure((x, y, width, height, left, top) => {
        console.log('列表Item高度为' + height + '***************')
        that.rowHeight = height
        that.setState({ rowHeight: height })
      })
    })
  }

  onFocus () {
    this.props.toggleTabBarAction(true)
    /** 对列表信息进行排序 放在saga中进行处理 */
    // this.sortFriend()
    /** 右侧通讯录 */
    this.sortAddress()
  }

  sortFriend () {
    this.friendListSource = typeList.sort((a, b) => { return a.letter.localeCompare(b.letter) })
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      this.onFocus()
    }
    if (this.props.isFocused && !nextProps.isFocused) {
      this.onBlur()
    }
  }

  componentWillUnmount () {
  }

  /** 右侧通讯录 */
  sortAddress () {
    /**
     * 计算每层个数
     */
    let tempList = addressAllList
    typeList.map((item) => {
      addressAllList.map((element, index) => {
        if (element.title === item.letter) {
          let { number } = tempList[index]
          // console.log('出现一个相同项' + item.letter)
          tempList.splice(index, 1, { ...tempList[index], number: number + 1 })
        }
      })
    })
    // console.log(tempList)
    /**
     * 计算每层y
     */
      tempList.map((item, index) => {
        let change = {}
        if (index === 0) {
          change = { ...item, scrollHeight: this.state.y }
        } else {
          const { scrollHeight, number } = this.addressListSource[index - 1]
          change = { ...item, scrollHeight: scrollHeight + number * this.state.rowHeight }
        }
        this.addressListSource.push(change)
      })
      // console.log(this.addressListSource)
      this.setState({ addressList: this.addressListSource })
  }

  /** 是否滑动到当前的层 */
  isScrollOn (e) {
    const y = e.nativeEvent.contentOffset.y
    /** 重复区间与异常值判断 */
    if ((!(this.area.min && this.area.max && (y >= this.area.min && y < this.area.max)) && !(this.area.min && !this.area.max && y >= this.area.min) && !(y < this.state.y)) || (!this.area.min && !this.area.max)) {
      console.log('分层处理频率**********************************')
      console.log(y)
      console.log(this.area)
      let addressListSource = this.addressListSource
      addressListSource.map((item, index) => {
        if (index <= addressListSource.length - 2) {
          if (y >= item.scrollHeight && y < addressListSource[index + 1].scrollHeight) {
            this.area = { min: item.scrollHeight, max: addressListSource[index + 1].scrollHeight }
            this.setState({ onNumber: index })
          }
        } else {
          if (y >= item.scrollHeight) {
            this.area = { min: item.scrollHeight, max: null }
            this.setState({ onNumber: index })
          }
        }
      })
    }
  }

  _contentViewScroll (e) {
    var offsetY = e.nativeEvent.contentOffset.y // 滑动距离
    var contentSizeHeight = e.nativeEvent.contentSize.height // scrollView contentSize高度
    var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height // scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight) {
      console.log('即将加载新数据********************')
    }
  }

  onRefresh () {
    const that = this
    this.setState({ refreshing: true })
    setTimeout(function () {
      that.setState({ refreshing: false })
    }, 1200)
  }

  render () {
    const { navigation } = this.props
    const { refreshing, searchText, isFocused, addressList, y, onNumber } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff'}}>
        <View style={{paddingTop:10, borderBottomWidth: 1,borderBottomColor:'rgba(192,192,192,0.3)',...ifIphoneX({marginTop: 50}, {marginTop: 20})}}>
           <View style={{paddingHorizontal:15,height:50,justifyContent:'space-between',flexDirection:'row'}}>
           <TouchableOpacity style={{flex:1,alignItems:"flex-start",justifyContent:'center'}} onPress={() => navigation.goBack()}>
             <Icon name="arrow-left" size={22} color="#5e5959" />
           </TouchableOpacity>
             <View style={{flex:2.5,alignSelf:'center'}}>
               <Text style={{color:'#5E5959', fontSize:20,fontWeight:'bold',alignSelf:'center'}}>积分兑换</Text>
             </View>
             <View style={{flex:1}}/>
           </View>
        </View>
        <ScrollView
          ref='scroll'
          automaticallyAdjustContentInsets={false}
          style={{backgroundColor: '#fff'}}
          scrollEventThrottle={2}
          onScroll={(e) => this.isScrollOn(e)}
          onMomentumScrollEnd={this._contentViewScroll.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh.bind(this)}
              tintColor='#999'
              title='努力刷新中...'
              titleColor='#999'
              colors={['#999', '#999', '#999']}
              progressBackgroundColor='#fff'
            />
          }
          >
          <View style={{ backgroundColor: '#fff', paddingLeft: 15}}>
            <View style={{ }} ref='friendArea'>
              {
                undefined !== typeList && typeList.length > 0 && typeList.map((item, index) => {
                  const { nickname, picture } = item
                  let checked = true
                  if (searchText && nickname.indexOf(searchText) === -1) return false
                  return (checked &&
                    <TouchableOpacity onPress={() => navigation.navigate('patientInfo')} key={index} ref='friendItem'>
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                        <Image source={require('../../assets/images/avatar.jpg')} style={{ width: 40, height: 40, borderRadius: 20 }} />
                        <Text style={{ fontSize: 20, color: '#5e5959', marginLeft: 10 }}>{nickname}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        </ScrollView>
        <View style={{ position: 'absolute', top: y, right: 5 }}>
          { addressList.map((item, index) => {
            const { title, number, scrollHeight } = item
            return (number !== 0 &&
            <TouchableOpacity onPress={() => this.refs.scroll.scrollTo({ y: scrollHeight, animated: true })} key={index}>
              <View style={{ width: 30, height: 30, borderRadius: 50, margin: 10, backgroundColor: onNumber !== index ? Colors.C8 : Colors.CB, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 16, color: onNumber !== index ? Colors.C3 : Colors.C8 }}>{title}</Text>
              </View>
            </TouchableOpacity>
            )
          })}
        </View>
      </View>
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
module.exports = Reward;
