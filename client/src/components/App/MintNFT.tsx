import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
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
  VStack,
  Link
} from '@chakra-ui/react';

import MyToken from '../../assets/MyToken.json';

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function MintNFTForm() {
  const [tokenId, setTokenId] = useState('');
  const debouncedTokenId = useDebounce(tokenId);
  const { address } = useAccount();
  const { abi: mintableABI, address: mintableAddress } = MyToken;

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: mintableAddress as `0x${string}`,
    abi: mintableABI,
    functionName: 'safeMint',
    args: [address],
    enabled: Boolean(address),
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <>
      <Card align='center'>
        <CardHeader>
          <Heading size='md'>🍵 Mint NFT</Heading>
        </CardHeader>
        <CardBody>
          <Stack direction='column' spacing={4}>
            <Text>Mint an NFT on the Polygon ZKEVM Testnet here:</Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              write?.();
            }}
          >
            <VStack>
            <Button
              type='submit'
              colorScheme='purple'
              disabled={!write || isLoading}
              mt={-4}
              mb={4}
            >
              {isLoading ? 'Minting...' : 'Mint'}
            </Button>
            {isSuccess && (
              <VStack>
                <Heading size="md">Successfully minted your NFT!</Heading>
                <Link href={`https://testnet-zkevm.polygonscan.com/tx/${data?.hash}`}>Polygonscan</Link>
              </VStack>
            )}
            {(isPrepareError || isError) && (
              <div>Error: {(prepareError || error)?.message}</div>
            )}
            </VStack>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
