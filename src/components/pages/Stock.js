import { React, useEffect } from "react";
import Moment from "react-moment";
import NumberFormat from "react-number-format";

//Route
import { Link } from "react-router-dom";

//  Material Ui
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

// Redux-Hook
import { useDispatch, useSelector } from "react-redux";
import * as stockAction from "./../../actions/stock.action";

// Constatns
import { imageUrl } from "./../../Constatns";

function Stock() {
  // Call Redux Action
  const dispatch = useDispatch();
  const stockReducer = useSelector(({ stockReducer }) => stockReducer);

  // Config Material Theme
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "700",
      marginTop: 0,
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    dispatch(stockAction.getProducts());
  }, []);

  // Loop Fetch DataTable
  const columns = [
    {
      title: "Id",
      render: (item) => <Typography variant="body1">{item.id}</Typography>,
    },
    {
      title: "Image",
      cellStyle: { padding: 0 },
      render: (item) => (
        <img
          src={`${imageUrl}/images/${item.image}?dummy=${Math.random()}`}
          style={{ width: 70, height: 70, borderRadius: "5%" }}
        />
      ),
    },
    {
      title: "Name",
      cellStyle: { minWidth: 700 },
      render: (item) => <Typography variant="body1">{item.name}</Typography>,
    },

    {
      title: "Price",
      render: (item) => (
        <Typography variant="body1">
          <NumberFormat
            value={item.price}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"฿"}
          />
        </Typography>
      ),
    },
    {
      title: "Stock",
      render: (item) => (
        <Typography variant="body1">
          <NumberFormat
            value={item.stock}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
            suffix={" pcs"}
          />
        </Typography>
      ),
    },
    {
      title: "Updated",
      render: (item) => (
        <Typography>
          <Moment format="DD/MM/YYYY">{item.updatedAt}</Moment>
        </Typography>
      ),
    },
  ];

  return (
    <div className={classes.root}>
      <MaterialTable
        columns={columns}
        data={stockReducer.result ? stockReducer.result : []}
        title="Stock"
        // Button to Route StockCreate Page
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ padding: "0px 10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/stockCreate"
                >
                  Create
                </Button>
                {/* <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/stockCreate"
                >
                  Delete
                </Button> */}
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
}

export default Stock;
