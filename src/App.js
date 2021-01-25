import React from "react";
import { Button, Container } from "@material-ui/core";
import Header from "./components/fragments/Header";
import Menu from "./components/fragments/Menu";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Stock from "./components/pages/Stock";
import { useSelector } from "react-redux";
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

function App() {
  const classes = useStyles();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Router>
      {loginReducer.result && (
        <Header handleDrawerOpen={handleDrawerOpen} open={openDrawer} />
      )}

      {loginReducer.result && (
        <Menu
          handleDrawerOpen={openDrawer}
          handleDrawerClose={handleDrawerClose}
        />
      )}

      <Container className={classes.content}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/stock" component={Stock} />
          <Route path="/stockCreate" component={StockCreate} />
          <Route path="/stockEdit/:id" component={StockEdit} />
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
