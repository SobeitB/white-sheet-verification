import {useIsWhiteList} from "./model";

export const VerifyaAccounts = () => {
   const {callIsVerify, isVerify} = useIsWhiteList();

   return(
      <div>
         <button onClick={callIsVerify}>
            is my account on the whitelist?
            <br />
            {isVerify === 'not result' ? isVerify :
               isVerify ? 'you are on the white list' : 'you are not on the white list'
            }
         </button>
      </div>
   )
}