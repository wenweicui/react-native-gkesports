import {StackNavigator} from 'react-navigation';
import * as Modules from '../../project/modules';
import {WebScreen} from '../../project/components/web'
import TabNav from "./TabNavigator";

/**
 * 欢迎页
 * @type {{Splash: {screen: SplashScreen}}}
 */
const Splash = {
    Splash: {
        screen: Modules.SplashScreen
    }
};

/**
 * 首页
 * @type {{Main: {screen: Settings}}}
 */
const Main = {
    Main: {screen: TabNav},
    Chat: {screen: Modules.ChatScreen},
    NearBy: {screen: Modules.NearBy},
    Scan: {screen: Modules.Scan},
    Reward: {screen: Modules.Reward}
};

const Common = {
    Web: {screen: WebScreen}
};

const Navigator = StackNavigator(
    {
        ...Splash,
        ...Main,
        ...Common,
    }, {
        navigationOptions: {
            header: null,
        }
    }
);

export default Navigator
