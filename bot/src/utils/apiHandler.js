const axios = require('axios');
require('dotenv').config();

async function find(endpoint, params) {
  try {
     let res = await axios({
          baseURL: process.env.BACKEND_URL,
          url: endpoint,
          method: 'get',
          timeout: 8000,
          headers: {
              'Authorization': process.env.BACKEND_TOKEN,
              'Content-Type': 'application/json',

          },
          params: params,
      })
      if(res.status == 200){ 
          console.log(res.status)
      }    
      return res.data
  }
  catch (err) {
      console.error(err);
      return "something went wrong"
  }
}

module.exports = {
  find
}
