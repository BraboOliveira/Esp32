import axios from "axios";

const api = axios.create({
    baseURL: "http://vendebelem.com/api/",
  });

  export default api;