import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from '../../../Button';
import { ALERT_TYPES } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle, faExclamationTriangle, faTimes,
    faExclamationCircle, faTimesCircle, faThumbtack
} from '@fortawesome/free-solid-svg-icons';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';

export default class AlertsCard extends PureComponent {
    static propTypes = {
        id: PropTypes.number.isRequired,
        message: PropTypes.any.isRequired,
        type: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        onDismiss: PropTypes.func.isRequired,
        renderTimeDisplay: PropTypes.func,
        isAutoDismiss: PropTypes.bool,
        animationDuration: PropTypes.number,
        dismissDuration: PropTypes.number
    };

    static defaultProps = {
        isAutoDismiss: true,
        animationDuration: 500,
        dismissDuration: 4000
    }

    constructor(props) {
        super(props);

        const { type, dismissDuration, renderTimeDisplay } = props;
        let icon;

        switch (type) {
            case ALERT_TYPES.INFO:
                icon = faExclamationCircle;
                break;

            case ALERT_TYPES.SUCCESS:
                icon = faCheckCircle;
                break;

            case ALERT_TYPES.WARNING:
                icon = faExclamationTriangle;
                break;

            case ALERT_TYPES.ERROR:
                icon = faTimesCircle;
                break;

            default:
                break;
        }

        this.dismissCountdown = dismissDuration;
        this.updateInterval = null;
        this.state = {
            dismissTimeoutStartDate: null,
            dismissTimeout: null,
            dismissedTimeout: null,
            timestamp: new Date(),
            timeDisplay: renderTimeDisplay ? renderTimeDisplay() : 'just now',
            icon
        };
    }

    componentDidMount() {
        this.startTimeout = setTimeout(this.requestAnimationFrame, 50);
        this.updateInterval = setInterval(this.onUpdateTime, 60000);
    }

    componentWillUnmount() {
        const { startTimeout, updateInterval } = this;
        const { dismissTimeout, dismissedTimeout } = this.state;

        clearTimeout(startTimeout);
        clearTimeout(dismissTimeout);
        clearTimeout(dismissedTimeout);
        clearInterval(updateInterval);
    }

    requestAnimationFrame = () => {
        requestAnimationFrame(this.startDismiss);
    }

    startDismiss = () => {
        const { isAutoDismiss } = this.props;

        this.setState({
            dismissTimeoutStartDate: Date.now(),
            dismissTimeout: isAutoDismiss ? setTimeout(this.onDismiss, this.dismissCountdown) : null
        });
    }

    onMouseEnter = () => {
        const { dismissTimeoutStartDate, dismissTimeout } = this.state;

        clearTimeout(dismissTimeout);

        this.dismissCountdown = this.dismissCountdown - (Date.now() - dismissTimeoutStartDate);
        this.setState({
            dismissTimeout: null
        });
    }

    onMouseLeave = () => {
        this.setState({
            dismissTimeoutStartDate: new Date(),
            dismissTimeout: setTimeout(this.onDismiss, this.dismissCountdown)
        });
    }

    onPin = () => {
        const { dismissTimeout } = this.state;

        clearTimeout(dismissTimeout);

        this.setState({
            dismissTimeout: null,
            isPinned: true
        });
    }

    onUpdateTime = () => {
        const { renderTimeDisplay } = this.props;
        const { timestamp } = this.state;

        this.setState({
            timeDisplay: renderTimeDisplay
                ? renderTimeDisplay(timestamp)
                : formatDistanceStrict(timestamp, new Date(), { addSuffix: true })
        });
    }

    onDismiss = () => {
        const { animationDuration } = this.props;

        this.setState({
            dismissedTimeout: setTimeout(this.onDismissFinal, animationDuration)
        });
    }

    onDismissFinal = () => {
        const { id, onDismiss } = this.props;

        onDismiss(id);
    }

    render() {
        const {
            position, type, message,
            isAutoDismiss, dismissDuration, animationDuration
        } = this.props;
        const {
            icon, dismissTimeout, dismissTimeoutStartDate,
            isPinned, timeDisplay, dismissedTimeout
        } = this.state;
        const isMouseHandlers = isAutoDismiss && !isPinned;

        return (
            <div
                className={`AlertsCard AlertsCard--${type} AlertsCard--${position} ${dismissTimeoutStartDate && !dismissedTimeout ? `AlertsCard--${position}-init` : ''}`}
                onMouseEnter={isMouseHandlers ? this.onMouseEnter : null}
                onMouseLeave={isMouseHandlers ? this.onMouseLeave : null}
                style={{
                    transitionDuration: `${animationDuration}ms`
                }}>
                <div className='AlertsCard__header'>
                    <div className='AlertsCard__header-left'>
                        <FontAwesomeIcon icon={icon} />
                    </div>

                    <div className='AlertsCard__header-right'>
                        <time className='AlertsCard__header-right-time'>
                            {timeDisplay}
                        </time>

                        {isMouseHandlers && (
                            <Button
                                className='AlertsCard__header-right-button'
                                onClick={this.onPin}>
                                <FontAwesomeIcon icon={faThumbtack} />
                            </Button>
                        )}

                        <Button
                            className='AlertsCard__header-right-button'
                            onClick={this.onDismiss}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </div>
                </div>

                <div className='AlertsCard__body'>
                    {isAutoDismiss && (
                        <div className='AlertsCard__body-countdown'>
                            <div
                                className={`AlertsCard__body-countdown-bar AlertsCard__body-countdown-bar--${type} ${isPinned ? 'AlertsCard__body-countdown-bar--pinned' : ''}`}
                                style={{
                                    animationDuration: `${dismissDuration}ms`,
                                    animationPlayState: !dismissTimeout ? 'paused' : 'running'
                                }} />
                        </div>
                    )}

                    {message}
                </div>
            </div>
        );
    }
}
