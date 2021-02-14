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
import * as userAction from "./../../actions/user.action";

// Constatns
import { imageUrl } from "./../../Constatns";

function User(props) {
  // Call Redux Action
  const dispatch = useDispatch();
  const userReducer = useSelector(({ userReducer }) => userReducer);

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
              dispatch(userAction.deleteUser(selectedItem.id));
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
    dispatch(userAction.getUser());
  }, []);

  // Loop Fetch DataTable
  const columns = [
    {
      title: "Id",
      //   cellStyle: { minWidth: 10 },
      render: (item) => <Typography variant="body1">{item.id}</Typography>,
    },

    {
      title: "Username",
      cellStyle: { minWidth: 100 },
      render: (item) => (
        <Typography variant="body1">{item.username}</Typography>
      ),
    },

    {
      title: "Create",
      render: (item) => (
        <Typography>
          <Moment format="DD/MM/YYYY">{item.createAt}</Moment>
        </Typography>
      ),
    },

    {
      title: "Update",
      render: (item) => (
        <Typography>
          <Moment format="DD/MM/YYYY">{item.updateAt}</Moment>
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
        props.history.push("/userEdit/" + rowData.id);
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
        data={userReducer.result ? userReducer.result : []}
        title="User"
        actions={actions}
        options={{
          pageSize: 8,
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
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/userCreate"
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

      {showDeletionConfirmDlg()}
    </div>
  );
}

export default User;
