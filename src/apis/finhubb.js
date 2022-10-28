import axios from "axios";

const APIKEY = "cd765sqad3i47lmpna5gcd765sqad3i47lmpna60";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: APIKEY,
  },
});
