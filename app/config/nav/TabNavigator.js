import React from 'react';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import {TabBarItem} from '../../project/components'
import * as Modules from '../../project/modules';
import * as Asserts from '../../project/assets'

const Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
const scale = width / 375.0;

const TabNav = TabNavigator(
    {
        Work: {
            screen: Modules.HomeScreen,
            navigationOptions: {
                tabBarLabel: '今日',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        showMessage={false}
                        focused={focused}
                        selectedImage={Asserts.Home.work_selected}
                        normalImage={Asserts.Home.work}
                    />
                )
            },
        },
        Contact: {
            screen: Modules.HomeScreen,
            navigationOptions: {
                tabBarLabel: '通讯录',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        showMessage={false}
                        focused={focused}
                        selectedImage={Asserts.Home.contact_selected}
                        normalImage={Asserts.Home.contact}
                    />
                )
            },
        },
        Message: {
            screen: Modules.MessageScreen,
            navigationOptions: {
                tabBarLabel: '消息',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        showMessage={false}
                        focused={focused}
                        selectedImage={Asserts.Home.message_selected}
                        normalImage={Asserts.Home.message}
                    />
                )
            },
        },
        Social: {
            screen: Modules.HomeScreen,
            navigationOptions: {
                tabBarLabel: '圈子',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        showMessage={false}
                        focused={focused}
                        selectedImage={Asserts.Home.social_selected}
                        normalImage={Asserts.Home.social}
                    />
                )
            },
        },
        Me: {
            screen: Modules.MeScreen,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        showMessage={false}
                        focused={focused}
                        selectedImage={Asserts.Home.me_selected}
                        normalImage={Asserts.Home.me}
                    />
                )
            },
        }
    },
    {
        tabBarPosition: 'bottom', // 设置tabBar的位置
        tabBarComponent: TabBarBottom,
        swipeEnabled: true, //是否允许在标签之间进行滑动
        animationEnabled: false, //是否在更改标签时显示动画。
        lazy: true, //懒加载
        tabBarOptions: {
            activeBackgroundColor: 'white',
            activeTintColor: '#03C9A9',
            inactiveBackgroundColor: 'white',
            inactiveTintColor: '#9e9e9e',
            style: {
                height: 55 * scale
            },
            labelStyle: {
                marginBottom: 5 * scale,
                fontSize: 10 * scale,
            }
        },
    }
);

export default TabNav;
