import React from 'react'

const EmailotpScreen = () => {
  return (
    <div>EmailotpScreen</div>
  )
}

export default EmailotpScreen

// import {
// 	Button,
// 	Flex,
// 	FormControl,
// 	FormLabel,
// 	Heading,
// 	Input,
// 	Link,
// 	Spacer,
// 	Text,
// } from '@chakra-ui/react';
// import { useEffect, useState  } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom"
// import { sendotp } from "../redux/action/userAction";
// import FormContainer from '../components/FormContainer';

// const EmailsendOtp = () => {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // let [searchParam] = useSearchParams();
//     // let redirect = searchParam.get('redirect') || '/'

//     const [ email, setEmail ] = useState('');

//     const userEmailOtp = useSelector((state) => state.userEmailOtp);
//     const { userInfo, error, lodaing } = userEmailOtp

//     // useEffect(() => {
//     //     if(userInfo){
//     //         navigate(redirect)
//     //     }
//     // },[navigate,userInfo,redirect]);

//     const submitHandler = (e) => {
//         e.preventDefault();
//         dispatch(sendotp(email))
//         // navigate('/change-password')
//     }

//     return (
//         <Flex w='full' alignItems='center' justifyContent='center' py='5'>
//             <FormContainer>
//                 <Heading as='h1' mb='8' color='purple.300' fontSize='3xl'>
//                     Email
//                 </Heading>
//                 <form onSubmit={submitHandler}>
//                     <FormControl id='email'>
//                         <FormLabel htmlFor='email'>Email</FormLabel>
//                         <Input 
//                             id='email'
//                             required
//                             type='email'
//                             placeholder='UserEmail@gmail.com'
//                             value={email}
//                             onChange={(e) => (setEmail(e.target.value))}          
//                         />
//                     </FormControl>
//                     <Spacer h='3' />
//                     <Button type='submit' colorScheme='purple' mt='4' isLoading={lodaing} 
//                     // as={RouterLink} to={'/change-password'}
//                     >
//                         send-Otp
//                     </Button>
//                 </form>
//                 <Flex pt='5'>
//                 <Text fontWeight='semibold'>
//                    {/* <Link as={RouterLink} to='/change-password'>
//                         Click here to Create-Password
//                    </Link> */}
//                 </Text>
//            </Flex>
//            </FormContainer>
//         </Flex>
//     );
// }

// export default EmailsendOtp;