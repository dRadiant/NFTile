import { Box, Image, Text, VStack, Link } from '@chakra-ui/react';

import { JazzIcon } from './DAOMenu';

export const NFTCard = ({
  image = 'false',
  title,
  description,
  jazzicon = false,
  seed = 0,
}) => {
  const imageSize = '200px';

  if (jazzicon) {
    return (
      <Box margin={3}>
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Box
            display='flex'
            justifyContent='center'
            width={imageSize}
            height={imageSize}
            overflow='hidden' // Add overflow hidden
          >
            <JazzIcon seed={seed} size={parseInt(imageSize)} />
          </Box>
          <VStack p='6' spacing={3} align='start'>
            <Text fontWeight='bold' fontSize='xl'>
              {title}
            </Text>
          </VStack>
        </Box>
      </Box>
    );
  }
  return (
    <Box margin={3}>
      <Box
        maxW='sm'
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        boxShadow='lg'
      >
        <Link href='https://testnet-zkevm.polygonscan.com/token/0xbb01cc89fe8d659dea1454611127ee6f830ffa09'>
          <Image src={image} alt={title} objectFit='cover' boxSize={'200'} />
        </Link>
        <VStack p='6' spacing={3} align='start'>
          <Text fontWeight='bold' fontSize='xl'>
            {title}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};
