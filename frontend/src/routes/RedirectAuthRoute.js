import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "../context/UserContext";

const RedirectAuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.isAuthenticating ? (
          <></>
        ) : user.isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RedirectAuthRoute;
