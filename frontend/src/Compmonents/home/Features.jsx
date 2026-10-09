import { Box, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import SettingsBackupRestoreOutlinedIcon from "@mui/icons-material/SettingsBackupRestoreOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const features = [
  {
    icon: LocalShippingOutlinedIcon,
    title: "Free Shipping",
    description: "On orders over $100",
  },
  {
    icon: HttpsOutlinedIcon,
    title: "Secure Payment",
    description: "100% secure payment",
  },
  {
    icon: SettingsBackupRestoreOutlinedIcon,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: SupportAgentIcon,
    title: "24/7 Support",
    description: "Always here to help",
  },
];

export default function Features() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",

        backgroundColor: "custom.card",
        padding: "20px",
        margin: "30px 0",
        gap: "20px",
        borderRadius: "10px",
      }}
    >
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <Box
            key={feature.title}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "1 1 250px",
              minWidth: "250px",
            }}
          >
            <Icon fontSize="large" sx={{ mr: "15px", color: "#7b1fa2" }} />

            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "custom.navbarText",
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  fontSize: "10px",
                  color: "custom.textSecondary",
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
