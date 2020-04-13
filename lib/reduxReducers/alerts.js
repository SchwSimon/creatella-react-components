export { ALERT_TYPES } from '../Alerts/config';
const ALERTS_PUSH = 'ALERTS_PUSH';
const ALERTS_DISMISS_BY_ID = 'ALERTS_DISMISS_BY_ID';
const ALERTS_DISMISS_ALL = 'ALERTS_DISMISS_ALL';
export function pushAlert(config) {
  return {
    type: ALERTS_PUSH,
    config
  };
}
export function dismissAlert(id) {
  return {
    type: ALERTS_DISMISS_BY_ID,
    id
  };
}
export function dismissAllAlerts() {
  return {
    type: ALERTS_DISMISS_ALL
  };
}
const initialState = {
  alerts: []
};
let INCREMENT_ID = 1;
export default function alerts(state = initialState, action) {
  switch (action.type) {
    case ALERTS_PUSH:
      return { ...state,
        alerts: state.alerts.concat({ ...action.config,
          id: INCREMENT_ID++
        })
      };

    case ALERTS_DISMISS_BY_ID:
      {
        const {
          id
        } = action;

        const filterAlertById = item => item.id !== id;

        return { ...state,
          alerts: state.alerts.filter(filterAlertById)
        };
      }

    case ALERTS_DISMISS_ALL:
      {
        return { ...state,
          alerts: []
        };
      }

    default:
      return state;
  }
}