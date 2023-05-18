import { Flex, Heading } from '@chakra-ui/react';

export const MarketingHero = ({ title }: { title: string }) => (
  <Flex
    justifyContent='center'
    alignItems='center'
    height='20vh'
    bgGradient='linear(to-l, heroGradientStart, heroGradientEnd)'
    bgClip='text'
  >
    <Heading fontSize='6vw' userSelect='none'>
      {title}
    </Heading>
  </Flex>
);

MarketingHero.defaultProps = {
  title: 'Fractional NFT DAO Treasuries 🚀',
};
