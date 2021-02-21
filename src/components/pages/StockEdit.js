import { React, useEffect } from "react";

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
import * as stockAction from "./../../actions/stock.action";

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

export default function StockEdit(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const stockReducer = useSelector(({ stockReducer }) => stockReducer);

  useEffect(() => {
    let id = props.match.params.id;
    dispatch(stockAction.getProductById(id));
  }, []);

  const showPreviewImage = (values) => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 100 }} />;
    } else if (values.image) {
      return (
        <img
          src={`${imageUrl}/images/${values.image}`}
          style={{ height: 100 }}
        />
      );
    }
  };

  const showForm = ({ values, setFieldValue, isValid, dirty }) => {
    return (
      <Form>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h3">
              Edit Stock {props.match.params.id}
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
              label="imei"
            />

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="borrow_status"
              type="text"
              label="Borrow Status"
            />

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="device_status"
              type="text"
              label="Device Status"
            />

            <div style={{ marginTop: 20 }}>{showPreviewImage(values)}</div>

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
                  ); // for preview image
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
              Edit
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
            if (!values.device_name) errors.device_name = "Enter Device name";
            if (!values.imei) errors.imei = "Enter IMEI";
            if (!values.borrow_status)
              errors.borrow_status = "Enter Borrow Status";
            if (!values.device_status)
              errors.device_status = "Enter Device Status";
            return errors;
          }}
          enableReinitialize
          initialValues={
            stockReducer.result
              ? stockReducer.result
              : {
                  device_name: " ",
                  imei: " ",
                  borrow_status: " ",
                  device_status: " ",
                }
          }
          onSubmit={(values, { setSubmitting }) => {
            let formData = new FormData();
            formData.append("id", values.id);
            formData.append("device_name", values.device_name);
            formData.append("imei", values.imei);
            formData.append("borrow_status", values.borrow_status);
            formData.append("device_status", values.device_status);
            if (values.file) {
              formData.append("image", values.file);
            }
            dispatch(stockAction.updateProduct(formData, props.history));

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
