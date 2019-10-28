const PUSH_ALERT = 'PUSH_ALERT';
const DISMISS_ALERT = 'DISMISS_ALERT';

export function pushAlert(config) {
    return {
        type: PUSH_ALERT,
        config
    };
}

export function dismissAlert(id) {
    return {
        type: DISMISS_ALERT,
        id
    };
}

const initialState = {
    alerts: []
};

let INCREMENT_ID = 1;

export default function alerts(state = initialState, action) {
    switch (action.type) {
        case PUSH_ALERT:
            return {
                ...state,
                alerts: state.alerts.concat({
                    ...action.config,
                    id: INCREMENT_ID++
                })
            };

        case DISMISS_ALERT: {
            const { id } = action;
            const filterAlertById = (item) => item.id !== id;

            return {
                ...state,
                alerts: state.alerts.filter(filterAlertById)
            };
        }

        default:
            return state;
    }
}
