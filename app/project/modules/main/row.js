import React, { Component } from "react";
import {
StyleSheet,
View,
TouchableOpacity,
Dimensions,
Image,
Text,
LayoutAnimation,
} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';

const TimerMixin = require('react-timer-mixin');

const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const { width, height } = Dimensions.get('window');

class Row extends Component {

  constructor(props){
    super(props)
    this.doubleTap = this.doubleTap.bind(this);

    this.state={
      isLiked : false,
      lastPress: 0,
      animation:false,
      height: width,
      width: width
    }
  }
  returnDate(timestamp){
    return new Date(timestamp*1000)
  }
  render() {
    let resizeHeight = 0;
    Image.getSize(this.props.data.image.url, (width,height) => {this.setState({width,height})});
    let ratio = this.state.height / this.state.width;
    resizeHeight = ratio * width;

    var minute = 1000 * 60;
  	var hour = minute * 60;
  	var day = hour * 24;
  	var halfamonth = day * 15;
  	var month = day * 30;
    var year = month * 12;
    var nowTime = Math.round(new Date().getTime()/1000)
    var diffValue = nowTime - this.props.data.created_time;
    var timeText;
    if(diffValue < 0){
      timeText = 'null'
    }
    var yearC =diffValue/year;
    var monthC =diffValue/month;
  	var weekC =diffValue/(7*day);
  	var dayC =diffValue/day;
  	var hourC =diffValue/hour;
  	var minC =diffValue/minute;
    if(yearC>=1){
  		timeText="" + parseInt(yearC) + "年前";
  	}
    if(monthC>=1){
  		timeText="" + parseInt(monthC) + "月前";
  	}
  	else if(weekC>=1){
  		timeText="" + parseInt(weekC) + "周前";
  	}
  	else if(dayC>=1){
  		timeText=""+ parseInt(dayC) +"天前";
  	}
  	else if(hourC>=1){
  		timeText=""+ parseInt(hourC) +"小时前";
  	}
  	else if(minC>=1){
  		timeText=""+ parseInt(minC) +"分钟前";
  	} else {
	    timeText="刚刚";
    }

    return(
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Image source={{uri: this.props.data.userUrl.url}}
            style={styles.image}
          />
          <View style={styles.usernameContainer}>
            <Text style={{color:'#5e5959',fontWeight:'500'}}> { this.props.data.user.username } </Text>
          </View>
        </View>
        <TouchableOpacity onPress = { this.doubleTap } activeOpacity ={1}>
          <Image
            style={{height:resizeHeight}}
            resizeMode = 'contain'
            source={{uri: this.props.data.image.url}}
          >
          </Image>
        </TouchableOpacity>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <View style={styles.footer}>
            <View style={styles.likeCount}>
              <Icon name="ios-heart" size={16} color="#5e5959" />
              <Text style={styles.text}> {this.props.data.likes.count} liked </Text>
            </View>
            <View>
              { this.props.data.caption ?
                <View style={styles.captionContainer}>
                  <Text style={styles.captionTextName}> {this.props.data.user.username} </Text>
                  <Text style={styles.captionText}> {this.props.data.caption.text} </Text>
                </View>  : null}
              <TouchableOpacity style={{flex:1}} onPress= { () => alert('go comment')}>
                { this.props.data.comments.count > 0 ? <Text style={styles.commentItem}> { this.props.data.comments.count } more comments </Text> : null}
              </TouchableOpacity>
              <Text style={styles.dateText}> {timeText} </Text>
            </View>
          </View>
          <View style={styles.itemImageContainer}>
            <TouchableOpacity style={styles.like} onPress={() => this.setState({isLiked : !this.state.isLiked})}>
              {!this.state.isLiked ? <Icon name="ios-heart-outline" size={30} color="#5e5959" /> : <Icon name="ios-heart" size={30} color="#D64541" />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.comment} onPress={() => alert('go comment!')}>
              <Icon name="ios-chatbubbles-outline" size={30} color="#5e5959" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.share} onPress={() => alert('Share!!')}>
              <Icon name="ios-redo-outline" size={30} color="#5e5959" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  doubleTap(){
    let delta = new Date().getTime() - this.state.lastPress;
    if(delta < 500){
      //DoubleTap
      this.setState({
        lastPress: new Date().getTime(),
        isLiked:true,
        animation:true,
      });
      LayoutAnimation.easeInEaseOut();
      setTimeout(() => {
        this.setState({animation:false})
      }, 1500)
      return;
    }
    this.setState({
      lastPress: new Date().getTime()
    })
  }
  handleNamePress(){
    alert('its coming')
  }
}

const styles = StyleSheet.create({
  container: {backgroundColor:'white',paddingVertical:10},
  infoContainer : {flexDirection:'row',flex:1,alignSelf:'stretch',paddingBottom:10,paddingLeft:10},
  image: {borderRadius : 20 , width:40 , height:40, marginHorizontal :3 , marginVertical : 3 },
  usernameContainer: {justifyContent:'center',flexDirection:'column'},
  itemImageContainer: {flexDirection:'row', height:40, alignSelf:'stretch'},
  like: {marginHorizontal:5,marginVertical:5,marginLeft:20},
  comment: {marginHorizontal:10,marginVertical:5},
  share: {marginHorizontal:10,marginVertical:5},
  likeCount: {flexDirection:'row',alignItems:'center',marginLeft:2},
  commentItem: {fontSize:12, color:'rgba(0, 0, 0, 0.5)',marginTop:5},
  captionContainer: {marginTop:2 ,flexDirection:'row',alignItems:'center'},
  captionTextName: { fontSize:12,fontWeight:'500', color:"#5e5959" },
  captionText: { fontSize:14,fontWeight:'300',color:"#413e3e" },
  dateText: {fontSize:12, color:'rgba(0, 0, 0, 0.5)',marginTop:5},
  seperator: {height:1,alignSelf:'stretch',marginHorizontal:10,backgroundColor:'rgba(0, 0, 0, 0.2)'},
  hashTag: {fontStyle: 'italic',color:'blue'},
  footer: {marginVertical:10,alignSelf:'stretch',marginHorizontal:15,flexDirection:'column'},
  username: {color:'blue'},
  text: {fontSize:16,color:'#5e5959'},
  likedContainer:{backgroundColor:'transparent',flex:1,justifyContent:'center',alignItems:'center'}
})

export default Row;
