import {motion, useAnimate} from "framer-motion";
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CookieImage from "./assets/cookie-svgrepo-com.svg";
import {Button, Card, Image} from "@nextui-org/react";
import {Fragment, useEffect} from "react";
import {Toaster} from "react-hot-toast";
import NonAuth from "./components/auth/NonAuth.jsx";
import Welcome from "./components/welcome/welcome.jsx";

// import Signup from "./components/signup/Signup.jsx";
// import Login from "./components/login/Login.jsx";
// import Information from "./components/menuLayout/menuItems/information/Information.jsx";
// import MenuLayout from "./components/menuLayout/MenuLayout.jsx";
// import Apps from "./components/menuLayout/menuItems/apps/Apps.jsx";
// import Setting from "./components/menuLayout/menuItems/setting/Setting.jsx";
// import Welcome from "./components/welcome/Welcome.jsx";
// import Auth from "./components/auth/Auth.jsx";
// import NonAuth from "./components/auth/NonAuth.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/sign-up",
    element: <p>Sign up</p>,
  },
  {
    path: "*",
    element: <p>404</p>,
  }
]);

function App() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!localStorage.getItem('isAllowCookie')) {
      animate(scope.current, {opacity: 1, y: 0, scale: 1});
    }
  }, [animate, scope]);

  return (
    <div>
      <RouterProvider router={router}/>
      <Toaster
        toastOptions={{
          className: 'bg-default-900 text-white text-sm',
        }}
        position="top-right"
      />
      <motion.div
        className={'flex justify-center items-center fixed bottom-0 w-full'}
        initial={{opacity: 0, y: 100, scale: 0}}
        ref={scope}
      >
        <Card
          className={'flex flex-row items-center gap-2 p-2 bg-default-700 text-white w-fit m-2'}
        >
          <Image src={CookieImage} className={'w-6 h-6 min-h-6 min-w-6'}/>
          <Fragment>
            <p className={'text-xs text-center text-default-300 w-full'}>
              We need cookies to run this app. Sorry for the inconvenience!
            </p>
            <Button
              size="sm"
              onPress={() => {
                localStorage.setItem('isAllowCookie', true);
                animate(scope.current, {opacity: 0, y: 100, scale: 0});
              }}
            >
              Accept
            </Button>
          </Fragment>
        </Card>
      </motion.div>
    </div>
  )
}

export default App
