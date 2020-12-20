import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withThrottledChange } from '../../../HOCs/withThrottledChange';

class ItemPickerSearch extends PureComponent {
    static propTypes = {
        onChangeThrottled: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired,
        search: PropTypes.string,
        isAutoFocus: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

        const { search } = props;

        this.REF_SEARCH = React.createRef();
        this.state = {
            search: search || ''
        };
    }

    componentDidMount() {
        const { isAutoFocus } = this.state;

        if (isAutoFocus) {
            requestAnimationFrame(this.focusInput);
        }
    }

    focusInput = () => {
        if (this.REF_SEARCH.current) {
            this.REF_SEARCH.current.focus();
        }
    }

    onChangeSearch = (e) => {
        const { onChangeThrottled } = this.props;
        const search = e.target.value;

        this.setState({ search });

        onChangeThrottled(search, this.onSearch);
    }

    onSearch = (search) => {
        const { onChange } = this.props;

        onChange(search);
    }

    render() {
        const { placeholder } = this.props;
        const { search } = this.state;

        return (
            <input
                ref={this.REF_SEARCH}
                className='ItemPickerSearch'
                placeholder={placeholder}
                value={search}
                onChange={this.onChangeSearch} />
        );
    }
}

export default withThrottledChange(ItemPickerSearch, 250);
