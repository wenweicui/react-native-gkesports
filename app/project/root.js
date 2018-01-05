import React, {
    Component
} from 'react'
import App from './app'
import {Provider} from 'react-redux';
import store from './redux/store/configStore';

class RootScene extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {store: store};
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <App/>
            </Provider>
        )
    }
}

export default RootScene