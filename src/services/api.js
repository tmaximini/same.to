
export const API_BASE = 'https://same.wearekiai.de/api/';

const getQueryString = (params) => {
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

  return fetch(`${API_BASE}${newUrl}`)
    .then(response => response.json())
    .catch((error) => {
      console.error(error);
    });
};

export const post = (url, params = {}) => fetch(`${API_BASE}${url}`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ...params
  })
})
.then(response => response.json())
.catch((error) => {
  console.error(error);
});
