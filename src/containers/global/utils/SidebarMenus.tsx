import { ReactNode } from "react";
import { MenuItem, menuClasses, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export const createMenuItem = (
  itemIcon: ReactNode,
  name: string,
  link: string,
  theme: any
) => {
  return (
    <MenuItem
      icon={itemIcon}
      routerLink={<Link to={link} />}
      rootStyles={{
        ["." + menuClasses.button]: {
          backgroundColor: theme.palette.background.paper,
          color: "#9E9E9E",
          "&:hover": {
            backgroundColor: "#7314ed",
            color: "white",
          },
        },
      }}
    >
      {name}
    </MenuItem>
  );
};

export const createSubMenu = (
  subMenuIcon: ReactNode,
  label: string,
  items: ReactNode
) => {
  return (
    <SubMenu
      icon={subMenuIcon}
      label={label}
      rootStyles={{
        ["& > ." + menuClasses.button]: {
          backgroundColor: "transparent",
          color: "#9E9E9E",
          "&:hover": {
            backgroundColor: "#7314ed",
            color: "white",
          },
        },
      }}
    >
      {items}
    </SubMenu>
  );
};
