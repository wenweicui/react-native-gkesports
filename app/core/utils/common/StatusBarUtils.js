import {StatusBar} from 'react-native'

export const StatusBarUtil = {
    show: function () {
        StatusBar.setHidden(false, 'none');
        StatusBar.setBarStyle('dark-content', false);
        return this;
    },

    hidden: function () {
        StatusBar.setHidden(true, 'none')
    },

    setBackgroundColor: function (color: string) {
        if (_Android_)
            StatusBar.setBackgroundColor(color, false);
        return this;
    },

    setTranslucent: function () {
        if (_Android_)
            StatusBar.setTranslucent(true);
        return this;
    },
};
