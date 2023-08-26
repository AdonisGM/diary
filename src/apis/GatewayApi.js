import Cookie from "js-cookie";
import Cookies from "js-cookie";

const ENDPOINT = localStorage.getItem('isLocalhost') ? 'http://localhost:5000' : 'https://api.nmtung.dev';

const GatewayApi = async (cmd, dataObj) => {
  // add no-cors
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cmd: cmd,
      data: dataObj,
    }),
    credentials: 'include',
  };

  let response = await fetch(`${ENDPOINT}/gateway`, options);

  if (response.status === 401) {
    await refreshToken();
    let optionsR = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cmd: cmd,
        data: dataObj,
      }),
      credentials: 'include',
    };
    response = await fetch(`${ENDPOINT}/gateway`, optionsR);
  }

  if (response.status >= 500) {
    return Promise.reject(undefined);
  }

  if (!response.ok) {
    const errorData = await response.json();
    return Promise.reject(errorData);
  }

  const data = await response.json();
  return Promise.resolve(data);
};

const refreshToken = async () => {
  if (!Cookie.get('refresh_token')) {
    Cookies.remove('access_token', {path: '/', domain: localStorage.getItem('isLocalhost') ? 'localhost' : '.nmtung.dev'});
    Cookies.remove('refresh_token', {path: '/', domain: localStorage.getItem('isLocalhost') ? 'localhost' : '.nmtung.dev'});
    window.location.href = '/';
    return null;
  }

  const optionsRefresh = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh_token: Cookie.get('refresh_token'),
    }),
    method: 'POST',
    credentials: 'include',
  };

  const responseRefresh = await fetch(
    `${ENDPOINT}/account/refresh-token`,
    optionsRefresh
  );

  if (!responseRefresh.ok) {
    Cookies.remove('access_token', {path: '/', domain: localStorage.getItem('isLocalhost') ? 'localhost' : '.nmtung.dev'});
    Cookies.remove('refresh_token', {path: '/', domain: localStorage.getItem('isLocalhost') ? 'localhost' : '.nmtung.dev'});
    window.location.href = '/';
    return null;
  }

  if (responseRefresh.status === 204) {
    return null;
  }

  return await responseRefresh.json();
};

export default GatewayApi;