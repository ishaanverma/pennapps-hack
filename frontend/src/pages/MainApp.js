import { useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import Home from "./Home";
import Social from "./Social";
import Settings from "./Settings";
import Offers from "./Offers";
import Savings from "./Savings";
import AccountContext from "../context/AccountContext";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../firebase";
import UserContext from "../context/UserContext";

const MainApp = () => {
  const [account, setAccount] = useState();
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const fetchAccount = useCallback(async () => {
    const result = await firebase.fetchAccount(user.user.uid);
    setAccount(result);
  }, [firebase, user.user.uid]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      <BottomNavbar />
      <Switch>
        <Route path="/offers" exact>
          <Offers />
        </Route>
        <Route path="/social" exact>
          <Social />
        </Route>
        <Route path="/savings" exact>
          <Savings accountId={account && account.accountID} />
        </Route>
        <Route path="/settings" exact>
          <Settings />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </AccountContext.Provider>
  );
};

export default MainApp;
