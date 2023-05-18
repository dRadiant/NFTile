// components/DaoAddress.js
import { useDao } from '../../context/DAOContext';

import {
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Image,
  Box,
  Flex,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import jazzicon from '@metamask/jazzicon';

import { useEffect, useRef, useState } from 'react';
import { formattedAddress } from '../../lib/formattedAddress';

export const JazzIconGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!gridRef.current) {
      return;
    }

    const container = gridRef.current;
    for (let i = 0; i < 1; i++) {
      const el = jazzicon(100, Math.round(Math.random() * 10000000));
      container.appendChild(el);
    }
  }, []);

  return <Flex align={'center'} justify={'center'} ref={gridRef}></Flex>;
};

export const JazzIcon: React.FC<{ seed: number; size?: number }> = ({
  seed,
  size = 30,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const el = jazzicon(size, seed);
    ref.current.innerHTML = '';
    ref.current.appendChild(el);
  }, [seed]);

  return <div ref={ref}></div>;
};

export const DAOMenuItem = ({ daoAddress, setDaoAddress, name }) => {
  return (
    <MenuItem minH='48px' onClick={() => setDaoAddress(daoAddress)}>
      <JazzIcon seed={parseInt(daoAddress.slice(0, 10), 16)} />
      <Box as='span' pl='12px'>
        <Text fontSize='md' fontWeight='bold'>
          {name} ({formattedAddress(daoAddress)})
        </Text>
      </Box>
    </MenuItem>
  );
};

export const DAOMenu = () => {
  const { daoAddress, setDaoAddress } = useDao();

  const CRVDAO = '0xD533a949740bb3306d119CC777fa900bA034cd52';
  const ArbitrumDAO = '0xF3FC178157fb3c87548bAA86F9d24BA38E649B58';
  const GnosisMultisig = '0xFd9b9A6B5f99f854d36FFEB801AFe4CC7f7ab982';

  const getDaoName = (address: string) => {
    if (address === CRVDAO) {
      return 'CRV DAO';
    } else if (address === ArbitrumDAO) {
      return 'Arbitrum DAO';
    } else if (address === GnosisMultisig) {
      return 'NFTile DAO';
    } else {
      return 'Unknown DAO';
    }
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <Flex alignItems='center'>
          <JazzIcon seed={parseInt(daoAddress.slice(0, 10), 16)} size={22} />
          <Box as='span' pl='12px'>
            {getDaoName(daoAddress)} ({formattedAddress(daoAddress)})
          </Box>
        </Flex>
      </MenuButton>
      <MenuList>
        <DAOMenuItem
          daoAddress={CRVDAO}
          setDaoAddress={setDaoAddress}
          name='CRV DAO'
        />
        <DAOMenuItem
          daoAddress={ArbitrumDAO}
          setDaoAddress={setDaoAddress}
          name='Arbitrum DAO'
        />
        <DAOMenuItem
          daoAddress={GnosisMultisig}
          setDaoAddress={setDaoAddress}
          name='NFTile DAO'
        />
      </MenuList>
    </Menu>
  );
};
