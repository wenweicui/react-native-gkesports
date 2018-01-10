import {NavigationActions} from 'react-navigation'
export const resetNavigation = (navigation, route) => {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: route})
        ]
    });
    (function (options) {
        navigation.dispatch(options)
    }(resetAction))
};

/**
 *
 * @returns {boolean}
 */
let lastClickTime = 0;
export const isFastExecute = () => {
    let timeNow = new Date().getTime();
    if (timeNow - lastClickTime < 1500) {
        return true;
    }
    lastClickTime = timeNow;
    return false;
};
