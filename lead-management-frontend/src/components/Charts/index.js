import React, { Component, useEffect } from "react";
import { getAllLeads } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export const GetData = () => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const labelList = [];
  for (let lead of leads.leads) {
    labelList.push(lead.service_type);
  }
  const serviceNames = labelList.filter(onlyUnique);

  const serviceData = [];
  for (let product of serviceNames) {
    serviceData.push(labelList.filter((i) => i === product).length);
  }
  const finalList = [];
  const keyPair = {};
  serviceNames.forEach((key, value) => (keyPair[key] = serviceData[value]));

  for (const [key, value] of Object.entries(keyPair)) {
    let dataPair = {};
    dataPair.label = key;
    dataPair.value = value;
    finalList.push(dataPair);
  }
  // console.log(finalList);

  localStorage.setItem("pData", JSON.stringify(finalList));

  // return "finalList";
};

const dataSource = {
  chart: {
    caption: "Leads by Service Type",
    // subcaption: <GetData />,
    numbersuffix: "",
    includevalueinlabels: "1",
    labelsepchar: ": ",
    entityFillHoverColor: "#FFF9C4",
    theme: "fusion",
    showValues: "1",
    showYAxisValues: "0",
    plotGradientColor: "#00ced1",
    usePlotGradientColor: "1",
    // bgColor: "EEEEEE,CCCCCC",
    // bgratio: "60,40",
    // bgAlpha: "70,80",
    // bgAngle: "180",
  },
  colorrange: {
    minvalue: "0",
    code: "#FFE0B2",
    gradient: "1",
    color: [
      { minvalue: "0.5", maxvalue: "1.0", color: "#FFD74D" },
      { minvalue: "1.0", maxvalue: "2.0", color: "#FB8C00" },
      { minvalue: "2.0", maxvalue: "3.0", color: "#E65100" },
    ],
  },
  data: JSON.parse(localStorage.getItem("pData")),
};

const chartConfigs = {
  type: "column2d",
  dataFormat: "json",
  dataSource: dataSource,
};

export class Chart extends Component {
  render() {
    return (
      <div>
        <GetData />
        <ReactFC {...chartConfigs} />
      </div>
    );
  }
}

//----------------------------------------------Regions -----------------------------------

export const GetRegionData = () => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const labelList = [];
  for (let lead of leads.leads) {
    labelList.push(lead.region);
  }
  const serviceNames = labelList.filter(onlyUnique);

  const serviceData = [];
  for (let product of serviceNames) {
    serviceData.push(labelList.filter((i) => i === product).length);
  }
  const finalList = [];
  const keyPair = {};
  serviceNames.forEach((key, value) => (keyPair[key] = serviceData[value]));

  for (const [key, value] of Object.entries(keyPair)) {
    let dataPair = {};
    dataPair.label = key;
    dataPair.value = value;
    finalList.push(dataPair);
  }
  // console.log(finalList);

  localStorage.setItem("rData", JSON.stringify(finalList));

  // return "finalList";
};

const rDataSource = {
  chart: {
    caption: "Leads by Region",
    // subcaption: <GetData />,
    numbersuffix: "",
    includevalueinlabels: "1",
    labelsepchar: ": ",
    entityFillHoverColor: "#FFF9C4",
    theme: "fusion",
    showValues: "1",
    showYAxisValues: "0",
    palettecolors: "00B050,00B050,00B050,00B050,00B050,00B050",
  },
  colorrange: {
    minvalue: "0",
    code: "#FFE0B2",
    gradient: "2",
    color: [
      { minvalue: "0.5", maxvalue: "2.0", color: "#FFD74D" },
      { minvalue: "2.0", maxvalue: "4.0", color: "#FB8C00" },
      { minvalue: "4.0", maxvalue: "6.0", color: "#E65100" },
    ],
  },
  data: JSON.parse(localStorage.getItem("rData")),
};

const rChartConfigs = {
  type: "column2d",
  dataFormat: "json",
  dataSource: rDataSource,
};

export class RegionChart extends Component {
  render() {
    return (
      <div>
        <GetRegionData />
        <ReactFC {...rChartConfigs} />
      </div>
    );
  }
}

//----------------------------------------------Status -----------------------------------

export const GetStatusData = () => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const labelList = [];
  for (let lead of leads.leads) {
    labelList.push(lead.status);
  }
  const serviceNames = labelList.filter(onlyUnique);

  const serviceData = [];
  for (let product of serviceNames) {
    serviceData.push(labelList.filter((i) => i === product).length);
  }
  const finalList = [];
  const keyPair = {};
  serviceNames.forEach((key, value) => (keyPair[key] = serviceData[value]));

  for (const [key, value] of Object.entries(keyPair)) {
    let dataPair = {};
    dataPair.label = key;
    dataPair.value = value;
    finalList.push(dataPair);
  }
  // console.log(finalList);

  localStorage.setItem("sData", JSON.stringify(finalList));

  // return "finalList";
};

