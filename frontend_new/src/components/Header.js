import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
// import { Dis } from '@headlessui/react';
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { logout } from "../oldredux/action/userAction";
import SmallScreenDrawerMenu from "./SmallScreenDrawerMenu";
import LogInModal from "../screens/LoginModal/LogInModal";
import RegisterModal from "../screens/RegisterModal/RegisterModal";
import FooterSection from "../screens/HomeScreen/FooterSection";

const Header = () => {
  // temp state to controle topbar right corner controls
  // const [isLoggedInd, setIsLoggedInd] = useState(false);
  // temp state to controle topbar right corner controls
  // =====================================
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const toggleLogInModal = () => {
    setOpenLoginModal(!openLoginModal);
  };
  const toggleRegisterModal = () => {
    setOpenRegisterModal(!openRegisterModal);
  };
  // ===================================
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ==================
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userDetail} = useSelector((state) => state);
  console.log("User Login:->",userDetail);
  

  // const usergooglefacebookLogin = useSelector(
  //   (state) => state.usergooglefacebookLogin
  // );
  // const { googlefacebookInfo } = usergooglefacebookLogin;
  // console.log("google login:->", googlefacebookInfo);


  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Stack
        sx={{ maxWidth: "1440px", margin: "auto" }}
        justifyContent="center"
        // border='10px solid red'
      >
        <AppBar
          elevation={1}
          sx={{
            bgcolor: "white",
            display: {
              xl: "block",
              lg: "block",
              md: "block",
              sm: "block",
              xs: "none",
            },
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              width: "100%",
              maxWidth: "1440px",
              height: "80px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
              padding: "0px 20px",
              margin: "auto",
            }}
          >
            <Stack direction={"row"}>
              {/* ==== 👇 EVITEGURU topbar logo👇   ===== */}
              <Box
                component={NavLink}
                sx={{
                  width: "150px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {/* <Box
                  component={"img"}
                  src="./assets/EviteGuruLogo.svg"
                  sx={{ width: "100%" }}
                /> */}
                <Link to="/">
                  <Box
                    component={"img"}
                    src="./assets/EviteGuruLogo.svg"
                    sx={{ width: "100%" }}
                  />
                </Link>
                {/* <Typography variant="h1" fontFamily={'Comforter Brush'}  fontSize="40px">EviteGuru</Typography> */}
              </Box>
              {/* ==== 👆 EVITEGURU topbar logo 👆   ===== */}

              {/*👇 topbar left menu list 👇 */}
              <List disablePadding={true} dense sx={{ display: "flex" }}>
                <ListItem onClick={() => navigate('/')}>
                  <ListItemButton
                    disableGutters
                    sx={{ "&:hover": { bgcolor: "white" } }}
                  >
                    <ListItemText>Home</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem onClick={() => navigate('/browse_template')}>
                  <ListItemButton
                    disableGutters
                    sx={{ "&:hover": { bgcolor: "white" } }}
                  >
                    <ListItemText>Template</ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
              {/*👆 topbar left menu list👆 */}
            </Stack>
            {/* ============================================ */}
            {/*👇 topbar right buttons 👇 */}
            {/* {isLoggedInd ? ( */}
            {userDetail? (
              <Box
                sx={{
                  width: "150px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  //   border: "1px solid green",
                }}
              >
                <Box
                  sx={{
                    width: "90px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    //    border: "1px solid green",
                  }}
                >
                  {/* <IconButton>
                    <SettingsIcon />
                  </IconButton> */}
                  {/* <IconButton>
                              <NotificationsActiveIcon />
                             
                           </IconButton> */}
                  <IconButton>
                    <Typography variant="h6" component="p" fontSize="10px">
                      {/* {userDetail?.?.email} */}
                    </Typography>
                  </IconButton>
                </Box>
                <Tooltip>
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar src="./assets/avatarDefault.svg" />
                  </IconButton>
                </Tooltip>
                {/* <Typography variant="h6" component="h6" fontSize="10px">
                              {userDetail?.?.email}
                           </Typography> */}
                {/* =========================================== */}
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  // open={true}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 24,
                        width: 20,
                        height: 20,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        borderTop: "1px solid #3B285B",
                        borderLeft: "1px solid #3B285B",

                        //  borderRadius:"8px",
                        //  bgcolor:"transparent",
                        zIndex: 0,
                      },
                    },
                  }}
                  sx={{
                    bgcolor: "transparent",
                    "& ul": {
                      p: 2,
                      bgcolor: "rgba(206, 197, 220, 0.46)",
                    },
                    "& .MuiPaper-root": {
                      bgcolor: "transparent",
                      border: "1px solid #3B285B",
                      borderRadius: "8px",
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {" "}
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      color: "#3B285B",
                      fontWeight: "800",
                      padding: "10px",
                      borderBottom: "2px solid grey",
                    }}
                  >
                    {/* {userDetail?.?.email} */}
                    {userDetail?.email}
                  </MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
                {/* ==================================================== */}
              </Box>
            ) 
            // : 
            // googlefacebookInfo ? (
            //   <Box
            //     sx={{
            //       width: "150px",
            //       display: "flex",
            //       justifyContent: "space-between",
            //       alignItems: "center",
            //       //   border: "1px solid green",
            //     }}
            //   >
            //     <Box
            //       sx={{
            //         width: "90px",
            //         display: "flex",
            //         justifyContent: "space-between",
            //         alignItems: "center",
            //         //    border: "1px solid green",
            //       }}
            //     >
                 
            //       <IconButton>
            //         <Typography variant="h6" component="p" fontSize="10px">
                   
            //         </Typography>
            //       </IconButton>
            //     </Box>
            //     <Tooltip>
            //       <IconButton
            //         onClick={handleClick}
            //         size="small"
            //         sx={{ ml: 2 }}
            //         aria-controls={open ? "account-menu" : undefined}
            //         aria-haspopup="true"
            //         aria-expanded={open ? "true" : undefined}
            //       >
            //         <Avatar src="./assets/avatarDefault.svg" />
            //       </IconButton>
            //     </Tooltip>
               
            //     <Menu
            //       anchorEl={anchorEl}
            //       id="account-menu"
            //       open={open}
            //       // open={true}
            //       onClose={handleClose}
            //       onClick={handleClose}
            //       PaperProps={{
            //         elevation: 0,
            //         sx: {
            //           overflow: "visible",
            //           filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            //           mt: 1.5,
            //           "&:before": {
            //             content: '""',
            //             display: "block",
            //             position: "absolute",
            //             top: 0,
            //             right: 24,
            //             width: 20,
            //             height: 20,
            //             bgcolor: "background.paper",
            //             transform: "translateY(-50%) rotate(45deg)",
            //             borderTop: "1px solid #3B285B",
            //             borderLeft: "1px solid #3B285B",

            //             //  borderRadius:"8px",
            //             //  bgcolor:"transparent",
            //             zIndex: 0,
            //           },
            //         },
            //       }}
            //       sx={{
            //         bgcolor: "transparent",
            //         "& ul": {
            //           p: 2,
            //           bgcolor: "rgba(206, 197, 220, 0.46)",
            //         },
            //         "& .MuiPaper-root": {
            //           bgcolor: "transparent",
            //           border: "1px solid #3B285B",
            //           borderRadius: "8px",
            //         },
            //       }}
            //       transformOrigin={{ horizontal: "right", vertical: "top" }}
            //       anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            //     >
            //       {" "}
            //       <MenuItem
            //         onClick={handleClose}
            //         sx={{
            //           color: "#3B285B",
            //           fontWeight: "800",
            //           padding: "10px",
            //           borderBottom: "2px solid grey",
            //         }}
            //       >
            //         {/* {userDetail?.?.email} */}
            //         {googlefacebookInfo.email}
            //       </MenuItem>
            //       <MenuItem onClick={handleClose}>My account</MenuItem>
            //       <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            //     </Menu>
            //     {/* ==================================================== */}
            //   </Box>
            // ) 
            : ""
            // (
            //   <Box
            //     sx={{
            //       width: "200px",
            //       display: "flex",
            //       justifyContent: "space-between",
            //       alignItems: "center",
            //       //   border: "1px solid green",
            //     }}
            //   >
            //     <Button
            //       disableElevation
            //       variant="contained"
            //       sx={{ color: "#fff" }}
            //       onClick={toggleLogInModal}
            //     >
            //       Login
            //     </Button>
            //     <Button
            //       disableElevation
            //       variant="outlined"
            //       onClick={toggleRegisterModal}
            //     >
            //       Sign up
            //     </Button>
            //   </Box>
            // )
            }
            {/*👆 topbar right buttons👆 */}
          </Toolbar>
        </AppBar>
        <SmallScreenDrawerMenu
          toggleLogInModal={toggleLogInModal}
          toggleRegisterModal={toggleRegisterModal}
        />
        {/* ======================================================================== */}
        <LogInModal
          openLoginModal={openLoginModal}
          toggleLogInModal={toggleLogInModal}
          toggleRegisterModal={toggleRegisterModal}
        />
        <RegisterModal
          openRegisterModal={openRegisterModal}
          toggleRegisterModal={toggleRegisterModal}
        />
        {/* ======================================================================== */}

        {/*👇 All the scenes will be rendered  here 👇 */}

        <Outlet />
        {/*👆 All the scenes will be rendered here 👆 */}

        <FooterSection />
      </Stack>
    </>
  );
};

