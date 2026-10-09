import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { registerUser, clearAuthError } from "../Redux/Slices/authSlice";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", password: "", phone: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData));
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "custom.text" }}>
        Create Account
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required sx={{ mb: 2 }} size="small" />
        <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required sx={{ mb: 2 }} size="small" />
        <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required sx={{ mb: 2 }} size="small" />
        <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required sx={{ mb: 2 }} size="small" />
        <TextField fullWidth label="Phone (optional)" name="phone" value={formData.phone} onChange={handleChange} sx={{ mb: 2 }} size="small" />
        <Button fullWidth variant="contained" type="submit" disabled={status === "loading"} sx={{ textTransform: "capitalize", py: 1.2 }}>
          {status === "loading" ? "Creating account..." : "Create Account"}
        </Button>
      </Box>
      <Typography sx={{ mt: 2, fontSize: "13px", color: "custom.textSecondary" }}>
        Already have an account?{" "}
        <NavLink to="/login">Sign in</NavLink>
      </Typography>
    </Box>
  );
}
