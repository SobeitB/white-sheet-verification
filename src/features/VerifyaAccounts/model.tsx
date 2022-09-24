import {useAppSelector} from "app/model/hooks";
import Signature from 'shared/lib/contracts/signature.json'

export const useIsWhiteList = () => {
   const {contract} = useAppSelector(state => state.blockChainSlice);

   const callIsVerify = async () => {
      console.log(JSON.parse(Signature));
      // await contract._verify();
   }

   return callIsVerify
}