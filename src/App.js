import React, { Component } from 'react';
// import ActivityIndicator from './lib/ActivityIndicator';
import ActivityIndicator from 'creatella-react-components/lib/ActivityIndicator';
// import './lib/styles.scss';
import 'creatella-react-components/lib/styles.scss';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <ActivityIndicator />

                <ActivityIndicator
                    info='This is a info text, going on a bit more.' />
            </div>
        );
    }
}
