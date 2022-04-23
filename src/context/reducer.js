import actions from "./actions.js";

export const initialState = {
  is_connected: false,
  account: "",
  provider: null,
  network_name: null,
  chain_id: null,
  loading: false,
  currentProfile: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.LOGIN_WALLET:
      window.localStorage.setItem("shouldConnectMetamask", "true");
      return {
        ...state,
        is_connected: true,
        account: action.payload.account,
        provider: action.payload.provider,
        network_name: action.payload.network_name,
        chain_id: action.payload.chain_id,
      };

    case actions.LOGOUT_WALLET:
      window.localStorage.removeItem("shouldConnectMetamask");
      return {
        ...state,
        is_connected: false,
        account: "",
        provider: null,
        network_name: null,
        chain_id: null,
      };

    case actions.CHANGE_NETWORK:
      return {
        ...state,
        provider: action.payload.provider,
        network_name: action.payload.network_name,
        chain_id: action.payload.chain_id,
      };

    case actions.SET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.payload.currentProfile,
      };

    default:
      return state;
  }
};
