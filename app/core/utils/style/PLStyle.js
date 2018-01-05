/**
 *
 * 使用方法
 *  var StyleSheet = require('StyleSheet')
 *
 *  const styles = StyleSheet.create({
 *  example:{
 *     textSize:12,
 *     //ios 样式
 *     ios:{
 *        color:'#F123411',
 *
 *     },
 *     //android 样式
 *     android:{
 *      color:'#F22222',
 *     }
 *  }
 *  ]);
 *
 */


'use strict';
import {StyleSheet, Platform} from 'react-native';

import {resize2Dp} from './StyleUtils'

/**
 * 主要是平台适配以及scale适配。
 * @param styles
 * @returns {platformStyles}
 */
export const PLStyle = (styles: Object): { [name: string]: number } => {
    const platformStyles = {};
    resize2Dp(styles);
    Object.keys(styles).forEach((name) => {
        // console.log(name);
        let {ios, android, ...style} = {...styles[name]};
        if (ios && Platform.OS === 'ios') {
            style = {...style, ...ios};
        }
        if (android && Platform.OS === 'android') {
            style = {...style, ...android};
        }
        platformStyles[name] = style;
    });
    return StyleSheet.create(platformStyles);
};
