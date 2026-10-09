import { Box, IconButton, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function QuantityBox({ quantity, setQuantity }) {
  function decrease() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function increase() {
    setQuantity(quantity + 1);
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      <IconButton
        onClick={decrease}
        sx={{
          width: 28,
          height: 28,
          borderRadius: 0,
        }}
      >
        <RemoveIcon sx={{ fontSize: 16 }} />
      </IconButton>

      <TextField
        value={quantity}
        onChange={(e) => {
          const newValue = Number(e.target.value);

          if (newValue >= 1) {
            setQuantity(newValue);
          }
        }}
        slotProps={{
          htmlInput: {
            min: 1,
            style: {
              fontWeight: "bold",
              textAlign: "center",
              padding: "10px",
              width: "30px",
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 28,
            borderRadius: 0,

            "& fieldset": {
              border: "none",
            },
          },
        }}
      />

      <IconButton
        onClick={increase}
        sx={{
          width: 28,
          height: 28,
          borderRadius: 0,
        }}
      >
        <AddIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  );
}
