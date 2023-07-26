import * as React from "react";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
const drawerWidth = 240;

const SmallScreenDrawerMenu = (props) => {
  const { toggleLogInModal, toggleRegisterModal, setOpenLoginModal } = props;
  //   const [isLoggedInd, setIsLoggedInd] = React.useState(false);
  const navigate = useNavigate();
  const { userDetail } = useSelector((state) => state);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: { xl: "none", lg: "none", md: "none", sm: "none", xs: "flex" },
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          {/* ==== 👇 EVITEGURU topbar logo👇   ===== */}
          <Box
            component={NavLink}
            to={"/"}
            sx={{
              width: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              margin: "auto",
            }}
          >
            <Box
              component={"img"}
              src="./assets/EviteGuruLogoWhite.svg"
              sx={{ width: "100%" }}
            />
          </Box>
          {/* ==== 👆 EVITEGURU topbar logo 👆   ===== */}
        </Toolbar>
      </AppBar>

      {/* ==== 👇 Left menu drawer for small screens👇   ===== */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          bgcolor: "transparent",
        }}
        PaperProps={{ sx: { bgcolor: "#F5F5F5" } }}
      >
        <Stack>
          {/* ==== 👇 EVITEGURU topbar logo👇   ===== */}
          <Box
            component={NavLink}
            to={"/"}
            onClick={handleDrawerToggle}
            sx={{
              width: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              margin: "auto",
              mt: 2,
            }}
          >
            <Box
              component={"img"}
              src="./assets/EviteGuruLogo.svg"
              sx={{ width: "100%" }}
            />
          </Box>
          {/* ==== 👆 EVITEGURU topbar logo 👆   ===== */}

          {/*👇 topbar left menu list 👇 */}
          <List
            disablePadding={true}
            dense
            sx={{
              mt: 1,
              color: "black",
              borderTop: "1px solid",
              "& .MuiListItemText-root": { color: "black" },
            }}
          >
            <ListItem
              component={NavLink}
              to="/"
              onClick={handleDrawerToggle}

              // sx={{
              //   "& .active": {
              //     color: "rgba(121, 93, 168, 1)",
              //     fontWeight: "800",
              //   },
              // }}
            >
              <ListItemButton>
                <ListItemText>Home</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem
              component={NavLink}
              to="/browse_template"
              onClick={handleDrawerToggle}
            >
              <ListItemButton>
                <ListItemText>Templates</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem
              component={NavLink}
              to="/pricing"
              onClick={handleDrawerToggle}
            >
              <ListItemButton>
                <ListItemText>Pricing</ListItemText>
              </ListItemButton>
            </ListItem>

            {/*👆 topbar left menu list👆 */}
            {/*👇 topbar right buttons 👇 */}
            {userDetail?.isUser ? (
              <>
                <ListItem
                  component={NavLink}
                  to="/dashboard/account-setting"
                  onClick={handleDrawerToggle}
                >
                  <ListItemButton>
                    <ListItemText>Account</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem
                  component={NavLink}
                  to="/dashboard/my-events"
                  onClick={handleDrawerToggle}
                >
                  <ListItemButton>
                    <ListItemText>Dashboard</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemText
                      onClick={() => {
                        handleDrawerToggle();
                        props?.logoutHandler();
                      }}
                    >
                      Logout
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      handleDrawerToggle();
                      toggleLogInModal();
                    }}
                  >
                    <ListItemText>Log-in</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemText
                      onClick={() => {
                        handleDrawerToggle();
                        toggleRegisterModal();
                      }}
                    >
                      Sign up
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>

          <List
            disablePadding={true}
            dense
            sx={{
              color: "black",
              borderTop: "1px solid",
              mt: 2,
              "& .MuiListItemText-root": { color: "black" },
            }}
          >
            <ListItem sx={{ fontWeight: "bolder" }}>
              <ListItemButton>
                <Typography variant="h6">Additional Links</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                component="a"
                to="/termsAndConditions"
                target="_blank"
              >
                <ListItemText>Privacy Policy</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component="a" to="/privacyPolicy" target="_blank">
                <ListItemText>Terms and conditions</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          <List
            disablePadding={true}
            dense
            sx={{
              color: "black",
              borderTop: "1px solid",
              mt: 2,
              "& .MuiListItemText-root": { color: "black" },
            }}
          >
            <ListItem sx={{ fontWeight: "bolder" }}>
              <ListItemButton>
                <Typography variant="h6">Social Links</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                component="a"
                to="https://www.instagram.com/eviteguru/"
                target="_blank"
              >
                <ListItemText>
                  <Box
                    bgcolor="transparent"
                    component={"img"}
                    src="./assets/instagram.svg"
                  />
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          {/*👆 topbar right buttons👆 */}
          {/* ==== 👆 Left menu drawer for small screens 👆   ===== */}
        </Stack>
      </Drawer>
    </Box>
  );
};

export default SmallScreenDrawerMenu;
