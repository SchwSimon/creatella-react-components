import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './ActivityIndicator/ActivityIndicator.scss';

export default class ActivityIndicator extends PureComponent {
    static propTypes = {
        size: PropTypes.number,
        className: PropTypes.string,
        classNameInfo: PropTypes.string,
        info: PropTypes.string
    }

    static defaultProps = {
        size: 24,
        className: '',
        classNameInfo: '',
        info: ''
    }

    render() {
        const { className, classNameInfo, size, info } = this.props;

        return (
            <span className={`ActivityIndicator ${className}`}>
                <svg
                    className='ActivityIndicator__spinner'
                    aria-label={info || 'loading'}
                    width={`${size}px`}
                    height={`${size}px`}
                    viewBox='0 0 66 66'
                    xmlns='http://www.w3.org/2000/svg'>
                    <circle
                        className='ActivityIndicator__spinner-path'
                        fill='none'
                        strokeWidth='6'
                        strokeLinecap='round'
                        cx='33'
                        cy='33'
                        r='30' />
                </svg>

                {info && (
                    <div className={`ActivityIndicator__info ${classNameInfo}`}>
                        {info}
                    </div>
                )}
            </span>
        );
    }
}
