let AUTH_TOKEN = '';
let USER_ID = '';
let FCM_TOKEN = '';

export const API_BASE = 'https://same.wearekiai.de/api/';
// export const API_BASE = 'http://0.0.0.0:3000/api/';


// setter
export const updateAuthHeader = token => {
  AUTH_TOKEN = token;
};

export const updateUserId = id => {
  USER_ID = id;
};

export const updateFcmToken = token => {
  FCM_TOKEN = token;
};

export const getUserId = () => USER_ID;
export const getAuthToken = () => AUTH_TOKEN;
export const getFcmToken = () => FCM_TOKEN;

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

  console.log(`${API_BASE}${newUrl}`);

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
  .then(response => (response && typeof response.json === 'function' ? response.json() : response))
  .catch(error => {
    console.info({ error });
  });
