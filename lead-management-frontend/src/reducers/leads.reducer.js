import { leadConstants } from "../actions/constants";

const initState = {
  leads: [],
  loading: false,
  error: null,
};

const singleinitState = {
  singleLead: {},
};

const leadUsersinitState = {
  leadUsers: [],
};

const productinitState = {
  productTotals: [],
};

const searchState = {
  leadsSearched: [],
};

const postinitState = {
  postLead: {},
};

export const leadsReducer = (state = initState, action) => {
  switch (action.type) {
    case leadConstants.GET_ALL_LEADS_SUCCESS:
      state = {
        ...state,
        leads: action.payload.leads,
      };
      break;
    default:
  }
  return state;
};

export const singleLeadReducer = (state = singleinitState, action) => {
  switch (action.type) {
    case leadConstants.GET_ONE_LEAD_SUCCESS:
      state = {
        ...state,
        singleLead: action.payload.singleLead,
      };
      break;
    default:
  }
  return state;
};

export const leadUserReducer = (state = leadUsersinitState, action) => {
  switch (action.type) {
    case leadConstants.GET_USER_LEAD_SUCCESS:
      state = {
        ...state,
        leadUsers: action.payload.leadUsers,
      };
      break;
    default:
  }
  return state;
};

export const productTotalsReducer = (state = productinitState, action) => {
  switch (action.type) {
    case leadConstants.GET_ALL_LEADS_SUCCESS:
      state = {
        ...state,
        productTotals: action.payload.productTotals,
      };
      break;
    default:
  }
  return state;
};

export const leadsSearchedReducer = (state = searchState, action) => {
  switch (action.type) {
    case leadConstants.GET_SEARCH_LEADS_SUCCESS:
      state = {
        ...state,
        leadsSearched: action.payload.leadsSearched,
      };
      break;
    default:
  }
  return state;
};

export const postLeadReducer = (state = postinitState, action) => {
  switch (action.type) {
    case leadConstants.GET_POST_LEAD_SUCCESS:
      state = {
        ...state,
        postLead: action.payload.postLead,
      };
      break;
    default:
  }
  return state;
};
