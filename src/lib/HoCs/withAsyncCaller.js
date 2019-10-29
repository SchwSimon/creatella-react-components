import React, { PureComponent } from 'react';

const AXIOS = window._baseAxios;

/**
 * api/async request handler
 * @param {Component} Component
 * @returns {Component}
 */
export function withAsyncCaller(Component) {
    return class WithAsyncCaller extends PureComponent {
        constructor(props) {
            super(props);

            this._isMounted = true;
            this.cancelTokenKeyIndex = 0;
            this.cancelTokens = {};
            this.state = {};
        }

        componentWillUnmount() {
            this._isMounted = false;

            Object.keys(this.cancelTokens).forEach(this.cancelTokenByKey);
        }

        onChildUnmount = () => {
            this._isMounted = false;

            Object.keys(this.cancelTokens).forEach(this.cancelTokenByKey);
        }

        cancelTokenByKey = (key) => {
            if (this.cancelTokens[key]) {
                this.cancelTokens[key].cancel();

                delete this.cancelTokens[key];
            }
        }

        generateCancelToken = (isAutoHandling = true) => {
            if (AXIOS) {
                const cancelToken = AXIOS.CancelToken.source();

                if (isAutoHandling) {
                    const cancelTokenKey = `CT${this.cancelTokenKeyIndex++}`;

                    this.cancelTokens[cancelTokenKey] = cancelToken;
                }

                return cancelToken;
            }

            return undefined;
        }

        apiCaller = (func, ...args) => {
            return this.caller(func, ...[...args, this.generateCancelToken()]);
        }

        apiCallerProps = (config, ...args) => {
            this.callerProps(config, ...[...args, this.generateCancelToken()]);
        }

        asyncCaller = (func, ...args) => {
            return this.caller(func, ...args);
        }

        asyncCallerProps = (config, ...args) => {
            this.callerProps(config, ...args);
        }

        caller = async (func, ...args) => {
            if (this._isMounted) {
                const response = await func(...args);

                if (this._isMounted) {
                    return response;
                }
            }

            throw new Error('Component did unmount while async call');
        }

        callerProps = (config, ...args) => {
            const {
                api, responseKey, responseDataKey,
                loadingKey, onSuccess, onError
            } = config;

            const request = async () => {
                let newState = {};
                let response;
                let callback;

                try {
                    response = await api(...args);

                    if (responseKey) {
                        newState[responseKey] = responseDataKey ? response[responseDataKey] : response;
                    }

                    if (onSuccess && this._isMounted) {
                        callback = () => onSuccess(response);
                    }
                }
                catch (err) {
                    response = err;

                    if (onError && this._isMounted) {
                        callback = () => onError(err);
                    }
                }
                finally {
                    if (loadingKey) {
                        newState[loadingKey] = false;
                    }

                    if (this._isMounted) {
                        newState = (responseKey || loadingKey) ? newState : null;

                        this.setState(newState, callback);
                    }
                }
            };

            if (this._isMounted) {
                if (loadingKey) {
                    this.setState({
                        [loadingKey]: true
                    }, request);
                }
                else {
                    request();
                }
            }
        }

        setOwnProps = (props) => {
            if (this._isMounted) {
                this.setState({ ...props });
            }
        }

        render() {
            return (
                <Component
                    {...this.state}
                    {...this.props}
                    onUnmount={this.onChildUnmount}
                    setOwnProps={this.setOwnProps}
                    apiCaller={this.apiCaller}
                    apiCallerProps={this.apiCallerProps}
                    asyncCaller={this.asyncCaller}
                    asyncCallerProps={this.asyncCallerProps}
                    generateCancelToken={this.generateCancelToken} />
            );
        }
    };
}
