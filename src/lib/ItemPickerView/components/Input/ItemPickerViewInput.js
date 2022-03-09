import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Fuse from 'fuse.js';
import ItemPickerViewItem from '../Item/ItemPickerViewItem';
import OutsideClick from '../../../OutsideClick';

export default class ItemPickerViewInput extends PureComponent {
    static propTypes = {
        setFocusInputFunc: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired,
        placeholderInput: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        itemsSelected: PropTypes.array.isRequired,
        itemsNameKey: PropTypes.string.isRequired,
        itemsSearchConfig: PropTypes.object,
        onSubmit: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
        onChangeInput: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.REF_INPUT = React.createRef();
        this.state = {
            isMatchVisible: false,
            match: null,
            matchPosX: 0,
            matchPosY: 0,
            value: ''
        };
    }

    componentDidMount() {
        const { setFocusInputFunc } = this.props;

        setFocusInputFunc(this.focusInput);
        requestAnimationFrame(this.focusInput);
    }

    focusInput = (length) => {
        if (this.REF_INPUT.current) {
            if (length) {
                this.REF_INPUT.current.selectionStart = length;
                this.REF_INPUT.current.selectionEnd = length;
            }

            this.REF_INPUT.current.focus();
        }
    };

    blurInput = () => {
        if (this.REF_INPUT.current) {
            this.REF_INPUT.current.blur();
        }
    };

    onChangeValue = (e) => {
        const { onChangeInput } = this.props;
        const value = e.target.value;
        const nextState = { value };

        if (!value) {
            nextState.isMatchVisible = false;
            nextState.match = null;
        }

        this.setState(nextState);

        onChangeInput && onChangeInput(value);
    };

    onKeyUp = (e) => {
        const {
            onSubmit, onRemove, itemsSelected,
            itemsNameKey, items, itemsSearchConfig
        } = this.props;
        const { value } = this.state;

        if (e.key === 'Backspace' && !value && itemsSelected.length) {
            const item = itemsSelected[itemsSelected.length - 1];
            const value = item[itemsNameKey];

            this.blurInput();

            this.setState({ value, match: item, isMatchVisible: true });

            onRemove(item);

            requestAnimationFrame(() => {
                this.focusInput(value.length);
            });
        } else if (value) {
            const fuseConfig = itemsSearchConfig || { keys: [itemsNameKey] };
            const fuse = new Fuse(items, fuseConfig);
            const results = fuse.search(value);
            const matchItem = results.length && results[0].item;
            const { top, left } = this.REF_INPUT.current.getBoundingClientRect();
            const nextState = {
                isMatchVisible: true,
                match: matchItem,
                matchPosX: left,
                matchPosY: top
            };

            if (e.key === 'Enter' && matchItem && onSubmit(matchItem)) {
                nextState.value = '';
                nextState.match = null;
            }

            this.setState(nextState);
        }
    };

    onSelectMatch = () => {
        const { onSubmit } = this.props;
        const { match } = this.state;

        onSubmit(match);

        this.setState({
            isMatchVisible: false,
            match: null,
            value: ''
        });
    };

    onShowMatch = () => {
        const { match } = this.state;
        const { top, left } = this.REF_INPUT.current.getBoundingClientRect();

        this.setState({
            isMatchVisible: !!match,
            matchPosX: left,
            matchPosY: top
        });
    };

    onHideMatch = () => {
        this.setState({ isMatchVisible: false });
    };

    render() {
        const { placeholder, placeholderInput, itemsSelected } = this.props;
        const { value, isMatchVisible, match, matchPosX, matchPosY } = this.state;

        return (
            <div className='ItemPickerViewInput'>
                <input
                    ref={this.REF_INPUT}
                    className='ItemPickerViewInput__input'
                    placeholder={!itemsSelected.length ? placeholder : placeholderInput}
                    value={value}
                    onFocus={this.onShowMatch}
                    onKeyUp={this.onKeyUp}
                    onChange={this.onChangeValue} />

                {(isMatchVisible && !!match) && (
                    <OutsideClick
                        className='ItemPickerViewInput__match'
                        style={{
                            left: matchPosX - 5,
                            top: matchPosY + 20
                        }}
                        onOutsideClick={this.onHideMatch}>
                        <ItemPickerViewItem onClick={this.onSelectMatch}>
                            {match.name}
                        </ItemPickerViewItem>
                    </OutsideClick>
                )}
            </div>
        );
    }
}
