import React, { Component } from 'react';
import {
  Easing,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  ListView,
  Text,
  Image,
  View,
  StyleSheet,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { ifIphoneX } from 'react-native-iphone-x-helper';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = Dimensions.get('window').width;

const seatA = [
  { numSeats: 5},
  { numSeats: 5},
]

const seatB = [
  { numSeats: 4, direction:'left'},
  { numSeats: 4, direction:'right'},
]

const seatC = [
  { numSeats: 5, direction:'left'},
  { numSeats: 5, direction:'right'},
]

const seatD = [
  { numSeats: 4, direction:'left'}
]

const ROWS = 10;
const COLS = 10;
const TIMING = 600;
const TEXT_HEIGHT = 20;
let seats = [];
let seatsAnimation = [];

for (var i = 0; i < ROWS + COLS - 1; i++) {
  seatsAnimation.push(i);
}

Array(ROWS * COLS).join(' ').split(' ').map((_, i) => {
  const currentIndex = i % COLS + Math.floor(i / COLS) % ROWS;
  const currentItem = {
    label: i + 1 < 10 ? '0' + (i + 1) : i + 1,
    s: currentIndex,
    key: i,
    animated: new Animated.Value(1)
  };

  seats.push(currentItem);
});

class Seat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      selectedItems: []
    };

    this.selectionAnimation = new Animated.Value(0);

    this.animatedValue = [];
    seatsAnimation.forEach(value => {
      this.animatedValue[value] = new Animated.Value(0);
    });
  }

  animate = () => {
    const animations = seatsAnimation.map(item => {
      return Animated.timing(this.animatedValue[item], {
        toValue: this.state.finished ? 0 : 1,
        duration: TIMING
      });
    });
    Animated.sequence([
      Animated.stagger(TIMING * 0.15, animations)
    ]).start(() => {
      this.setState({
        finished: !this.state.finished,
        selectedItems: []
      });

      // this.selectionAnimation.setValue(0);
      Animated.timing(this.selectionAnimation, {
        toValue: 0,
        duration: 1000,
        easing: Easing.elastic(1.3)
      }).start();
    });
  };

  renderItem = ({ item }) => {
    const i = item.key;
    const scale = this.animatedValue[item.s].interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1]
    });
    const { selectedItems } = this.state;
    const isSelected = selectedItems.includes(item.key);
    const itemPressScale = item.animated.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1]
    });

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          const selected = isSelected
            ? selectedItems.filter(i => i !== item.key)
            : [...selectedItems, item.key];

          item.animated.setValue(0);
          this.setState(
            {
              selectedItems: selected
            },
            () => {
              Animated.parallel([
                Animated.timing(this.selectionAnimation, {
                  toValue: -TEXT_HEIGHT * selected.length,
                  duration: 500,
                  easing: Easing.elastic(1.3)
                }),
                Animated.timing(item.animated, {
                  toValue: 1,
                  duration: 200
                })
              ]).start();
            }
          );
        }}
        style={{
          opacity: 1 - parseInt(item.s) / 15
        }}>
        <Animated.View
          style={{
            transform: [
              {
                scale: item.animated
              }
            ]
          }}>
          <Animated.View
            style={[
              {
                backgroundColor: isSelected ? '#8EF0E7' : '#3493FF'
              },
              styles.item,
              {
                transform: [
                  {
                    scale
                  }
                ]
              }
            ]}>
            <Animated.Text style={[styles.itemText]}>
              {item.label}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: height * 0.1,
            width: width,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon
              name="arrow-left"
              size={22}
              color="#666"
              style={{ paddingLeft: 15 }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#5e5959' }}>
            预约选座
          </Text>
          <TouchableOpacity onPress={this.animate}>
            <Icon
              name="refresh"
              size={22}
              color="#666"
              backgroundColor="transparent"
              style={{ paddingRight: 15 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex:1,backgroundColor:'#95A5A6',paddingTop:30}}>
          <View style={{width:150,backgroundColor:'#6d8082',alignSelf:"center",alignItems:'center',padding:5}}>
            <Text style={{color:'#fff'}}>屏幕</Text>
          </View>
          <View style={{flexDirection:'row',paddingBottom:50,paddingTop:10}}>
          {seatA.map((seat) => {
                return (
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',paddingHorizontal:20 }}>
                      {Array(seat.numSeats).fill(null).map(() => {
                          return <Image style={styles.icon} source={require('../seat_icon/seat_empty.png')} />;
                      }
                  )}
              </View>
           );
            })
         }
         </View>
         <View style={{flexDirection:'row',paddingBottom:50,justifyContent: 'space-between',paddingHorizontal:20}}>
            <View style={{alignItems:'center'}}>
              <View style={{ width: 30, height: 30, backgroundColor: '#6d8082', margin: 5 }} />
               <View style={{flexDirection:'row'}}>
                 {seatB.map((seat) => {
                       return (
                         <View
                          style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                          >
                             {Array(seat.numSeats).fill(null).map(() => {
                                 return <Image style={[(seat.direction == 'left') ? styles.seatLeft : styles.seatRight,styles.icon]} source={require('../seat_icon/seat_empty.png')} />;
                             })}
                         </View>
                      );
                   })
                }
              </View>
            </View>
            <View style={{flexDirection:'row'}}>
              {seatC.map((seat) => {
                    return (
                      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                          {Array(seat.numSeats).fill(null).map(() => {
                              return <Image style={[(seat.direction == 'left') ? styles.seatLeft : styles.seatRight,styles.icon]} source={require('../seat_icon/seat_taken.png')} />;
                          }
                      )}
                  </View>
               );
                })
             }
           </View>
           <View style={{alignItems:'center',marginRight:20}}>
             <View style={{ width: 30, height: 30, backgroundColor: '#6d8082', margin: 5 }} />
             <View style={{flexDirection:'row'}}>
               {seatD.map((seat) => {
                     return (
                       <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                           {Array(seat.numSeats).fill(null).map(() => {
                               return <Image style={[(seat.direction == 'left') ? styles.seatLeft : styles.seatRight,styles.icon]} source={require('../seat_icon/seat_girl.png')} />;
                           }
                       )}
                   </View>
                );
                 })
              }
            </View>
          </View>
        </View>
       </View>
       <View style={styles.tips}>
         <View style={{flexDirection:'row',alignItems:'center'}}>
           <Image style={styles.iconSm} source={require('../seat_icon/seat_empty.png')} />
           <Text style={{color:'#fff',fontSize:14,paddingLeft:5}}>可选</Text>
         </View>
         <View style={{flexDirection:'row',alignItems:'center'}}>
           <Image style={styles.iconSm} source={require('../seat_icon/seat_choose.png')} />
           <Text style={{color:'#fff',fontSize:14,paddingLeft:5}}>已选</Text>
         </View>
         <View style={{flexDirection:'row',alignItems:'center'}}>
           <Image style={styles.iconSm} source={require('../seat_icon/seat_taken.png')} />
           <Text style={{color:'#fff',fontSize:14,paddingLeft:5}}>已占用</Text>
         </View>
         <View style={{flexDirection:'row',alignItems:'center'}}>
           <Image style={styles.iconSm} source={require('../seat_icon/seat_girl.png')} />
           <Text style={{color:'#fff',fontSize:14,paddingLeft:5}}>美女玩家</Text>
         </View>
       </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            padding:10
          }}>
          <Text style={{fontSize: 18,color:'#5e5959',paddingVertical:10}}>
            已选座位:
          </Text>
          <View
            style={{
              height: TEXT_HEIGHT,
              overflow: 'hidden',
              backgroundColor: 'transparent'
            }}>
            <Animated.View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                transform: [
                  {
                    translateY: this.selectionAnimation
                  }
                ]
              }}>
              {Array(ROWS * COLS + 1).join(' ').split(' ').map((_, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      height: TEXT_HEIGHT,
                      marginRight: 4,
                      alignItems: 'flex-end',
                      justifyContent: 'center'
                    }}>
                    <Text style={{fontSize: 18,color:'#5e5959'}}>
                      {i}
                    </Text>
                  </View>
                );
              })}
            </Animated.View>
          </View>
        </View>
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={{flex:1,backgroundColor:"#52B3D9",paddingVertical:20,alignItems:'center'}}>
            <Text style={{color:'#fff',fontSize:22}}>
              预留时长
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1,backgroundColor:"#f28274",paddingVertical:20,alignItems:'center'}}>
            <Text style={{color:'#fff',fontSize:22}}>
              提交预定
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...ifIphoneX({
           paddingTop: 50
       }, {
           paddingTop: 20
       }),
    backgroundColor: '#fff'
  },
  item: {
    width: width / COLS,
    height: width / COLS,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    color: 'white',
    fontWeight: '700'
  },
  icon: {
    width:30,
    height:30,
  },
  iconSm:{
    width:20,
    height:20,
  },
  seatLeft: {
    marginVertical:5,
    transform: [
        {rotate: '-90deg'}
    ]
  },
  seatRight: {
    marginVertical:5,
    transform: [
        {rotate: '90deg'}
    ]
  },
  tips:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
    backgroundColor:'#95A5A6',
    width:SCREEN_WIDTH,
    padding:10
  },
});

module.exports = Seat;
