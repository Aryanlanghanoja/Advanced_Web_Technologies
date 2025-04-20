import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";
const options = {
  params: {
    hl: "en",
    gl: "in",
  },
  headers: {
    'x-rapidapi-Key': '12a0d48e45msh6517c15b49f95e8p186612jsn8584f8fcb890',
    'x-rapidapi-host': 'youtube138.p.rapidapi.com'
  }
};

export const fetchDataFromApi = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
