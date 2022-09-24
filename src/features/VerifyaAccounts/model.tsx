import {useAppSelector} from "app/model/hooks";
import Signature from 'shared/lib/contracts/signature.json'
import {utils}  from "ethers";
import {useState} from "react";

export const useIsWhiteList = () => {
   const {contract, address} = useAppSelector(state => state.blockChainSlice);
   const [isVerify, setIsVerify] = useState<string | boolean>('not result');

   const callIsVerify = async () => {
      const signatures:Record<string, string> = Signature;
      const dataHash = utils.id(address)

      const result = await contract._verify(dataHash, signatures[address]);
      setIsVerify(result)
   }

   return {callIsVerify, isVerify}
}