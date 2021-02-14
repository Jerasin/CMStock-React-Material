import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  Link,
  Grid,
} from "@material-ui/core";
import Axios from "axios";
import { apiUrl, server } from "./../../Constatns";
import Alert from "@material-ui/lab/Alert";
import loginReducer from "../../reducers/login.reducer";
import * as loginAction from "./../../actions/login.action";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register(props) {
  const [isError, setIsError] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);
  function showForm({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) {
    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={values.username}
          onChange={handleChange}
          id="username"
          label="Username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={values.password}
          onChange={handleChange}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={values.email}
          onChange={handleChange}
          name="email"
          label="Email"
          type="email"
          id="email"
          autoComplete="current-email"
        />

        {isError && (
          <Alert severity="error">Error , your registration is Failed</Alert>
        )}

        {/* Register Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isSubmitting}
          // onClick={onClick}
        >
          Register
        </Button>
        <Button
          onClick={() => props.history.goBack()}
          fullWidth
          size="small"
          color="primary"
        >
          Cancel
        </Button>
      </form>
    );
  }
  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={`${process.env.PUBLIC_URL}/images/authen_header.jpg`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Register
          </Typography>

          <Formik
            initialValues={{ username: "", password: "", email: "" }}
            onSubmit={(values, { setSubmitting }) => {
              // alert(JSON.stringify(values)) Debugmode
              setSubmitting(true);
              Axios.post("http://localhost:8085/api/v2/authen/register", values)
                .then((result) => {
                  setSubmitting(false);
                  alert(JSON.stringify(result.data));
                  const { data } = result;
                  debugger;
                  if (data.result == "ok") {
                    dispatch(loginAction.setSuccess());
                    setShowDialog(true);
                  } else {
                    // dispatch(
                    //   loginAction.hasError(
                    //     "Error , your information is not correct"
                    //   )
                    // );

                    setIsError(true);
                  }
                })
                .catch((error) => {
                  setIsError(true);
                });
            }}
          >
            {(props) => showForm(props)}
          </Formik>
        </CardContent>
      </Card>

      <Dialog
        open={showDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <CheckCircleIcon /> {"SUCCESS"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your Registration is successfull
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.history.push("/login");
            }}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
