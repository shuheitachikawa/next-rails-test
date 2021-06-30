require("dotenv").config();
module.exports = {
  reactStrictMode: true,
  env: {
    base_url: process.env.API_BASE_URL,
  },
};
