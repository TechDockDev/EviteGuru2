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
// import { useState, useEffect  } from "react";
// import { useSelector, useDispatch  } from "react-redux";
// import { Link as RouterLink, useNavigate , useSearchParams  } from "react-router-dom";
// import { passwordchange } from "../redux/action/userAction";
// import FormContainer from '../components/FormContainer';

// const Changepassword = () => {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [ email, setEmail ] = useState('');
//     const [ code, setCode ] = useState('');
//     const [ password, setPassword ] = useState('');
//     const [ confirmPassword, setConfirmPassword ] = useState('');
    
//     const userPasswordchange = useSelector((state) => state.userPasswordchange);
//     const { userInfo , loading, error } = userPasswordchange

//     // useEffect(() => {
//     //     // if (userInfo) {
//     //     //     navigate(redirect)
//     //     // }
        
//     // },[userInfo,navigate,redirect])
    
//     const submitHandler = (e) => {
//         e.preventDefault();
//         if ( password !== confirmPassword) {
//             console.log('Password not match')      // here we adding error soon
//         }else {
//             dispatch(passwordchange(email,code,password))
//         }
//     }
//   return (
    
//     <Flex w='full' alignItems='center' justifyContent='center' py='5'>
//     <FormContainer>
//         <Heading as='h1' mb='8' color='purple.300' fontSize='3xl'>
//           Create-Password
//         </Heading>

//         {/* {error && <Message type='error'>{error}</Message>}
//         {message && <Message type='error'>{message}</Message>} */}

//         <form onSubmit={submitHandler}>
//             <FormControl id='email'>
//                 <FormLabel htmlFor='email'>Email address</FormLabel>
//                 <Input 
//                     id='email'
//                     required
//                     type='email'
//                     placeholder='UserName@gmail.com'
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//             </FormControl>
//             <Spacer h='3' />

//             <FormControl id='code'>
//                 <FormLabel htmlFor='code'>Otp</FormLabel>
//                 <Input 
//                     id='code'
//                     required
//                     type='text'
//                     placeholder='Enter Otp'
//                     value={code}
//                     onChange={(e) => setCode(e.target.value)}
//                 />
//             </FormControl>
//             <Spacer h='3' />

//             <FormControl id='password'>
//                 <FormLabel htmlFor='password'>Password</FormLabel>
//                 <Input 
//                     id='password'
//                     type='password'
//                     placeholder='**********************'
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//             </FormControl>
//             <Spacer h='3' />

//             <FormControl id='confirmPassword'>
//                 <FormLabel htmlFor='confirmpassword'>confirmPassword</FormLabel>
//                 <Input 
//                     id='confirmPassword'
//                     type='password'
//                     placeholder='**********************'
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//             </FormControl>
        
//             <Button type='submit' colorScheme='purple' mt='4' isLoading={loading}>
//                 Register
//             </Button>
//         </form>
//     </FormContainer>
// </Flex>


//   )
// }

// export default Changepassword;