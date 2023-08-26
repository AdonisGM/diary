import {useNavigate,useLocation} from "react-router-dom";
import {Fragment, useEffect} from "react";
import Cookie from "js-cookie";

const Auth = ({children}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // check token in cookies
    const token = Cookie.get('access_token');
    const refreshToken = Cookie.get('refresh_token');

    if (token === undefined || refreshToken === undefined) {
      Cookie.remove('access_token');
      Cookie.remove('refresh_token');
      navigate('/login');
    }

    document.title = 'Diary | AdonisGM';
  }, [navigate, location]);

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default Auth