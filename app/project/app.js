import React, {Component} from 'react';
import Navigation from '../config/nav/router'

class App extends Component {

    render() {
        return (
            <Navigation ref={(navigation) => {
                this._navigation = navigation
            }}/>
        );
    }
}

export default App;