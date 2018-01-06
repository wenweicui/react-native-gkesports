import {StackNavigator} from 'react-navigation';
import * as Modules from '../../project/modules';
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
    Main: {screen: TabNav}
};

const Home = {
    Picture: {screen: Modules.PictureScreen},
    Read: {screen: Modules.ReadScreen},
    Question: {screen: Modules.QuestionScreen},
    Music: {screen: Modules.MusicScreen},
    Video: {screen: Modules.VideoScreen},
    Radio: {screen: Modules.RadioScreen}
};

const Navigator = StackNavigator(
    {
        // ...Splash,
        ...Main,
        ...Home
    }, {
        navigationOptions: {
            header: null,
        }
    }
);

export default Navigator
