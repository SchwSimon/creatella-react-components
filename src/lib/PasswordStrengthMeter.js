import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class PasswordStrengthMeter extends Component {
    static propTypes = {
        password: PropTypes.string.isRequired,
        zxcvbn: PropTypes.func,
        onChangeScore: PropTypes.func,
        className: PropTypes.string
    };

    static defaultProps = {
        className: ''
    };

    constructor(props) {
        super(props);

        const { zxcvbn } = props;

        this.zxcvbn = zxcvbn;
        this.state = {
            score: 0
        };
    }

    componentDidMount() {
        if (!this.zxcvbn) {
            this.loadModule();
        } else {
            this.setPasswordScore();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { password } = this.props;
        const { score } = this.state;

        if (this.zxcvbn && (
            password !== nextProps.password ||
            score !== nextState.score)) {
            return true;
        }

        return false;
    }

    componentDidUpdate(prevProps) {
        const { password } = this.props;

        if (password !== prevProps.password) {
            this.setPasswordScore();
        }
    }

    // asynchronously load "zxcvbn" because it's a huge package
    loadModule = async () => {
        const zxcvbn = await import('zxcvbn');

        this.zxcvbn = zxcvbn.default;

        this.setPasswordScore();
    };

    setPasswordScore = () => {
        const { password } = this.props;

        this.setState({
            score: this.zxcvbn(password).score
        }, this.onUpdatedScore);
    };

    onUpdatedScore = () => {
        const { onChangeScore } = this.props;
        const { score } = this.state;

        if (onChangeScore) {
            onChangeScore(score);
        }
    };

    render() {
        const { className } = this.props;
        const { score } = this.state;

        return (
            <div className={`PasswordStrengthMeter ${className}`}>
                <div className={`PasswordStrengthMeter-bar PasswordStrengthMeter-bar--${score}`} />
            </div>
        );
    }
}
