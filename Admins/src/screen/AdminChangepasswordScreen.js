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
} from '@chakra-ui/react';
import { useState, useEffect  } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { Link as RouterLink, useNavigate , useSearchParams  } from "react-router-dom";
import { APasswordchange } from '../redux/action/adminAction'; 
import FormContainer from '../component/FormContainer'

const AdminChangepassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ email, setEmail ] = useState('');
    const [ code, setCode ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    
    const adminPasswordchange = useSelector((state) => state.adminPasswordchange);
    const { adminInfo , loading, error } = adminPasswordchange

    const submitHandler = (e) => {
        e.preventDefault();
        if ( password !== confirmPassword) {
            console.log('Password not match')      // here we adding error soon
        }else {
            dispatch(APasswordchange(email,code,password))
            // navigate('/admin-login')
        }
    }
  return (
    
    <Flex w='full' alignItems='center' justifyContent='center' py='5'>
    <FormContainer>
        <Heading as='h1' mb='8' color='purple.300' fontSize='3xl'>
          Create-Password
        </Heading>

        {/* {error && <Message type='error'>{error}</Message>}
        {message && <Message type='error'>{message}</Message>} */}

        <form onSubmit={submitHandler}>
            <FormControl id='email'>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input 
                    id='email'
                    required
                    type='email'
                    placeholder='UserName@gmail.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <Spacer h='3' />

            <FormControl id='code'>
                <FormLabel htmlFor='code'>Otp</FormLabel>
                <Input 
                    id='code'
                    required
                    type='text'
                    placeholder='Enter Otp'
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            </FormControl>
            <Spacer h='3' />

            <FormControl id='password'>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input 
                    id='password'
                    type='password'
                    placeholder='**********************'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>
            <Spacer h='3' />

            <FormControl id='confirmPassword'>
                <FormLabel htmlFor='confirmpassword'>confirmPassword</FormLabel>
                <Input 
                    id='confirmPassword'
                    type='password'
                    placeholder='**********************'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </FormControl>
        
            <Button type='submit' colorScheme='purple' mt='4' isLoading={loading}
            // as={RouterLink} to='/admin-login'
            >
                Register
            </Button>
        </form>
    </FormContainer>
</Flex>


  )
}

export default AdminChangepassword;