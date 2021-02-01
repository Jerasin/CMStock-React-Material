import { React, useEffect, useState } from "react";
import { Button, Container } from "@material-ui/core";
import Header from "./components/fragments/Header";
import Menu from "./components/fragments/Menu";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Stock from "./components/pages/Stock";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useHistory,
} from "react-router-dom";
import StockCreate from "./components/pages/StockCreate";
import StockEdit from "./components/pages/StockEdit";
import Report from "./components/pages/Report";
import AboutUs from "./components/pages/AboutUs";
import * as loginAction from "./../src/actions/login.action";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(20),
  },
}));

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // ternary condition
      loginAction.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // ternary condition
      loginAction.isLoggedIn() ? <Redirect to="/stock" /> : <Login {...props} />
    }
  />
);

function App() {
  const classes = useStyles();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    dispatch(loginAction.reLogin());
  }, []);

  return (
    <Router>
      {loginReducer.result && !loginReducer.error && (
        <Header handleDrawerOpen={handleDrawerOpen} open={openDrawer} />
      )}

      {loginReducer.result && !loginReducer.error && (
        <Menu
          handleDrawerOpen={openDrawer}
          handleDrawerClose={handleDrawerClose}
        />
      )}

      <Container className={classes.content}>
        <Switch>
          <LoginRoute path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <SecuredRoute path="/stock" component={Stock} />
          <SecuredRoute path="/report" component={Report} />
          <SecuredRoute path="/about" component={AboutUs} />
          <SecuredRoute path="/stockCreate" component={StockCreate} />
          <SecuredRoute path="/stockEdit/:id" component={StockEdit} />
          <Route
            exact={true}
            path="/"
            component={() => <Redirect to="/login" />}
          />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
