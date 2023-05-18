import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  useContractRead,
  useContract,
  useSigner,
} from 'wagmi';

import { useEffect, useState } from 'react';

import {
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Text,
  Input,
  Stack,
  FormControl,
  Spacer,
} from '@chakra-ui/react';

import MyToken from '../../assets/MyToken.json';

import { ethers } from 'ethers';
import { NFTCard } from './NFTCard';

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function GetUserNFTs() {
  const [myTokens, setMyTokens] = useState([]);
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const { abi: mintableABI, address: mintableAddress } = MyToken;

  const { data, isError, isLoading } = useContractRead({
    address: mintableAddress as `0x${string}`,
    abi: mintableABI,
    functionName: 'balanceOf',
    args: [address],
  });
  const {
    data: data1,
    isError: isError1,
    isLoading: isL,
  } = useContractRead({
    address: mintableAddress as `0x${string}`,
    abi: mintableABI,
    functionName: 'symbol',
  });

  // console.log(signer); Signer takes about 2-3 function calls in order to register

  const loadStuff = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let mtkn = new ethers.Contract(
      mintableAddress as `0x${string}`,
      mintableABI,
      signer
    );

    let tokensInUserWallet = [];

    for (let i = 0; i < Infinity; i++) {
      try {
        tokensInUserWallet.push(
          await mtkn.tokenOfOwnerByIndex(await signer.getAddress(), i)
        );
      } catch (e) {
        break;
      }
    }

    console.log(tokensInUserWallet);
    setMyTokens(tokensInUserWallet);
  };

  useEffect(() => {
    loadStuff();
    const interval = setInterval(() => loadStuff(), 2000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <>
      {myTokens.map((token, index) => (
        <NFTCard
          key={index}
          title={`Mock NFT #${token}`}
          seed={token}
          description='MOCK NFT'
          jazzicon={true}
        />
      ))}
    </>
  );
}
