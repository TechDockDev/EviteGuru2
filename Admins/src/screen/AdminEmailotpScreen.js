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
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Asendotp } from "../redux/action/adminAction";
import FormContainer from "../component/FormContainer";

const AdminEmailsendOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // let [searchParam] = useSearchParams();
  // let redirect = searchParam.get('redirect') || '/'

  const [email, setEmail] = useState("");

  const adminEmailOtp = useSelector((state) => state.adminEmailOtp);
  const { adminInfo, error, lodaing } = adminEmailOtp;

  // useEffect(() => {
  //     if(adminInfo){
  //         navigate('/admin=change-password')
  //     }
  // },[navigate,adminInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(Asendotp(email));
    navigate("/admin/change-password");
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading as="h1" mb="8" color="purple.300" fontSize="3xl">
          Email
        </Heading>
        <form onSubmit={submitHandler}>
          <FormControl id="email">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              required
              type="email"
              placeholder="UserEmail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Spacer h="3" />
          <Button
            type="submit"
            colorScheme="purple"
            mt="4"
            isLoading={lodaing}
            // as={RouterLink} to={'/admin=change-password'}
          >
            send-Otp
          </Button>
        </form>
        <Flex pt="5">
          <Text fontWeight="semibold"></Text>
        </Flex>
      </FormContainer>
    </Flex>
  );
};

export default AdminEmailsendOtp;
