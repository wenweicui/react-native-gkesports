import {NavigationActions} from 'react-navigation'

export let CommonUtils = {
    /**
     * 清除Navigation栈
     * @param navigation
     * @param route
     */
    resetNavigation: function (navigation, route) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: route})
            ]
        });
        (function (options) {
            navigation.dispatch(options)
        }(resetAction))
    }
};
