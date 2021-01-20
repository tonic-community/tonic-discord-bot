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
    console.log(res.data.length)
    if (res.data.length === 0){
      return 404
    }
    if (res.status == 200) {
      return res.data
    }
  }
  catch (err) {
    if (err.response['status'] === 403) {
      return 403
    } else if (err.response['status'] === 404) {
      return 404
    } else {
      console.log(err)
      return undefined
    }
  }
}

module.exports = {
  find
}