export default Header;

// import {
// 	Box,
// 	Button,
// 	Flex,
// 	Heading,
// 	Icon,
// 	Link,
// 	Menu,
// 	MenuButton,
// 	MenuItem,
// 	MenuList,
// } from '@chakra-ui/react';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { IoChevronDown } from 'react-icons/io5';
// import { HiOutlineMenuAlt3, HiUser } from 'react-icons/hi';
// import { logout } from '../redux/action/userAction';

// const Header = () => {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [show, setShow] = useState(false);

//     const userLogin = useSelector((state) => state.userLogin);
//     const { userDetail?. } = userLogin;

// 	console.log(userDetail?.)

//     const logoutHandler = () => {
//         dispatch(logout());
//         navigate('/');
//     }

//   return (
//     <Flex
// 			as='header'
// 			align='center'
// 			justifyContent='space-between'
// 			wrap='wrap'
// 			py='3'
// 			px='6'
// 			// bgColor='gray.800'
//             bgColor='whiteAlpha.800'
//             shadow="0px 0px 10px 1px"
// 			w='100%'
// 			top='0'
// 			pos='fixed'
// 			zIndex='10'>

// 			<Heading
// 				as='h1'
// 				// color='whiteAlpha.800'
//                 color="purple"
// 				fontWeight='bold'
// 				size='md'
// 				letterSpacing='md'>
// 				<Link
// 					as={RouterLink}
// 					to='/'
// 					_hover={{ color: 'orange', textDecor: 'none' }}>
// 					Wedding card
// 				</Link>
// 			</Heading>

