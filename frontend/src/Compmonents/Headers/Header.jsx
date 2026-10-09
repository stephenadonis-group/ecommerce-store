import { useMediaQuery } from "@mui/material";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");
  const isDesktop = useMediaQuery("(min-width:900px)");
  return isDesktop ? (
    <DesktopHeader search={search} setSearch={setSearch} />
  ) : (
    <MobileHeader search={search} setSearch={setSearch} />
  );
}
