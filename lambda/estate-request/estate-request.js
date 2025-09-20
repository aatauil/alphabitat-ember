const axios = require('axios')

const handler = async function (event) {
  const { API_URL, API_TOKEN } = process.env

  const URL = `${API_URL}=${params}`

  console.log('Constructed URL is ...', URL)

  try {
    const { data } = await axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`
      }
    })

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