// 			<Box
// 				display={{ base: 'block', md: 'none', sm: 'block' }}
// 				onClick={() => setShow(!show)}>
// 				<Icon as={HiOutlineMenuAlt3} color='black' w='6' h='6' />
// 			</Box>

// 			<Box
// 				display={{ base: show ? 'block' : 'none', md: 'flex' }}
// 				width={{ base: 'full', md: 'auto' }}
// 				alignItems='center'>
// 					{/* { adminInfo */}
// 				{userDetail?.
// 				? (
// 					<Menu>
// 						<MenuButton
// 							as={Button}
// 							rightIcon={<IoChevronDown />}
// 							_hover={{ textDecor: 'none', opacity: '0.7' }}>
// 							{userDetail?.?.email}
// 						</MenuButton>
// 						<MenuList>
// 							<MenuItem as={RouterLink} to='/profile'>
// 								Profile
// 							</MenuItem>
// 							<MenuItem onClick={logoutHandler}>Logout</MenuItem>
// 						</MenuList>
// 					</Menu>
// 				) : (
// 					<Link
// 						as={RouterLink}
// 						to='/login'
// 						fontSize='sm'
// 						letterSpacing='wide'
// 						// color='whiteAlpha.600'
//                         color='purple'
// 						fontWeight='bold'
// 						textTransform='uppercase'
// 						mr='5'
// 						display='flex'
// 						alignItems='center'
// 						_hover={{ color: 'orange' }}
// 						mt={{ base: 4, md: 0 }}>
// 						<Icon as={HiUser} mr='1' w='4' h='4' />
// 						Login
// 					</Link>
// 				)}
// 			</Box>
// 		</Flex>
// 	);
// };

// export default Header
