import { Route, Switch } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import Home from "./Home";
import History from "./History";
import Social from "./Social";
import Settings from "./Settings";
import Offers from "./Offers";

const MainApp = () => {
  return (
    <>
      <BottomNavbar />
      <Switch>
        <Route path="/offers" exact>
          <Offers />
        </Route>
        <Route path="/social" exact>
          <Social />
        </Route>
        <Route path="/history" exact>
          <History />
        </Route>
        <Route path="/settings" exact>
          <Settings />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
};

export default MainApp;
