import { React, useEffect, useState } from "react";

// Material UI
import { Button, Container } from "@material-ui/core";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

// Route
import Header from "./components/fragments/Header";
import Menu from "./components/fragments/Menu";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Stock from "./components/pages/Stock";
import StockCreate from "./components/pages/StockCreate";
import StockEdit from "./components/pages/StockEdit";
import Report from "./components/pages/Report";
import AboutUs from "./components/pages/AboutUs";
import User from "./components/pages/User";
import UserCreate from "./components/pages/UserCreate";
import UserEdit from "./components/pages/UserEdit";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useHistory,
} from "react-router-dom";

// Redux-Hook
import { useSelector, useDispatch } from "react-redux";
import * as loginAction from "./../src/actions/login.action";

import clsx from "clsx";
import Borrow from "./components/pages/Borrow";
import { LOGIN_STATUS } from "./Constatns";
const drawerWidth = 240;

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
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
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
    <Router basename="/src/components/pages/Login.js">
      {loginReducer.result &&
        !loginReducer.error &&
        localStorage.getItem(LOGIN_STATUS) && (
          <Header handleDrawerOpen={handleDrawerOpen} open={openDrawer} />
        )}

      {loginReducer.result &&
        !loginReducer.error &&
        localStorage.getItem(LOGIN_STATUS) && (
          <Menu
            handleDrawerOpen={openDrawer}
            handleDrawerClose={handleDrawerClose}
          />
        )}

      <div className={classes.drawerHeader} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]:
            openDrawer && loginReducer.result && !loginReducer.error,
        })}
      >
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <Switch>
            <LoginRoute path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <SecuredRoute path="/stock" component={Stock} />
            <SecuredRoute path="/report" component={Report} />
            <SecuredRoute path="/about" component={AboutUs} />
            <SecuredRoute path="/stockCreate" component={StockCreate} />
            <SecuredRoute path="/stockEdit/:id" component={StockEdit} />
            <SecuredRoute path="/user" component={User} />
            <SecuredRoute path="/userCreate" component={UserCreate} />
            <SecuredRoute path="/userEdit/:id" component={UserEdit} />
            <SecuredRoute path="/borrow" component={Borrow} />
            <Route
              exact={true}
              path="/"
              component={() => <Redirect to="/login" />}
            />
          </Switch>
        </Container>
      </main>
    </Router>
  );
}

export default App;
