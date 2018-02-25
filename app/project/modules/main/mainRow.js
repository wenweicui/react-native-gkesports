import React, { Component } from "react";
import {
StyleSheet,
View,
TouchableOpacity,
Dimensions,
Image,
Text,
ListView,
LayoutAnimation,
} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');

class MainRow extends Component {

  constructor(props){
    super(props)
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
  _renderTagList(){
    return(
      <View style={{flexDirection:"row",paddingTop:10}}>
        {
          this.props.data.tags.text.map((item,key) => (
            <View key={key} style={{borderWidth:1,borderColor:'#1BBC9B',borderRadius:7,padding:7,marginRight:10}}>
            <Text style={{color:'#1BBC9B',fontSize:16}}> { item } </Text>
            </View>
          )
        )}
      </View>
    )
  }
  render() {
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
          <View style={{flexDirection:'row'}}>
            <Image source={{uri: 'http://www.keytokorean.com/wp-content/uploads/2014/04/Avatar2k5ui.jpg'}}
              style={styles.image}
            />
            <View style={styles.usernameContainer}>
              <Text style={{color:'#5e5959',fontWeight:'500'}}> { this.props.data.user.username } </Text>
            </View>
          </View>
          <Text style={styles.dateText}> {timeText} </Text>
        </View>
        <View style={{paddingHorizontal:5,paddingBottom:10,flex:1}}>
          <Text style={{fontSize:20,color:'#5e5959',fontWeight:'400'}}> { this.props.data.content } </Text>
          {this._renderTagList()}
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <View style={{flex:1}}/>
          <View style={styles.itemImageContainer}>
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
  handleNamePress(){
    alert('its coming')
  }
}

const styles = StyleSheet.create({
  container: {backgroundColor:'white',paddingVertical:10,borderBottomWidth:1,borderBottomColor:'#f1f1f1',marginLeft:15},
  infoContainer : {flexDirection:'row',flex:1,alignSelf:'stretch',paddingBottom:10,paddingRight:15,justifyContent:"space-between"},
  image: {borderRadius : 20 , width:40 , height:40, marginHorizontal :3 , marginVertical : 3 },
  usernameContainer: {justifyContent:'center',flexDirection:'column'},
  itemImageContainer: {flexDirection:'row', height:40, alignSelf:'stretch',paddingRight:15},
  like: {marginHorizontal:5,marginVertical:5,marginLeft:20},
  comment: {marginHorizontal:10,marginVertical:5},
  share: {marginHorizontal:10,marginVertical:5},
  dateText: {fontSize:12, color:'rgba(0, 0, 0, 0.5)',justifyContent:'center',alignSelf:'center'},
  seperator: {height:1,alignSelf:'stretch',marginHorizontal:10,backgroundColor:'rgba(0, 0, 0, 0.2)'},
  hashTag: {fontStyle: 'italic',color:'blue'},
  footer: {marginVertical:10,alignSelf:'stretch',marginHorizontal:15,flexDirection:'column'},
  username: {color:'blue'},
  text: {fontSize:16,color:'#5e5959'},
  likedContainer:{backgroundColor:'transparent',flex:1,justifyContent:'center',alignItems:'center'}
})

export default MainRow;
