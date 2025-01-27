import React from "react";
import {
  Sidebar as MUISidebar,
  Menu,
  MenuItem,
  MenuItemStyles,
  SubMenu,
} from "react-pro-sidebar";

import { SidebarHeader } from "./SidebarHeader";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Typography } from "@mui/material";
import { navList } from "../../data/navbar";
import { useBoundStore } from "../../store/store";
import { ROLE } from "../../constants/common";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const token = useBoundStore((state) => state.token);
  const logout = useBoundStore((state) => state.logout);
  const roleState = useBoundStore((state) => state.role);

  const role = roleState ?? ROLE.USER;

  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);

  // handle on RTL change event
  const handleRTLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRtl(e.target.checked);
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        height: "100%",
        direction: rtl ? "rtl" : "ltr",
      }}
    >
      <MUISidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        rtl={rtl}
        breakPoint="md"
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <SidebarHeader
            rtl={rtl}
            style={{ marginBottom: "24px", marginTop: "16px" }}
          />

          {navList[role].map((ele) => (
            <Menu key={ele.id} menuItemStyles={menuItemStyles}>
              <SubMenu label={ele.label} icon={<AcUnitIcon />}>
                {ele.children &&
                  ele.children.map((chi) => (
                    <Link to={chi.path}>
                      <MenuItem key={chi.id}> {chi.label} </MenuItem>
                    </Link>
                  ))}
              </SubMenu>
            </Menu>
          ))}
        </div>
      </MUISidebar>
    </div>
  );
};

export default Sidebar;

{
  /* <Switch
id="collapse"
checked={collapsed}
onChange={() => setCollapsed(!collapsed)}
/> */
}
