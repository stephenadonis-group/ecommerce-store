import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, NavLink } from "react-router-dom";
import { loginUser, clearAuthError } from "../Redux/Slices/authSlice";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { status, error, user } = useSelector((state) => state.auth);

  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (user) navigate(redirect, { replace: true });
  }, [user, navigate, redirect]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData));
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "custom.text" }}>
        Sign In
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth label="Email" name="email" type="email"
          value={formData.email} onChange={handleChange}
          required sx={{ mb: 2 }} size="small"
        />
        <TextField
          fullWidth label="Password" name="password" type="password"
          value={formData.password} onChange={handleChange}
          required sx={{ mb: 2 }} size="small"
        />
        <Button
          fullWidth variant="contained" type="submit"
          disabled={status === "loading"}
          sx={{ textTransform: "capitalize", py: 1.2 }}
        >
          {status === "loading" ? "Signing in..." : "Sign In"}
        </Button>
      </Box>
      <Typography sx={{ mt: 2, fontSize: "13px", color: "custom.textSecondary" }}>
        Don&apos;t have an account?{" "}
        <NavLink to="/register">Create one</NavLink>
      </Typography>
    </Box>
  );
}
