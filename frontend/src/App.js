import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Login from "./pages/Login";
import MainApp from "./pages/MainApp";
import AuthRoute from "./routes/AuthRoute";

library.add(fas);

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <AuthRoute path="/" component={MainApp} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
