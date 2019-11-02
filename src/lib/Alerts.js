import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { dismissAlert } from './reduxReducers/alerts';
import AlertsCard from './Alerts/components/Card/AlertsCard';
import { ALERTS_POSITION_ARRAY, ALERT_TYPES_ARRAY } from './Alerts/config';

export { ALERTS_POSITION } from './Alerts/config';

class Alerts extends PureComponent {
    static propTypes = {
        position: PropTypes.oneOf(ALERTS_POSITION_ARRAY).isRequired,
        dismissAlert: PropTypes.func.isRequired,
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
        const { dismissAlert, position } = this.props;

        return (
            <AlertsCard
                {...props}
                key={id}
                id={id}
                position={position}
                onDismiss={dismissAlert} />
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

function mapStateToProps({ alerts }) {
    return {
        ...alerts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dismissAlert: (id) => {
            dispatch(dismissAlert(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
