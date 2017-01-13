import { ActionConst } from 'react-native-router-flux';

const initialState = {
  scene: {},
  routeData: {},
};


// Action Handlers
const actionsMap = {
  [ActionConst.REFRESH]: (state, action) => ({ ...state, scene: action.scene }),
  [ActionConst.FOCUS]: (state, action) => ({ ...state, scene: action.scene }),
  [ActionConst.JUMP]: (state, action) => ({
    ...state,
    scene: action.scene,
    routeData: { ...action }
  }),
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
