import { React, useEffect, useState } from "react";
import Moment from "react-moment";
import NumberFormat from "react-number-format";

//Route
import { Link } from "react-router-dom";

//  Material Ui
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// Redux-Hook
import { useDispatch, useSelector } from "react-redux";
import * as stockAction from "./../../actions/stock.action";

// Constatns
import { imageUrl } from "./../../Constatns";

function Borrow(props) {
  // Call Redux Action
  const dispatch = useDispatch();
  const stockReducer = useSelector(({ stockReducer }) => stockReducer);

  // useState
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showDeletionConfirmDlg = () => {
    return selectedItem ? (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete this item Id : {selectedItem.id}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                src={`${imageUrl}/images/${selectedItem.image}`}
                style={{ width: 50, height: 50, borderRadius: "5%" }}
              />
              <span style={{ marginLeft: 20 }}>{selectedItem.name}</span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(stockAction.deleteProduct(selectedItem.id));
              handleClose();
            }}
            color="secondary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    ) : null;
  };

  // Config Material Theme
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "700",
      marginTop: 0,
    },
  }));
  const classes = useStyles();

  // useEffect
  useEffect(() => {
    dispatch(stockAction.getBorrows());
  }, []);

  // Loop Fetch DataTable
  const columns = [
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
      title: "Device Name",
      cellStyle: { minWidth: 300 },
      render: (item) => (
        <Typography variant="body1">{item.device_name}</Typography>
      ),
    },

    {
      title: "IMEI",
      cellStyle: { minWidth: 50 },
      render: (item) => <Typography variant="body1">{item.imei}</Typography>,
    },

    {
      title: "Borrow Status",
      cellStyle: { minWidth: 50 },
      render: (item) => (
        <Typography variant="body1">{item.borrow_status}</Typography>
      ),
    },

    {
      title: "Device Status",
      cellStyle: { minWidth: 50 },
      render: (item) => (
        <Typography variant="body1">{item.device_status}</Typography>
      ),
    },
    // {
    //   title: "Price",
    //   render: (item) => (
    //     <Typography variant="body1">
    //       <NumberFormat
    //         value={item.price}
    //         displayType={"text"}
    //         thousandSeparator={true}
    //         decimalScale={2}
    //         fixedDecimalScale={true}
    //         prefix={"฿"}
    //       />
    //     </Typography>
    //   ),
    // },
    // {
    //   title: "Stock",
    //   render: (item) => (
    //     <Typography variant="body1">
    //       <NumberFormat
    //         value={item.stock}
    //         displayType={"text"}
    //         thousandSeparator={true}
    //         decimalScale={0}
    //         fixedDecimalScale={true}
    //         suffix={" pcs"}
    //       />
    //     </Typography>
    //   ),
    // },
    {
      title: "Updated",
      render: (item) => (
        <Typography>
          <Moment format="DD/MM/YYYY">{item.updatedAt}</Moment>
        </Typography>
      ),
    },
  ];

  const actions = [
    {
      icon: () => <Edit />,
      iconProps: { color: "primary" },
      tooltip: "Edit",
      onClick: (event, rowData) => {
        props.history.push("/stockEdit/" + rowData.id);
      },
    },
    {
      icon: () => <DeleteOutline />,
      iconProps: { color: "action" },
      tooltip: "Delete",
      onClick: (event, rowData) => {
        handleClickOpen(rowData);
      },
    },
  ];

  return (
    <div className={classes.root}>
      <MaterialTable
        columns={columns}
        data={stockReducer.result ? stockReducer.result : []}
        title="Borrow"
        actions={actions}
        options={{
          pageSize: 5,
          search: true,
          rowStyle: (rowData, index) => ({
            backgroundColor: index % 2 == 0 ? "#f8faf9" : "#fff",
          }),
        }}
        // Button to Route StockCreate Page
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ padding: "0px 10px" }}>
                {/* <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/stockCreate"
                >
                  Create
                </Button> */}
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

      {showDeletionConfirmDlg()}
    </div>
  );
}

export default Borrow;
