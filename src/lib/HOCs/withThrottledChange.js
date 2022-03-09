import React, { PureComponent } from 'react';

/**
 * throttle update handler
 * @param {Component} Component
 * @param {Number} defaultThrottle
 * @returns {Component}
 */
export function withThrottledChange(Component, defaultThrottle = 150) {
    return class WithThrottledChange extends PureComponent {
        constructor(props) {
            super(props);

            this.VALUE = null;
            this.CALLBACK = null;
            this.TIMEOUT = null;
        }

        componentWillUnmount() {
            clearTimeout(this.TIMEOUT);
        }

        onChange = (value, callback, throttle = defaultThrottle) => {
            clearTimeout(this.TIMEOUT);

            this.VALUE = value;
            this.CALLBACK = callback;
            this.TIMEOUT = setTimeout(this.change, throttle);
        }

        change = () => {
            this.CALLBACK(this.VALUE);
        }

        render() {
            return (
                <Component
                    {...this.props}
                    onChangeThrottled={this.onChange} />
            );
        }
    };
}
