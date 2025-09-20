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

  // Parse the body if present, otherwise use undefined
  const requestBody = event.body ? JSON.parse(event.body) : undefined;

  // Log the full request details in one console log
  console.log(
    '[EstateRequest] Axios POST Request:',
    JSON.stringify({
      url: API_URL,
      headers: axiosConfig.headers,
      body: requestBody
    }, null, 2)
  );

  try {
    // Use POST and pass the body
    const { data } = await axios.post(API_URL, requestBody, axiosConfig)

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    if (error.response) {
      console.error('[EstateRequest] Error:', error.response.status, error.response.statusText);
      const { status, statusText, headers, data } = error.response;
      return {
        statusCode: status,
        body: JSON.stringify({ status, statusText, headers, data }),
      };
    } else {
      console.error('[EstateRequest] Error:', error.message);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }
}

module.exports = { handler }
