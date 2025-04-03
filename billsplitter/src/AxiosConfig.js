import axios from "axios";
//axios-middleware for interaction between frontend and backend.

const Instance = axios.create({
  baseURL: `https://inventory-management-wh10.onrender.com`,
});
export default Instance;
