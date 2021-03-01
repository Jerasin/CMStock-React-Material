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
import * as stockAction from "./../../actions/stock.action";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginTop: 100,
  },
  field: {
    marginTop: 16,
  },
  dropdown: {
    marginTop: 16,
    width: "10%",
    height: "30%",
  },
  card: {
    padding: 20,
  },
}));

export default function StockCreate(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleChange, handleBlur } = props;

  const showPreviewImage = (values) => {
    if (values.file_obj) {
      return (
        <img src={values.file_obj} style={{ height: 100, marginTop: 16 }} />
      );
    }
  };

  const showForm = ({ values, setFieldValue, isValid, dirty }) => {
    return (
      <Form>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h3">
              Create Stock
            </Typography>

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="device_name"
              type="text"
              label="Device Name"
            />
            <br />

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="imei"
              type="text"
              label="IMEI"
            />
            <br />

            {/* <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="borrow_status"
              type="text"
              label="Borrow Status"
            /> */}

            {/* <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="device_status"
              type="text"
              label="Device Status"
            /> */}

            <br />
            {/* Dropdown #1 */}
            <Field
              as="select"
              name="borrow_status"
              className={classes.dropdown}
            >
              <option value="wait">Wait</option>
              <option value="done">Done</option>
            </Field>

            <br />
            {/* Dropdown #2 */}
            <Field
              as="select"
              name="device_status"
              className={classes.dropdown}
            >
              <option value="good">Good</option>
              <option value="damage">Damage</option>
            </Field>

            <div>{showPreviewImage(values)}</div>

            <div className={classes.field}>
              <img
                src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                style={{ width: 25, height: 20 }}
              />
              <span
                style={{ color: "#00B0CD", marginLeft: 10, marginRight: 30 }}
              >
                Add Picture
              </span>
              <br />
              <input
                type="file"
                onChange={(e) => {
                  e.preventDefault();
                  setFieldValue("file", e.target.files[0]); // for upload
                  setFieldValue(
                    "file_obj",
                    URL.createObjectURL(e.target.files[0])
                  );

                  // for preview image
                }}
                name="image"
                click-type="type1"
                className="picupload"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0" }}
              />
            </div>
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
            <Button component={Link} to="/stock" color="default" rasied="true">
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
            if (!values.device_name) errors.device_name = "Enter Device Name";
            if (!values.imei) errors.imei = "Enter IMEI";
            if (!values.device_status)
              errors.device_status = "Enter Device Status";
            return errors;
          }}
          initialValues={{
            device_name: "",
            imei: "",
            device_status: "good",
            borrow_status: "wait",
          }}
          onSubmit={(values, { setSubmitting }) => {
            let formData = new FormData();
            formData.append("device_name", values.device_name);
            formData.append("imei", values.imei);
            formData.append("borrow_status", values.borrow_status);
            formData.append("device_status", values.device_status);
            formData.append("image", values.file);

            dispatch(stockAction.addProduct(formData, props.history));

            // #Debug
            // alert(JSON.stringify(values));

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
