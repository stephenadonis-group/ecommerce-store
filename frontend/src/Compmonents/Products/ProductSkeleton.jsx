import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function ProductSkeleton() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Skeleton variant="rectangular" width={250} height={200} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton width="60%" />
        <Skeleton width="40%" />
      </Box>
    </Box>
  );
}
