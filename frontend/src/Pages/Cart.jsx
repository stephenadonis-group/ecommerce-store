import { useMediaQuery } from "@mui/material";
import DesktopCart from "../Compmonents/Cart/DesktopCart";
import MobileCart from "../Compmonents/Cart/MobileCart";

export default function Cart() {
  const isDesktop = useMediaQuery("(min-width:1000px)");
  return <>{isDesktop ? <DesktopCart /> : <MobileCart />}</>;
}
