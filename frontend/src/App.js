import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Login from "./pages/Login";
import MainApp from "./pages/MainApp";
import AuthRoute from "./routes/AuthRoute";
import UserContext from "./context/UserContext";
import { getAuth } from "firebase/auth";
import RedirectAuthRoute from "./routes/RedirectAuthRoute";

library.add(fas);

function App() {
  const [user, setUser] = useState({
    user: null,
    isAuthenticating: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUser({
          user: user,
          isAuthenticating: false,
          isAuthenticated: true,
        });
      } else {
        setUser({
          user: null,
          isAuthenticated: false,
          isAuthenticating: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ChakraProvider>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Router>
          <Switch>
            <RedirectAuthRoute path="/login" exact component={Login} />
            <AuthRoute path="/" component={MainApp} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
