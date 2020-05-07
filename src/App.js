import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BUTTON_CLASSNAMES } from 'config/style';
import ActivityIndicator from 'lib/ActivityIndicator';
import Button from 'lib/Button';
import Rating from 'lib/Rating';
// import Alerts from 'lib/Alerts';
import InputGroup from 'lib/InputGroup';
import Input from 'lib/Input';
import Modal from 'lib/Modal';
import Avatar from 'lib/Avatar';
import CheckBox from 'lib/CheckBox';
import RadioBox from 'lib/RadioBox';
import ItemPicker from 'lib/ItemPicker';
import ItemPickerView from 'lib/ItemPickerView';
import SliderRangePicker from 'lib/SliderRangePicker';
import { fixFloating } from 'lib/utils/fixFloating';
import { currencify } from 'lib/utils/currencify';
import { isMobile } from 'lib/utils/isMobile';
import { formatDuration } from 'lib/utils/formatDuration';
import { ALERTS_POSITION_ARRAY, ALERT_TYPES_ARRAY } from 'lib/Alerts/config';
import 'lib/styles.scss';

const rateSteps = [
    1,
    0.5,
    0.25,
    0.2,
    0.1
];

class App extends Component {
    constructor(props) {
        super(props);

        const itempickerItems8 = [];
        const itempickerItems16 = [];

        for (let i = 0; i < 200; i++) {
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

        itempickerItems8[2].name = 'Tiffany';
        itempickerItems16[2].name = 'Tiffany';
        itempickerItems8[3].name = 'Simon';
        itempickerItems16[3].name = 'Simon';
        itempickerItems8[4].name = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr';
        itempickerItems16[4].name = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr';

        this.state = {
            isModalVisible: false,
            isItemPickerVisible: false,
            checkedId: 1,
            itempickerValue: 1,
            itempickerItemsActiveIds: [1, 3],
            itempickerItems8,
            itempickerItems16,
            isCheckBoxCheck: false,
            nextAlertId: 1,
            isAlertAutoDismiss: true,
            alertPosition: ALERTS_POSITION_ARRAY[0],
            alertType: ALERT_TYPES_ARRAY[0],
            alerts: [],
            sliderRangePicker: [
                {
                    max: 100,
                    min: 0
                },
                50
            ],
            rate: 2.5,
            rateStepIndex: 0
        };
    }

    onToggleItemPicker = () => {
        const { isItemPickerVisible } = this.state;

        this.setState({
            isItemPickerVisible: !isItemPickerVisible
        });
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

    onToggleModal = () => {
        const { isModalVisible } = this.state;

        this.setState({
            isModalVisible: !isModalVisible
        });
    }

    onSliderRangeChange = index => value => {
        const { sliderRangePicker } = this.state;

        this.setState({
            sliderRangePicker: sliderRangePicker.map((item, i) => i === index ? value : item)
        });
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
            isAlertAutoDismiss, isCheckBoxCheck, checkedId, isModalVisible,
            itempickerValue, sliderRangePicker, rate, rateStepIndex
        } = this.state;

        return (
            <div className='App App--withHeader'>
                <BrowserRouter>
                    <div className='AppHeader' />

                    <main className='main'>
                        <h1 className='App__h1'>
                            Buttons
                        </h1>

                        <div className='flex-row flex-ac'>
                            <Button title='BUTTON TITLE'>
                                Default no extra styles
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
                                style={{ padding: 30 }}
                                route='/test'
                                isDisabled={true}
                                onClick={() => window.alert('Ok')}>
                                Internal Route
                            </Button>

                            <Button
                                className='App__button'
                                style={{ padding: 30 }}
                                href='https://www.google.com'
                                isDisabled={true}
                                onClick={() => window.alert('Ok')}>
                                Native Anchor
                            </Button>

                            <Button className={BUTTON_CLASSNAMES.SOLID_GREEN}>
                                Custom solid Green
                            </Button>
                        </div>

                        <div>
                            <InputGroup>
                                <Input placeholder='Test placeholder' />
                                <div style={{
                                    width: 50,
                                    backgroundColor: 'gray'
                                }} />
                            </InputGroup>

                            <Input
                                placeholder='Test placeholder'
                                isDisabled={true}
                                isValid={true} />

                            <Input
                                placeholder='Test placeholder'
                                isReadOnly={true}
                                isInvalid={true} />

                            <Input
                                placeholder='Test placeholder'
                                isValid={true}
                                isTextArea={true} />
                        </div>

                        <Button onClick={this.onToggleModal}>
                            TOGGLE MODAL
                        </Button>

                        <ItemPickerView
                            className='App__ItemPickerView'
                            onClick={this.onToggleItemPicker}
                            onChange={(itempickerValue) => this.setState({ itempickerValue })}
                            // value={itempickerItemsActiveIds}
                            // value={null}
                            value={itempickerValue}
                            items={itempickerItems16} />

                        <h1 className='App__h1'>
                            Avatar
                        </h1>

                        <div className='flex-row flex-ac'>
                            <Avatar className='App__avatar' />

                            <Avatar
                                src='https://factio-eu-production.s3.eu-west-3.amazonaws.com/uploads/71610f93-670b-41c1-b4fb-50aaba565a8f.png'
                                className='App__avatar' />
                        </div>

                        <h1 className='App__h1'>
                            ItemPicker
                        </h1>

                        <div className='flex-row flex-ac'>
                            <ItemPicker
                                items={[]}
                                isVisible={true}
                                onChange={() => {}} />

                            <ItemPicker
                                isProcessing={true}
                                onChange={(ids) => this.setState({ itempickerItemsActiveIds: ids })}
                                isVisible={true}
                                maxSelections={3}
                                value={itempickerItemsActiveIds}
                                items={itempickerItems8} />

                            <ItemPicker
                                onChange={(ids) => this.setState({ itempickerItemsActiveIds: ids })}
                                isVisible={true}
                                renderItemContent={(item) => <CheckBox isChecked={true} label={item.name} />}
                                value={itempickerItemsActiveIds}
                                items={itempickerItems8} />

                            <ItemPicker
                                onClose={this.onToggleItemPicker}
                                onChange={(ids) => this.setState({ itempickerItemsActiveIds: ids })}
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
                                isSwitch={true}
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
                            RadioBox
                        </h1>

                        <div className='flex-row flex-ac'>
                            <RadioBox
                                className='App__radiobox'
                                id={1}
                                label='Some RadioBox label'
                                checkedId={checkedId}
                                onChange={(checkedId) => this.setState({ checkedId })} />

                            <RadioBox
                                className='App__radiobox'
                                id={2}
                                checkedId={checkedId}
                                onChange={(checkedId) => this.setState({ checkedId })} />
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
                        </div>

                        <h1 className='App__h1'>
                            Slider Range Picker
                        </h1>

                        <div className='App__SliderRangePicker'>
                            <SliderRangePicker
                                maxValue={100}
                                minValue={0}
                                step={1}
                                value={sliderRangePicker[0]}
                                onChange={this.onSliderRangeChange(0)} />
                            {sliderRangePicker[0].min}, {sliderRangePicker[0].max}
                            <SliderRangePicker
                                maxValue={100}
                                minValue={0}
                                step={1}
                                value={sliderRangePicker[1]}
                                onChange={this.onSliderRangeChange(1)} />
                            {sliderRangePicker[1]}
                            <SliderRangePicker
                                maxValue={100}
                                minValue={0}
                                step={1}
                                disabled={true}
                                value={{ max: 70, min: 10 }} />
                        </div>

                        <h1 className='App__h1'>
                            Rating
                        </h1>

                        <div className='App__Rating'>
                            <h2 className='App__Rating-title'>Click To Rate</h2>
                            Rate Step : {fixFloating(rateSteps[rateStepIndex])}
                            <br/>
                            <div className='App__Rating-steps'>
                                {rateSteps.map((step, index) => (
                                    <RadioBox
                                        key={index}
                                        className='App__Rating-steps-step'
                                        id={index}
                                        label={step.toString()}
                                        checkedId={rateStepIndex}
                                        onChange={stepIndex => this.setState({ rateStepIndex: stepIndex })} />
                                ))}
                            </div>
                            <br/>
                            <br/>
                            Rate: {fixFloating(rate)}
                            <br/>
                            <br/>
                            <Rating step={rateSteps[rateStepIndex]} onChange={rate => this.setState({ rate })} rate={rate}
                                spacing={2} />
                            <br />
                            <Rating step={rateSteps[rateStepIndex]} onChange={rate => this.setState({ rate })} rate={rate}
                                spacing={2} />
                            <br />
                            <Rating step={rateSteps[rateStepIndex]} onChange={rate => this.setState({ rate })} rate={rate}
                                spacing={5} />
                            <br />
                            <Rating step={rateSteps[rateStepIndex]} onChange={rate => this.setState({ rate })} rate={rate}
                                spacing={10} />
                            <h2 className='App__Rating-title'>Read-Only</h2>
                            <SliderRangePicker
                                maxValue={5}
                                minValue={0}
                                step={0.01}
                                value={rate}
                                onChange={rate => this.setState({ rate })} />
                            <br/>
                            Rate: {fixFloating(rate)}
                            <br/>
                            <br/>
                            <Rating readOnly={true} rate={rate} spacing={2} />
                            <br />
                            <Rating readOnly={true} rate={rate} spacing={2} />
                            <br />
                            <Rating readOnly={true} rate={rate} spacing={5} />
                            <br />
                            <Rating readOnly={true} rate={rate} spacing={10} />
                        </div>

                        <h1 className='App__h1'>
                            Utils
                        </h1>

                        <div className='App__Utils'>
                            <h2>isMobile</h2>
                            <ul>
                                <li>
                                    is this a mobile device: {isMobile ? 'Yes' : 'No'}
                                </li>
                            </ul>
                            <h2>fixFloating</h2>
                            <ul>
                                <li>
                                    100 / 3 = {100 / 3}
                                    <br />
                                    fixFloating(100 / 3) = {fixFloating(100 / 3)}
                                </li>
                            </ul>
                            <h2>currencify</h2>
                            <ul>
                                <li>
                                    $(100 / 3) = ${100 / 3}
                                    <br />
                                    currencify(100 / 3, false, "$") = {currencify(100 / 3, false, '$')}
                                </li>
                                <li>
                                    $(100 / 3) = ${100 / 3}
                                    <br />
                                    currencify(100 / 3, true, "$") = {currencify(100 / 3, true, '$')}
                                </li>
                                <li>
                                    $(-100 / 3) = ${-100 / 3}
                                    <br />
                                    currencify(-100 / 3, false, "$") = {currencify(-100 / 3, false, '$')}
                                </li>
                                <li>
                                    $(5) = ${5}
                                    <br />
                                    currencify(5, false, "$") = {currencify(5, false, '$')}
                                </li>
                                <li>
                                    $(5.6) = ${5.6}
                                    <br />
                                    currencify(5.6, false, "$") = {currencify(5.6, false, '$')}
                                </li>
                            </ul>
                            <h2>formatDuration</h2>
                            <ul>
                                <li>
                                    formatDuration(2 * 24 + 3600 * 2 + 3 * 60 + 12)
                                    <br />
                                    {JSON.stringify(
                                        formatDuration(2 * 24 + 3600 * 2 + 3 * 60 + 12)
                                    )}
                                </li>
                                <li>
                                    formatDuration(2 * 24 + 3600 * 2 + 3 * 60 + 12, true)
                                    <br />
                                    {JSON.stringify(
                                        formatDuration(2 * 24 + 3600 * 2 + 3 * 60 + 12, true)
                                    )}
                                </li>
                                <li>
                                    formatDuration(2 * 24 + 3600 * 2 + 3 * 60 + 12, false, ['days'])
                                    <br />
                                    {JSON.stringify(
                                        formatDuration(2 * 24 + 3600 * 2 + 3 * 60 + 12, false, ['days'])
                                    )}
                                </li>
                                <li>
                                    formatDuration(2 * 24 + 3600 * 2 + 3 * 60 + 12, false, ['days', 'seconds'])
                                    <br />
                                    {JSON.stringify(
                                        formatDuration(2 * 24 + 3600 * 2 + 3 * 60 + 12, false, ['days', 'seconds'])
                                    )}
                                </li>
                            </ul>
                        </div>
                    </main>

                    <Modal
                        isVisible={isModalVisible}
                        onClose={this.onToggleModal}>
                        AAAA
                    </Modal>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
