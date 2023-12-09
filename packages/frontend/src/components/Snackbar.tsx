import { forwardRef } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { ISnackbarConfig } from "../models/Snackbar";

const Alert = forwardRef(function Alert(props: any, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarMessage = (props: { snackbar: ISnackbarConfig, setSnackbar: Function }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={props.snackbar.isOpen}
      autoHideDuration={props.snackbar.timeOut}
      onClose={() => props.setSnackbar({ ...props.snackbar, isOpen: false })}>
      <Alert
        severity={props.snackbar.type}
        onClose={() => props.setSnackbar({ ...props.snackbar, isOpen: false })}
        sx={{ width: '100%' }}>
        {props.snackbar.message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarMessage;
