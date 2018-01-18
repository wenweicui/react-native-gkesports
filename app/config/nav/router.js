import {StackNavigator} from 'react-navigation';
import * as Modules from '../../project/modules';
import {WebScreen} from '../../project/components/web'
import TabNav from "./TabNavigator";
import {EssayDetailScreen} from "../../project/modules/read";

/**
 * 欢迎页
 * @type {{Splash: {screen: SplashScreen}}}
 */
const Splash = {
    Splash: {
        screen: Modules.ReadScreen
    }
};

/**
 * 首页
 * @type {{Main: {screen: Settings}}}
 */
const Main = {
    Main: {screen: TabNav}
};
/**
 * 其他页面
 * @type {{Web: {screen: WebScreen}}}
 */
const Common = {
    Web: {screen: WebScreen}
};
/**
 * 阅读模块(阅读、问答)
 * @type {{EssayDetail: {screen}}}
 */
const Read = {
    EssayDetail: {screen: EssayDetailScreen}
}
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
        ...Splash,
        ...Main,
        ...Home,
        ...Common,
        ...Read
    }, {
        navigationOptions: {
            header: null,
        }
    }
);

export default Navigator
