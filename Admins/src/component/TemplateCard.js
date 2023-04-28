import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { ATemplateList } from '../redux/action/adminAction';


const TemplateCard = ( { template }) => {
	// const dispatch = useDispatch();

    // const adminTemplateList = useSelector((state) => state.adminTemplateList);
    // const { template, loading , error } = adminTemplateList;
    // console.log(template)

    // useEffect(() => {
    //     dispatch(ATemplateList());
    // },[dispatch])
	console.log("Single:->",template)
	// console.log(total)
	return (
	<Link
		as={RouterLink}
		to={`/admin/template/${template._id}`}
		_hover={{ textDecor: 'none' }}
	>
		<Box
			textDecorationLine='none'
			maxW='sm'
			borderRadius='lg'
			bgColor='white'
			overflow='hidden'
			_hover={{ shadow: 'md' }}>
			<Image
				src={`data:image/*;base64,${template?.sampleimage}`}
				alt={template.name}
				h='430px'
				w='full'
				objectFit='cover'
			/>
			<Flex py='5' px='4' direction='column' justifyContent='space-between'>
				<Heading as='h4' fontSize='lg' mb='3' 
					textDecorationLine='none'
				>
					{template.name}
				</Heading>
				{/* <Text>{template.total}</Text> */}
				<Flex alignItems='center' justifyContent='space-between'>
					{/* <Rating value={product.rating} /> */}
					<Text fontSize='2xl' fontWeight='semibold' color='Purple.200' textDecorationLine='none'>
						{template.description}
					</Text>
				</Flex>
			</Flex>
		</Box>
	</Link>
	)
}

export default TemplateCard;
