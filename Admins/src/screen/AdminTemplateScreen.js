import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Heading,
	Image,
	Link,
	Select,
	Text,
	Textarea,
    space,
    Spacer,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { ATemplateDetails } from '../redux/action/adminAction';


const AdminTemplateScreen = () => {

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const { id } = useParams();

    const adminTemplateDetails = useSelector((state) => state.adminTemplateDetails);
    const { template, loading , error } = adminTemplateDetails

    useEffect(() => {
        dispatch(ATemplateDetails(id))
    },[id,dispatch])
  return (
    <>
					<Grid templateColumns='5fr 4fr 3fr' gap='10'>
						{/* Column 1 */}
						<Image src={`data:image/*;base64,${template.sampleimage}`} alt={template.name} borderRadius='md' />

						{/* Column 2 */}
						<Flex direction='column'>
							<Heading as='h2' fontSize='4xl' mb='4'>
								{template.name}
							</Heading>

							<Text>{template.description}</Text>
                            {/* <Spacer h='1' /> */}
                            <Flex
                                py='10'
                            >
                            <Button
								bg='gray.800'
								colorScheme='teal'
								my='2'
								textTransform='uppercase'
								letterSpacing='wide'
								as={RouterLink}
								to={`/admin/template/edit/${template._id}`}>                            
                                customized
							</Button>
                            </Flex>
						</Flex>
					</Grid>
        </>
  )
}

export default AdminTemplateScreen