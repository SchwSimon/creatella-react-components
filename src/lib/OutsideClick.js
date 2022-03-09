import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

// NOTE: Careful when using non-instant event's like "click"
// If a component removes the clicked node before the click event triggers,
// it will count as an outside click!
export default class OutsideClick extends PureComponent {
    static propTypes = {
        children: PropTypes.any.isRequired,
        onOutsideClick: PropTypes.func,
        event: PropTypes.string
    };

    static defaultProps = {
        event: 'mousedown'
    };

    constructor(props) {
        super(props);

        this.REF = React.createRef();
        this.EVENT = props.event;
    }

    componentDidMount() {
        const { onOutsideClick } = this.props;

        if (onOutsideClick) {
            document.addEventListener(this.EVENT, this.onOutsideClick);
        }
    }

    componentDidUpdate(prevProps) {
        const { onOutsideClick } = this.props;

        if (prevProps.onOutsideClick !== onOutsideClick) {
            document.removeEventListener(this.EVENT, this.onOutsideClick);

            if (onOutsideClick) {
                document.addEventListener(this.EVENT, this.onOutsideClick);
            }
        }
    }

    componentWillUnmount() {
        document.removeEventListener(this.EVENT, this.onOutsideClick);
    }

    onOutsideClick = (e) => {
        const { onOutsideClick } = this.props;

        if (!this.REF.current.contains(e.target)) {
            onOutsideClick();
        }
    };

    render() {
        const { onOutsideClick, children, event, ...props } = this.props;

        return (
            <div {...props} ref={this.REF}>
                {children}
            </div>
        );
    }
}
