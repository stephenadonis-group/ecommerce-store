import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackbar({ open, setOpenSnackbar }) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
      >
        <Alert variant="filled" severity="success">
          Added to cart
        </Alert>
      </Snackbar>
    </div>
  );
}
