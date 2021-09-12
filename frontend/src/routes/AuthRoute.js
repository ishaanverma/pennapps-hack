import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "../context/UserContext";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.isAuthenticating ? (
          <></>
        ) : user.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AuthRoute;
