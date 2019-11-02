const ALERTS_PUSH = 'ALERTS_PUSH';
const ALERTS_DISMISS = 'ALERTS_DISMISS';
export function pushAlert(config) {
  return {
    type: ALERTS_PUSH,
    config
  };
}
export function dismissAlert(id) {
  return {
    type: ALERTS_DISMISS,
    id
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

    case ALERTS_DISMISS:
      {
        const {
          id
        } = action;

        const filterAlertById = item => item.id !== id;

        return { ...state,
          alerts: state.alerts.filter(filterAlertById)
        };
      }

    default:
      return state;
  }
}