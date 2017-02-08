let AUTH_TOKEN = '';
let USER_ID = '';

export const API_BASE = 'https://same.wearekiai.de/api/';


// setter
export const updateAuthHeader = token => {
  console.info('updating auth header');
  AUTH_TOKEN = token;
};

export const updateUserId = id => {
  console.info('updating user id');
  USER_ID = id;
};

export const getUserId = () => USER_ID;
export const getAuthToken = () => AUTH_TOKEN;

const getHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: AUTH_TOKEN
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
    .then(response => response.json());
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
  .catch(error => {
    console.info({ error });
    // remove auth header on 401
    if (error.statusCode === 401) {
      updateAuthHeader(null);
    }
  });

export const put = (url, params = {}) => fetch(`${API_BASE}${url}`,
  {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({
      ...params
    })
  })
  .then(response => response.json())
  .catch(error => {
    console.info({ error });
    // remove auth header on 401
    if (error.statusCode === 401) {
      updateAuthHeader(null);
    }
  });

export const del = url => fetch(`${API_BASE}${url}`,
  {
    method: 'DELETE',
    headers: getHeaders(),
  })
  .then(response => response.json())
  .catch(error => {
    console.info({ error });
    // remove auth header on 401
    if (error.statusCode === 401) {
      updateAuthHeader(null);
    }
  });
