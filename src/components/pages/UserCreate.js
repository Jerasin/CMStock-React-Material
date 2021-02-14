import React from "react";

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
import { useDispatch } from "react-redux";
import * as userAction from "./../../actions/user.action";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginTop: 100,
  },
  field: {
    marginTop: 16,
  },
  card: {
    padding: 20,
  },
}));

export default function UserCreate(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const showForm = ({ values, setFieldValue, isValid, dirty }) => {
    return (
      <Form>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h3">
              Create User
            </Typography>

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="username"
              type="text"
              label="Username"
            />
            <br />

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="password"
              type="text"
              label="Password"
            />
            <br />

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="email"
              type="email"
              label="Email"
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!(isValid && dirty)}
            >
              Create
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
            if (!values.username) errors.username = "Enter username";
            if (!values.password) errors.password = "Enter password";
            if (!values.email) errors.email = "Enter email";
            return errors;
          }}
          initialValues={{ username: "", password: "", price: 0 }}
          onSubmit={(values, { setSubmitting }) => {
            let formData = new FormData();
            formData.append("username", values.username);
            formData.append("password", values.password);
            formData.append("email", values.email);
            // formData.append("image", values.file);

            dispatch(userAction.addUser(values, props.history));
            // alert(JSON.stringify(values));
            alert(JSON.stringify(props.history));
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
