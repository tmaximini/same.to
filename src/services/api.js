let AUTH_HEADER = '';

export const API_BASE = 'https://same.wearekiai.de/api/';

// setter
export const updateAuthHeader = token => {
  console.info('updating auth header');
  AUTH_HEADER = token;
};

const getHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: AUTH_HEADER
});

const getQueryString = params => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');
};

export const get = (url, params = {}) => {
  const qs = getQueryString(params);
  let newUrl = url;
  if (qs) {
    newUrl = `${url}?${qs}`;
  }

  return fetch(`${API_BASE}${newUrl}`, {
    method: 'GET',
    headers: getHeaders(),
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
};

export const post = (url, params = {}) => fetch(`${API_BASE}${url}`,
  {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      ...params
    })
  })
  .then(response => response.json())
  .catch((error) => {
    console.error(error);
  });
