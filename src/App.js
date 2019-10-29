import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BUTTON_CLASSNAMES } from 'config/style';
import ActivityIndicator from 'lib/ActivityIndicator';
import Button from 'lib/Button';
import Alerts from 'lib/Alerts';
import CheckBox from 'lib/CheckBox';
import ItemPicker from 'lib/ItemPicker';
import { ALERTS_POSITION_ARRAY, ALERT_TYPES_ARRAY } from 'lib/Alerts/config';
import 'lib/styles.scss';

// import Button from 'creatella-react-components/lib/Button';
// import ActivityIndicator from 'creatella-react-components/lib/ActivityIndicator';
// import 'creatella-react-components/lib/styles.scss';

// Custom App Component Styling
import 'styles/styles.scss';

export default class App extends Component {
    constructor(props) {
        super(props);

        const itempickerItems8 = [];
        const itempickerItems16 = [];

        for (let i = 0; i < 16; i++) {
            if (i < 8) {
                itempickerItems8[i] = {
                    id: i + 1,
                    name: `Item ${i + 1}`
                };
            }

            itempickerItems16[i] = {
                id: i + 1,
                name: `Item ${i + 1}`
            };
        }

        itempickerItems8[4].name = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr';
        itempickerItems16[4].name = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr';

        this.state = {
            itempickerItemsActiveIds: [1, 3],
            itempickerItems8,
            itempickerItems16,
            isCheckBoxCheck: false,
            nextAlertId: 1,
            isAlertAutoDismiss: true,
            alertPosition: ALERTS_POSITION_ARRAY[0],
            alertType: ALERT_TYPES_ARRAY[0],
            alerts: []
        };
    }

    onAddAlert = () => {
        this.setState((prevState) => ({
            nextAlertId: prevState.nextAlertId + 1,
            alerts: prevState.alerts.concat({
                id: prevState.nextAlertId,
                type: prevState.alertType,
                message: (
                    <div>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt
                    </div>
                ),
                isAutoDismiss: prevState.isAlertAutoDismiss
            })
        }));
    }

    onRemoveAlert = (id) => {
        this.setState((prevState) => ({
            alerts: prevState.alerts.filter((item) => item.id !== id)
        }));
    }

    renderOption = (value, index) => {
        return (
            <option key={index} value={value}>
                {value}
            </option>
        );
    }

    render() {
        const {
            itempickerItems8, itempickerItems16, itempickerItemsActiveIds,
            alerts, alertPosition, isAlertAutoDismiss, isCheckBoxCheck
        } = this.state;

        return (
            <div className='App App--withHeader'>
                <BrowserRouter>
                    <div className='AppHeader' />

                    <main className='main'>
                        <h1 className='App__h1'>
                            ItemPicker
                        </h1>

                        <div className='flex-row flex-ac'>
                            <ItemPicker
                                onChange={() => {}}
                                isVisible={true} />

                            <ItemPicker
                                onChange={(ids) => this.setState({itempickerItemsActiveIds: ids})}
                                isVisible={true}
                                maxSelections={3}
                                value={itempickerItemsActiveIds}
                                items={itempickerItems8} />

                            <ItemPicker
                                onChange={(ids) => this.setState({itempickerItemsActiveIds: ids})}
                                isVisible={true}
                                renderItemContent={(item) => <CheckBox isChecked={true} label={item.name} />}
                                value={itempickerItemsActiveIds}
                                items={itempickerItems8} />

                            <ItemPicker
                                onChange={(ids) => this.setState({itempickerItemsActiveIds: ids})}
                                isVisible={true}
                                value={itempickerItemsActiveIds}
                                items={itempickerItems16} />
                        </div>

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

                        <h1 className='App__h1'>
                            CheckBox
                        </h1>

                        <div className='flex-row flex-ac'>
                            <CheckBox
                                className='App__checkbox'
                                label='Some checkbox label'
                                value={111}
                                isChecked={isCheckBoxCheck}
                                onChange={(isChecked, value) => this.setState({ isCheckBoxCheck: !isChecked })} />

                            <CheckBox
                                className='App__checkbox'
                                isChecked={isCheckBoxCheck}
                                onChange={(isChecked) => this.setState({ isCheckBoxCheck: !isChecked })} />

                            <CheckBox
                                className='App__checkbox'
                                isChecked={isCheckBoxCheck}
                                onChange={(isChecked) => this.setState({ isCheckBoxCheck: !isChecked })}>
                                with children
                            </CheckBox>
                        </div>

                        <h1 className='App__h1'>
                            Alerts
                        </h1>

                        <div className='flex-row flex-ac'>
                            <Button
                                className='App__button'
                                onClick={this.onAddAlert}>
                                Alert
                            </Button>

                            <select onChange={(e) => this.setState({ alertPosition: e.target.value })}>
                                {ALERTS_POSITION_ARRAY.map(this.renderOption)}
                            </select>

                            <select onChange={(e) => this.setState({ alertType: e.target.value })}>
                                {ALERT_TYPES_ARRAY.map(this.renderOption)}
                            </select>

                            <input
                                type='checkbox'
                                checked={isAlertAutoDismiss}
                                onChange={(e) => this.setState({ isAlertAutoDismiss: !isAlertAutoDismiss })} />

                            <Alerts
                                position={alertPosition}
                                onDismiss={this.onRemoveAlert}
                                alerts={alerts} />
                        </div>
                    </main>
                </BrowserRouter>
            </div>
        );
    }
}
