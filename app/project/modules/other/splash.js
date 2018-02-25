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
        this.header = 'none'
        this.state = {
            progress: 0
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            if (this.state.progress === 1) {
                clearInterval(this.timer);
                setTimeout(() => {
                    let toHome = NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'Main'})]
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
        let height = Dimensions.get('window').height;
        return (
            <View style={styles.container}>
                <View>
                    <Image style={[styles.image, {width,height}]} source={require('../../assets/images/splash.png')}/>
                </View>
                <ProgressBar
                    color={'#000'}
                    style={styles.progress}
                    progress={this.state.progress} width={320}/>
            </View>
        )
    }
}

const styles = Utils.PLStyle({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        resizeMode: 'contain',
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
        position: 'absolute',
        bottom:35,
        alignSelf: 'center',
        backgroundColor: '#fff'
    }
});
