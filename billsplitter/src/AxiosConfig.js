import axios from "axios";
//axios-middleware for interaction between frontend and backend.

const Instance = axios.create({
  baseURL: `https://bill-splitter-react-js-y8b3.onrender.com`,
});
export default Instance;
