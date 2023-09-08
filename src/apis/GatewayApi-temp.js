import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ENDPOINT = import.meta.env.VITE_API_URL;

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
    toast('Có lỗi xảy ra, vui lòng thử lại sau!'); // 'Có lỗi xảy ra, vui lòng thử lại sau!
    return Promise.reject(undefined);
  }

  if (!response.ok) {
    const errorData = await response.json();
    toast(errorData.error_message);
    return Promise.reject(errorData);
  }

  const data = await response.json();
  return Promise.resolve(data);
};

const refreshToken = async () => {
  if (!Cookie.get('refresh_token')) {
    Cookies.remove('access_token', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});
    Cookies.remove('refresh_token', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});
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
    Cookies.remove('access_token', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});
    Cookies.remove('refresh_token', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});
    window.location.href = '/';
    return null;
  }

  if (responseRefresh.status === 204) {
    return null;
  }

  return await responseRefresh.json();
};

export default GatewayApi;