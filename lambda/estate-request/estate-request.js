const axios = require('axios')

const handler = async function (event) {
  const { API_URL, API_TOKEN } = process.env

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
  }

  // Log constructed URL after all headers & body have been added
  console.log('Constructed URL is ...', API_URL)
  console.log('Request headers:', axiosConfig.headers)
  if (event.body) {
    console.log('Request body:', event.body)
  }

  try {
    // Parse the body if present, otherwise use undefined
    const requestBody = event.body ? JSON.parse(event.body) : undefined;

    // Use POST and pass the body
    const { data } = await axios.post(API_URL, requestBody, axiosConfig)

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data }),
    }
  }
}

module.exports = { handler }
