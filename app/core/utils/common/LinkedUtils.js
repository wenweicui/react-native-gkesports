/**
 * Created by InforeXuan on 2017/5/25.
 */
import {Linking} from 'react-native';

let LinkedUtils = {
    /**
     * 调用系统打电话功能
     * @param telephone
     * @constructor
     */
    Call: function (telephone: String) {
        if (telephone === '') {
            return
        }
        Linking.canOpenURL('tel:' + telephone).then(supported => {
            if (!supported) {
                log('Can\'t handle url: ' + telephone);
            } else {
                return Linking.openURL('tel:' + telephone);
            }
        }).catch(err => log('An error occurred', err));
    },

    /**
     * 调用系统发送邮件功能
     * @param email
     * @constructor
     */
    Email: function (email: String) {
        if (email === '') {
            return
        }
        Linking.canOpenURL('mailto:' + email).then(supported => {
            if (!supported) {
                log('Can\'t handle url: ' + email);
            } else {
                return Linking.openURL('mailto:' + email);
            }
        }).catch(err => log('An error occurred', err));
    },
    /**
     * 调用系统发短信功能（当前IOS系统已经禁止调用短信的scheme的权限）
     * @param sms
     * @constructor
     */
    SMS: function (sms: String) {
        if (sms === '') {
            return
        }
        Linking.canOpenURL('smsto:' + sms).then(supported => {
            if (!supported) {
                log('Can\'t handle url: ' + sms);
            } else {
                return Linking.openURL('smsto:' + sms);
            }
        }).catch(err => log('An error occurred', err));
    },

    /**
     *  调用系统浏览器打开
     * @param url
     * @constructor
     */
    HTTP: function (url: String) {
        if (url === '') {
            return

        }
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => log('An error occurred', err));
    }
};

module.exports = LinkedUtils;