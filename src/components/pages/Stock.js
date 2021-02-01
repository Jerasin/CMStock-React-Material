import { React, useEffect } from "react";

//  Material Ui
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

// Redux-Hook
import { useDispatch, useSelector } from "react-redux";
import * as stockAction from "./../../actions/stock.action";

// Constatns
import { imageUrl } from "./../../Constatns";

function Stock() {
  // Redux Hook
  const dispatch = useDispatch();
  const stockReducer = useSelector(({ stockReducer }) => stockReducer);

  // Materal UI
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "900",
      marginTop: 0,
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    dispatch(stockAction.getProducts());
  }, []);

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
      field: "price",
      type: "numeric",
    },
    {
      title: "Stock",
      field: "stock",
      type: "numeric",
    },
  ];

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={columns}
          data={stockReducer.result ? stockReducer.result : []}
          title="Stock"
        />
      </div>
    </div>
  );
}

export default Stock;
