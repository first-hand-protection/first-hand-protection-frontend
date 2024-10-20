/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  AssignmentTurnedInRounded,
  ChatRounded,
  Dashboard,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  ListProps,
} from "@mui/joy";
import { ReactNode, memo } from "react";
import { Link, useMatch } from "react-router-dom";
import { useCurrentUser } from "../core/auth";

export const Navigation = memo(function Navigation(
  props: NavigationProps,
): JSX.Element {
  const { sx, ...other } = props;
  const user = useCurrentUser();
  return (
    <List
      sx={{ "--ListItem-radius": "4px", ...sx }}
      size="sm"
      role="navigation"
      {...other}
    >
      {user ? (
        <>
          <NavItem path="/dashboard" label="Dashboard" icon={<Dashboard />} />
          <NavItem
            path="/create-a-test"
            label="Create A Test"
            icon={<AssignmentTurnedInRounded />}
          />
          <NavItem
            path="/tests"
            label="Tests"
            icon={<AssignmentTurnedInRounded />}
          />
          <NavItem path="/messages" label="Messages" icon={<ChatRounded />} />
        </>
      ) : (
        <>
          <NavItem
            path="/pricing"
            label="View Plans Now!"
            icon={<ChatRounded />}
          />
        </>
      )}
    </List>
  );
});

function NavItem(props: NavItemProps): JSX.Element {
  return (
    <ListItem>
      <ListItemButton
        component={Link}
        selected={!!useMatch(props.path)}
        to={props.path}
        aria-current="page"
      >
        <ListItemDecorator children={props.icon} />
        <ListItemContent>{props.label}</ListItemContent>
      </ListItemButton>
    </ListItem>
  );
}

type NavigationProps = Omit<ListProps, "children">;
type NavItemProps = {
  path: string;
  label: string;
  icon: ReactNode;
};
