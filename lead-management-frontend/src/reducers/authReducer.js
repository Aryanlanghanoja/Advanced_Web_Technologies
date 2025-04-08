import { authConstants } from "../actions/constants";

const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    access: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: null,
};

export const authReducer = (state = initState, action) => {
  // console.log(action);
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    default:
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case authConstants.LOGIN_PASS_ERROR:
      state = {
        ...state,
        message: action.payload.message,
      };
      break;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};
