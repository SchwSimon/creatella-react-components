const HELMET_SET = 'HELMET_SET';
const HELMET_RESET = 'HELMET_RESET';
export function setHelmetData(data) {
  return {
    type: HELMET_SET,
    data
  };
}
export function resetHelmet() {
  return {
    type: HELMET_RESET
  };
}
const initialState = {
  description: '',
  title: '',
  image: '',
  extraTags: null
};
export default function helmet(state = initialState, action) {
  switch (action.type) {
    case HELMET_SET:
      return { ...state,
        ...action.data
      };

    case HELMET_RESET:
      return { ...initialState
      };

    default:
      return state;
  }
}