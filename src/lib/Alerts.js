import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AlertsCard from './Alerts/components/Card/AlertsCard';
import './Alerts/Alerts.scss';
import { ALERTS_POSITION_ARRAY, ALERT_TYPES_ARRAY } from './Alerts/config';

export { ALERTS_POSITION } from './Alerts/config';

export default class Alerts extends PureComponent {
    static propTypes = {
        position: PropTypes.oneOf(ALERTS_POSITION_ARRAY).isRequired,
        onDismiss: PropTypes.func.isRequired,
        alerts: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                type: PropTypes.oneOf(ALERT_TYPES_ARRAY),
                position: PropTypes.oneOf(ALERTS_POSITION_ARRAY),
                message: PropTypes.any.isRequired
            }).isRequired
        ).isRequired
    }

    renderAlert = ({ id, ...props }) => {
        const { onDismiss, position } = this.props;

        return (
            <AlertsCard
                {...props}
                key={id}
                id={id}
                position={position}
                onDismiss={onDismiss} />
        );
    }

    render() {
        const { alerts, position } = this.props;

        return (
            <div className={`Alerts Alerts--${position}`}>
                {alerts.map(this.renderAlert)}
            </div>
        );
    }
}
