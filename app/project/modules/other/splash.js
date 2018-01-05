import React from 'react';
import {
    Image,
    View,
    Text,
    Dimensions,
} from 'react-native';
import {ProgressBar} from '../../components';
import {NavigationActions} from 'react-navigation';
import * as Utils from '../../../core/utils'
import {WrapScreen} from "../wrap";

let timeFrame = 500;

export class SplashScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        }
    }

    componentDidMount() {
        this.hideStatusBar();
        this.timer = setInterval(() => {
            if (this.state.progress === 1) {
                clearInterval(this.timer);
                setTimeout(() => {
                    this.showStatusBar('transparent');
                    let toHome = NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'Home'})]
                    });
                    this.props.navigation.dispatch(toHome)
                }, timeFrame);
            } else {
                let random = Math.random() * 0.5;
                let progress = this.state.progress + random;
                if (progress > 1) {
                    progress = 1;
                }
                this.setState({progress});
            }
        }, timeFrame)
    }

    render() {
        let width = Dimensions.get('window').width;
        return (
            <View style={styles.container}>
                <View>
                    <Image style={[styles.image, {width}]} source={require('../../assets/images/splashBack.png')}/>
                    <View style={styles.text}>
                        <Text style={styles.hero}>中联</Text>
                        <Text style={styles.appName}>污水治不理</Text>
                    </View>
                </View>
                <ProgressBar
                    color={'#ffffff'}
                    style={styles.progress}
                    progress={this.state.progress} width={320}/>
            </View>
        )
    }
}

const styles = Utils.PLStyle({
    container: {
        justifyContent: 'space-between',
        flex: 1
    },
    image: {
        resizeMode: 'cover',
        height: 430,
    },
    text: {
        alignItems: 'center'
    },
    hero: {
        fontSize: 37,
    },
    appName: {
        fontSize: 62,
    },
    progress: {
        alignSelf: 'center',
        marginBottom: 35,
        backgroundColor: '#e5e5e5'
    }
});