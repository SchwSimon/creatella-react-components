import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class InputGroup extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.any
    }

    static defaultProps = {
        className: ''
    }

    render() {
        const { className, children, ...props } = this.props;

        return (
            <div
                {...props}
                className={`InputGroup ${className}`}>
                {children}
            </div>
        );
    }
}
