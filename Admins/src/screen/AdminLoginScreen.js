import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Alogin } from "../redux/action/adminAction";
import FormContainer from "../component/FormContainer";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let [searchParam] = useSearchParams();
  let redirect = searchParam.get("redirect") || "/admin/template-list";

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo, error, loading } = adminLogin;
  // console.log(adminLogin);

  useEffect(() => {
    if (adminInfo) {
      navigate(redirect);
    }
  }, [navigate, adminInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(Alogin(email, password));
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading
          as="h1"
          mb="8"
          color="purple.300"
          fontSize="3xl"
          justifyContent="center"
        >
          Admin
        </Heading>
        {/* <button onClick={()=>google(auth,provider)}>Google</button> */}

        {/* {error && <Message type='error'>{error}</Message>} */}

        <form onSubmit={submitHandler}>
          <FormControl id="email">
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              required
              type="email"
              placeholder="username@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          <FormControl id="password">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              required
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="purple" mt="4" isLoading={loading}>
            Login
          </Button>
        </form>
        <Flex pt="10">
          <Text fontWeight="semibold">
            <Link as={RouterLink} to="/admin/send-otp">
              Forget-Password?
            </Link>
          </Text>
        </Flex>
      </FormContainer>
    </Flex>
  );
};

export default AdminLogin;
