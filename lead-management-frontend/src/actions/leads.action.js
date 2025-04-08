import axios from "../helpers/axios";
import AsyncLocalStorage from "@createnextapp/async-local-storage";
import { leadConstants } from "./constants";

export const getAllLeads = () => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.GET_ALL_LEADS_REQUEST });
    const res = await axios.get("profile/leads");
    // console.log(res);
    if (res.status === 200) {
      const leads = res.data;
      dispatch({
        type: leadConstants.GET_ALL_LEADS_SUCCESS,
        payload: { leads: leads },
      });
    } else {
      dispatch({
        type: leadConstants.GET_ALL_LEADS_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const AddLead = (form) => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.GET_POST_LEAD_REQUEST });
    const res = await axios
      .post("/profile/create-lead", form)
      .then((response) => {
        const postLead = response.data.data;
        dispatch({
          type: leadConstants.GET_POST_LEAD_SUCCESS,
          payload: { postLead },
        });
        return postLead.leadId;
      })
      .catch(function (error) {
        console.log(error);
      });
    await AsyncLocalStorage.setItem("postId", JSON.stringify(res));
  };
};

export const getSingleLead = (idPair) => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.GET_ONE_LEAD_REQUEST });
    const res = await axios.get("profile/single-lead", {
      params: idPair,
    });
    if (res.status === 200) {
      const singleLead = res.data;
      // console.log(singleLead);
      dispatch({
        type: leadConstants.GET_ONE_LEAD_SUCCESS,
        payload: { singleLead },
      });
    } else {
      dispatch({
        type: leadConstants.GET_ONE_LEAD_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const updateLeadClose = (form) => {
  return async (dispatch) => {
    await axios
      .post("/profile/update-lead/close", form)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(res);
  };
};

export const searchLead = (idPair) => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.GET_ONE_LEAD_REQUEST });
    const res = await axios.get("profile/single-lead", {
      params: idPair,
    });
    if (res.status === 200) {
      const singleLead = res.data;
      // console.log(singleLead);
      dispatch({
        type: leadConstants.GET_ONE_LEAD_SUCCESS,
        payload: { singleLead },
      });
    } else {
      dispatch({
        type: leadConstants.GET_ONE_LEAD_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const leadUserSales = (salesPair) => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.GET_USER_LEAD_REQUEST });
    const res = await axios.get("profile/leads/users", {
      params: salesPair,
    });
    if (res.status === 200) {
      const leadUsers = res.data;
      // console.log(leadUsers);
      dispatch({
        type: leadConstants.GET_USER_LEAD_SUCCESS,
        payload: { leadUsers },
      });
    } else {
      dispatch({
        type: leadConstants.GET_USER_LEAD_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const updateAssignLead = (form) => {
  return async (dispatch) => {
    await axios
      .post("/profile/update-lead/assign", form)
      .then((response) => {
        console.log(response);
        localStorage.setItem("assignMsg", "Lead assigned Successfully");
      })
      .catch(function (error) {
        console.log(error);
        localStorage.setItem(
          "assignMsg",
          JSON.stringify(error.response.data.message)
        );

        // dispatch({
        //   type: authConstants.LOGIN_PASS_ERROR,
        //   payload: { message: error.response.data.message },
        // });
      });
    // console.log(res);
  };
};

export const productTotal = () => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.GET_TOTALS_REQUEST });
    const res = await axios.get("profile/leads/product-totals");
    console.log(res.data);
    if (res.status === 200) {
      const productTotals = res.data;
      dispatch({
        type: leadConstants.GET_TOTALS_SUCCESS,
        payload: { productTotals: productTotals },
      });
    } else {
      dispatch({
        type: leadConstants.GET_TOTALS_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const getSearchLeads = (form) => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.GET_SEARCH_LEADS_REQUEST });
    const res = await axios.get("profile/leads/search", {
      params: form,
    });
    // console.log(res);
    if (res.status === 200) {
      const leadsSearched = res.data;
      dispatch({
        type: leadConstants.GET_SEARCH_LEADS_SUCCESS,
        payload: { leadsSearched: leadsSearched },
      });
    } else {
      dispatch({
        type: leadConstants.GET_SEARCH_LEADS_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};
