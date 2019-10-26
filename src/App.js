import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BUTTON_CLASSNAMES } from 'config/style';

import ActivityIndicator from 'lib/ActivityIndicator';
import Button from 'lib/Button';
import 'lib/styles.scss';

// import Button from 'creatella-react-components/lib/Button';
// import ActivityIndicator from 'creatella-react-components/lib/ActivityIndicator';

// import 'creatella-react-components/lib/styles.scss';

// Custom App Component Styling
import 'styles/styles.scss';

export default class App extends Component {
    render() {
        return (
            <div className='App App--withHeader'>
                <BrowserRouter>
                    <div className='AppHeader' />

                    <main className='main'>
                        <h1 className='App__h1'>
                            ActivityIndicator
                        </h1>

                        <div className='flex-row flex-ac'>
                            <ActivityIndicator
                                className='App__loading' />

                            <ActivityIndicator
                                className='App__loading'
                                size={15} />

                            <ActivityIndicator
                                className='App__loading'
                                info='This is a info text, going on a bit more.' />
                        </div>

                        <h1 className='App__h1'>
                            Buttons
                        </h1>

                        <div className='flex-row flex-ac'>
                            <Button
                                className='App__button'
                                title='BUTTON TITLE'>
                                Default (with hover title)
                            </Button>

                            <Button
                                className='App__button'
                                isProcessing={true}>
                                Processing
                            </Button>

                            <Button
                                className='App__button'
                                isDisabled={true}>
                                Disabled
                            </Button>

                            <Button
                                className='App__button'
                                route='#'>
                                Route
                            </Button>

                            <Button className={BUTTON_CLASSNAMES.SOLID_GREEN}>
                                Custom solid Green
                            </Button>
                        </div>
                    </main>
                </BrowserRouter>
            </div>
        );
    }
}
