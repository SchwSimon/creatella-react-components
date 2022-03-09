import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

export default class Avatar extends PureComponent {
    static propTypes = {
        src: PropTypes.string,
        icon: PropTypes.object,
        style: PropTypes.object,
        className: PropTypes.string
    };

    static defaultProps = {
        icon: faUserTie,
        style: {},
        className: ''
    };

    render() {
        const { src, icon, className, style, ...props } = this.props;

        return (
            <div
                {...props}
                className={`Avatar ${className}`}
                style={{
                    ...style,
                    backgroundImage: `url(${src})`
                }}>
                {!src && (
                    <FontAwesomeIcon icon={icon} />
                )}
            </div>
        );
    }
}
