import { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { reviewsAPI } from "../../api/endpoints";

export default function ReviewSection({ productId, reviews, onRefresh }) {
  const token = useSelector((state) => state.auth.token);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (rating < 1) {
      setError("Please select a rating");
      return;
    }
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await reviewsAPI.add(productId, { rating, comment });
      setComment("");
      setRating(0);
      setSuccess(true);
      onRefresh();
    } catch (err) {
      const data = err.response?.data;
      setError(data?.error || data?.rating || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  }

  function reviewDate(createdAt) {
    if (!createdAt) return "";
    try {
      return new Date(createdAt).toLocaleDateString();
    } catch {
      return "";
    }
  }

  return (
    <Box sx={{ mt: 4, mb: 3 }}>
      <Typography
        variant="h6"
        sx={{ color: "custom.text", fontWeight: "bold", mb: 2 }}
      >
        Customer Reviews ({reviews.length})
      </Typography>

      {reviews.length === 0 && (
        <Typography sx={{ color: "custom.textSecondary", fontSize: "14px", mb: 2 }}>
          No reviews yet. Be the first to review this product.
        </Typography>
      )}

      {reviews.map((review) => (
        <Box
          key={review.id}
          sx={{ py: 2, borderBottom: "1px solid", borderColor: "divider" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "14px", color: "custom.text" }}
              >
                {review.reviewerName || "Anonymous"}
              </Typography>
              <Rating value={review.rating} readOnly size="small" />
            </Box>
            <Typography sx={{ fontSize: "12px", color: "custom.textSecondary" }}>
              {reviewDate(review.createdAt)}
            </Typography>
          </Box>
          <Typography
            sx={{ fontSize: "14px", color: "custom.textSecondary", lineHeight: 1.6 }}
          >
            {review.comment}
          </Typography>
        </Box>
      ))}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "16px", color: "custom.text", mb: 1.5 }}
        >
          Write a Review
        </Typography>

        {!token ? (
          <Alert severity="info" sx={{ fontSize: "13px" }}>
            <NavLink
              to={`/login?redirect=${encodeURIComponent(`/products/${productId}`)}`}
            >
              Sign in
            </NavLink>{" "}
            to write a review.
          </Alert>
        ) : (
          <>
            {error && (
              <Alert severity="error" sx={{ mb: 1.5, fontSize: "13px" }}>
                {error}
              </Alert>
            )}
            {success && !error && (
              <Alert
                severity="success"
                sx={{ mb: 1.5, fontSize: "13px" }}
                onClose={() => setSuccess(false)}
              >
                Review submitted. Thank you!
              </Alert>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <Typography sx={{ fontSize: "13px", color: "custom.textSecondary" }}>
                Your rating:
              </Typography>
              <Rating
                value={rating}
                onChange={(_, newValue) => {
                  setRating(newValue);
                  setError(null);
                }}
                size="small"
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              size="small"
              label="Your review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 1.5 }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{ textTransform: "capitalize" }}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
