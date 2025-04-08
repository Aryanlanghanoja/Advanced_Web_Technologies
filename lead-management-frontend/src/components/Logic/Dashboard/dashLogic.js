import { useEffect } from "react";
import { getAllLeads } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";

export const TotalLeadsCount = (props) => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  const count = [];
  for (let lead of leads.leads) {
    count.push(lead);
  }
  return count.length;
};

export const OpenLeadsCount = (props) => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  const count = [];
  for (let lead of leads.leads) {
    if (lead.status === "OPEN") {
      count.push(lead);
    }
  }
  return count.length;
};

export const OpenPercent = () => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  return `${Math.round(
    (OpenLeadsCount(leads.leads) / TotalLeadsCount(leads.leads)) * 100
  )}%`;
};

export const AssignLeadsCount = (props) => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  const count = [];
  for (let lead of leads.leads) {
    if (lead.status === "ASSIGNED") {
      count.push(lead);
    }
  }
  return count.length;
};

export const AssignPercent = () => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  return `${Math.round(
    (AssignLeadsCount(leads.leads) / TotalLeadsCount(leads.leads)) * 100
  )}%`;
};

export const ClosedLeadsCount = (props) => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  const count = [];
  for (let lead of leads.leads) {
    if (lead.status === "CLOSED") {
      count.push(lead);
    }
  }
  return count.length;
};

export const ClosedPercent = () => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  return `${Math.round(
    (ClosedLeadsCount(leads.leads) / TotalLeadsCount(leads.leads)) * 100
  )}%`;
};

export const DisqualifyLeadsCount = (props) => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  const count = [];
  for (let lead of leads.leads) {
    if (lead.status === "DISQUALIFIED") {
      count.push(lead);
    }
  }
  return count.length;
};

export const DisqualifyPercent = () => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  return `${Math.round(
    (DisqualifyLeadsCount(leads.leads) / TotalLeadsCount(leads.leads)) * 100
  )}%`;
};
