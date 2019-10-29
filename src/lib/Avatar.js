import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import './Avatar/Avatar.scss';

export default class Avatar extends PureComponent {
    static propTypes = {
        src: PropTypes.string,
        icon: PropTypes.object,
        className: PropTypes.string
    }

    static defaultProps = {
        icon: faUserTie,
        className: ''
    }

    render() {
        const { src, icon, className } = this.props;

        return (
            <div
                className={`Avatar ${className}`}
                style={{
                    backgroundImage: `url(${src})`
                }}>
                {!src && (
                    <FontAwesomeIcon icon={icon} />
                )}
            </div>
        );
    }
}
