import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { HiOutlineMenuAlt3, HiUser } from "react-icons/hi";
import { Alogout } from "../redux/action/adminAction";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  console.log(adminInfo);

  const logoutHandler = () => {
    dispatch(Alogout());
    navigate("/");
  };

  return (
    <Flex
      as="header"
      align="center"
      justifyContent="space-between"
      wrap="wrap"
      py="3"
      px="6"
      bgColor="whiteAlpha.800"
      shadow="0px 0px 10px 1px"
      w="100%"
      top="0"
      pos="fixed"
      zIndex="10"
    >
      <Heading
        as="h1"
        color="purple"
        fontWeight="bold"
        size="md"
        letterSpacing="md"
      >
        <Link
          as={RouterLink}
          to="/"
          _hover={{ color: "orange", textDecor: "none" }}
        >
          Eviteguru
        </Link>
      </Heading>

      <Box
        display={{ base: "block", md: "none", sm: "block" }}
        onClick={() => setShow(!show)}
      >
        <Icon as={HiOutlineMenuAlt3} color="black" w="6" h="6" />
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
      >
        {adminInfo ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<IoChevronDown />}
              _hover={{ textDecor: "none", opacity: "0.7" }}
            >
              {adminInfo.email}
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link
            as={RouterLink}
            to="/admin/login"
            fontSize="sm"
            letterSpacing="wide"
            // color='whiteAlpha.600'
            color="purple"
            fontWeight="bold"
            textTransform="uppercase"
            mr="5"
            display="flex"
            alignItems="center"
            _hover={{ color: "orange" }}
            mt={{ base: 4, md: 0 }}
          >
            <Icon as={HiUser} mr="1" w="4" h="4" />
            Login
          </Link>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