const sDataSource = {
  chart: {
    caption: "Leads by Status",
    // subcaption: <GetData />,
    numbersuffix: "",
    includevalueinlabels: "1",
    labelsepchar: ": ",
    entityFillHoverColor: "#FFF9C4",
    theme: "fusion",
    showValues: "1",
    showYAxisValues: "0",
    showLegend: "0",
  },
  colorrange: {
    minvalue: "0",
    code: "#FFE0B2",
    gradient: "2",
    color: [
      { minvalue: "0.5", maxvalue: "2.0", color: "#FFD74D" },
      { minvalue: "2.0", maxvalue: "4.0", color: "#FB8C00" },
      { minvalue: "4.0", maxvalue: "6.0", color: "#E65100" },
    ],
  },
  data: JSON.parse(localStorage.getItem("sData")),
};

const sChartConfigs = {
  type: "doughnut3d",
  width: "100%",
  dataFormat: "json",
  dataSource: sDataSource,
};

export class StatusChart extends Component {
  render() {
    return (
      <div>
        <GetStatusData />
        <ReactFC {...sChartConfigs} />
      </div>
    );
  }
}

//----------------------------------------------Date -----------------------------------

export const GetDateData = () => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const labelList = [];
  for (let lead of leads.leads) {
    labelList.push(lead.createdAt.substring(0, 10));
  }
  const serviceNames = labelList.filter(onlyUnique);

  const serviceData = [];
  for (let product of serviceNames) {
    serviceData.push(labelList.filter((i) => i === product).length);
  }
  const finalList = [];
  const keyPair = {};
  serviceNames.forEach((key, value) => (keyPair[key] = serviceData[value]));

  for (const [key, value] of Object.entries(keyPair)) {
    let dataPair = {};
    dataPair.label = key;
    dataPair.value = value;
    finalList.push(dataPair);
  }
  // console.log(finalList);

  localStorage.setItem("dData", JSON.stringify(finalList));

  // return "finalList";
};

const dDataSource = {
  chart: {
    caption: "Leads by Create Date",
    // subcaption: <GetData />,
    numbersuffix: "",
    includevalueinlabels: "1",
    labelsepchar: ": ",
    entityFillHoverColor: "#FFF9C4",
    theme: "fusion",
    showValues: "1",
    showYAxisValues: "0",
    showLegend: "0",
    palettecolors: "00B050",
  },
  colorrange: {
    minvalue: "0",
    code: "#FFE0B2",
    gradient: "2",
    color: [
      { minvalue: "0.5", maxvalue: "2.0", color: "#FFD74D" },
      { minvalue: "2.0", maxvalue: "4.0", color: "#FB8C00" },
      { minvalue: "4.0", maxvalue: "6.0", color: "#E65100" },
    ],
  },
  data: JSON.parse(localStorage.getItem("dData")),
};

const dChartConfigs = {
  type: "line",
  width: "100%",
  dataFormat: "json",
  dataSource: dDataSource,
};

export class DateChart extends Component {
  render() {
    return (
      <div>
        <GetDateData />
        <ReactFC {...dChartConfigs} />
      </div>
    );
  }
}

//----------------------------------------------SubType -----------------------------------

export const GetSsubData = () => {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const labelList = [];
  for (let lead of leads.leads) {
    labelList.push(lead.service_subtype);
  }
  const serviceNames = labelList.filter(onlyUnique);

  const serviceData = [];
  for (let product of serviceNames) {
    serviceData.push(labelList.filter((i) => i === product).length);
  }
  const finalList = [];
  const keyPair = {};
  serviceNames.forEach((key, value) => (keyPair[key] = serviceData[value]));

  for (const [key, value] of Object.entries(keyPair)) {
    let dataPair = {};
    dataPair.label = key;
    dataPair.value = value;
    finalList.push(dataPair);
  }
  // console.log(finalList);

  localStorage.setItem("subData", JSON.stringify(finalList));

  // return "finalList";
};

const subDataSource = {
  chart: {
    caption: "Leads by Service Subtype",
    // subcaption: <GetData />,
    numbersuffix: "",
    includevalueinlabels: "1",
    labelsepchar: ": ",
    entityFillHoverColor: "#FFF9C4",
    theme: "fusion",
    showValues: "1",
    showYAxisValues: "0",
    palettecolors: "d13100,d13100,d13100,d13100,d13100,d13100",
    plotGradientColor: "#d1008b",
    usePlotGradientColor: "1",
  },
  colorrange: {
    minvalue: "0",
    code: "#FFE0B2",
    gradient: "2",
    color: [
      { minvalue: "0.5", maxvalue: "2.0", color: "#FFD74D" },
      { minvalue: "2.0", maxvalue: "4.0", color: "#FB8C00" },
      { minvalue: "4.0", maxvalue: "6.0", color: "#E65100" },
    ],
  },
  data: JSON.parse(localStorage.getItem("subData")),
};

const subChartConfigs = {
  type: "column2d",
  width: "100%",
  dataFormat: "json",
  dataSource: subDataSource,
};

export class ServiceSubChart extends Component {
  render() {
    return (
      <div>
        <GetSsubData />
        <ReactFC {...subChartConfigs} />
      </div>
    );
  }
}

//-------------------------------- set postId ----------------------------------

// export const PostIdData = () => {
//   localStorage.setItem("postId", JSON.stringify("LeadId"));
//   localStorage.getItem("postId");
// };
