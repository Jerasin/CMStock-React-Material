import { React, useEffect, useState } from "react";

// Route
import { Link } from "react-router-dom";

// Formik
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

// Material UI
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// Redux-Hook
import { useDispatch, useSelector } from "react-redux";
import * as userAction from "./../../actions/user.action";

// Import Constants
import { imageUrl } from "./../../Constatns";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  field: {
    marginTop: 16,
  },
  card: {
    padding: 20,
  },
}));

export default function UserEdit(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userReducer = useSelector(({ userReducer }) => userReducer);
  const [password, setPassword] = useState("");

  useEffect(() => {
    let id = props.match.params.id;
    dispatch(userAction.getUserById(id));
  }, [dispatch, props.match.params.id]);

  const showForm = ({ values, setFieldValue, isValid, dirty }) => {
    return (
      <Form>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h3">
              Edit User {props.match.params.id}
            </Typography>

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="username"
              type="text"
              label="Username"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
            <br />
            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="password"
              type="password"
              label="Password"
              variant="outlined"
            />

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="email"
              type="email"
              label="Email"
              variant="outlined"
            />

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="level"
              type="text"
              label="Level"
              variant="outlined"
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!(isValid && dirty)}
            >
              Edit
            </Button>
            <Button component={Link} to="/user" color="default" rasied="true">
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  return (
    <Container className={classes.root}>
      {/* Main content */}

      <div className="box-body" style={{ marginTop: 30 }}>
        <Formik
          validate={(values) => {
            let errors = {};
            if (!values.username) errors.name = "Enter Username";
            if (!values.password) errors.stock = "Enter Password";
            if (!values.level) errors.level = "Enter Level";
            return errors;
          }}
          enableReinitialize
          initialValues={
            userReducer.result
              ? userReducer.result
              : { username: " ", password: " ", level: " " }
          }
          onSubmit={(values, { setSubmitting }) => {
            // let formData = new FormData();
            // formData.append("id", values.id);
            // formData.append("username", values.username);
            // formData.append("password", values.password);
            // formData.append("level", values.level);
            // formData.append("stock", values.stock);
            // if (values.file) {
            //   formData.append("image", values.file);
            // }

            dispatch(userAction.updateUser(values, props.history));

            setSubmitting(false);
          }}
        >
          {(props) => showForm(props)}
        </Formik>
      </div>
      {/* /.content */}
    </Container>
  );
}
