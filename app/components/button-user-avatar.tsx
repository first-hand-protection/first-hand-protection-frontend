import { LogoutRounded, SettingsRounded } from "@mui/icons-material";
import {
  Avatar,
  Dropdown,
  IconButton,
  IconButtonProps,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import { getAuth, signOut } from "firebase/auth";
import { useCurrentUser } from "../core/auth";
import { supabase } from "../core/supabase";

export function UserAvatarButton(props: UserAvatarButtonProps): JSX.Element {
  const { sx, ...other } = props;
  const user = useCurrentUser()!;

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Supabase logout error:", error);
        // Optionally, display an error message to the user.
      } else {
        // Firebase signOut if needed (e.g., if also using Firebase UI)
        signOut(getAuth()).catch((firebaseError) => {
          console.error("Firebase logout error:", firebaseError);
        });

        // Redirect or update UI as needed after successful logout.
        // For example, you might use a router to navigate to the login page.
        window.location.href = "/login"; // Example redirect
      }
    } catch (err) {
      console.error("Logout error:", err); // Catch any unexpected errors
    }
  };

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{
          root: {
            sx: { p: "2px", ...sx },
            ...other,
          },
        }}
      >
        <Avatar sx={{ width: 36, height: 36 }} src={user.photoURL ?? undefined}>
          {user.displayName}
        </Avatar>
      </MenuButton>

      <Menu size="sm">
        <MenuItem>
          <ListItemDecorator sx={{ ml: 0.5 }}>
            <SettingsRounded />
          </ListItemDecorator>
          <ListItemContent sx={{ mr: 2 }}>Settings</ListItemContent>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          {" "}
          {/* Use the new logout function */}
          <ListItemDecorator sx={{ ml: 0.5 }}>
            <LogoutRounded />
          </ListItemDecorator>
          <ListItemContent sx={{ mr: 2 }}>Logout</ListItemContent>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

export type UserAvatarButtonProps = Omit<IconButtonProps, "children">;
