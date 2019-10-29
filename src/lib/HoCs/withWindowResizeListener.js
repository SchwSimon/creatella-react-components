import React, { PureComponent } from 'react';

/**
 * add windows resize handler to a component
 * @param {Component} Component
 * @param {Number} delay
 * @returns {Component}
 */
export default function withWindowResizeListener(Component, delay = 100) {
    return class WithWindowResizeListener extends PureComponent {
        constructor(props) {
            super(props);

            this.TIMEOUT = null;
            this.state = {
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            };
        }

        componentDidMount() {
            window.addEventListener('resize', this.onWindowResize);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.onWindowResize);

            clearTimeout(this.TIMEOUT);
        }

        onWindowResize = () => {
            clearTimeout(this.TIMEOUT);

            this.TIMEOUT = setTimeout(this.onWindowResizeDone, delay);
        }

        onWindowResizeDone = () => {
            this.setState({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            });
        }

        render() {
            const { windowWidth, windowHeight } = this.state;

            return (
                <Component
                    {...this.props}
                    windowWidth={windowWidth}
                    windowHeight={windowHeight} />
            );
        }
    };
}
