import { Route, Switch } from "react-router-dom";

import { AuthUserProvider } from "../providers/AuthUserProvider";
import { SignIn } from "../components/pages/SignIn";
import { SignUp } from "../components/pages/SignUp";
import { Home } from "../components/pages/Home";
import { Page404 } from "../components/pages/Page404";
import { SelfIntro } from "../components/pages/SelfIntro";
import { UserList } from "../components/pages/UserList";

export const Router = () => {
  return (
    <Switch>
      <AuthUserProvider>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/selfintro">
          <SelfIntro />
          </Route>
        <Route path="/userlist">
          <UserList />
        </Route>
      </AuthUserProvider>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
};
