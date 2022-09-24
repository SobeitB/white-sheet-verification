import { withProviders } from "./providers";
import {ConnectMetamask} from "features/connectMetamask";
import {ConnectOtherWallets} from "features/connectOtherWallets";
import {InitBlockChainData} from "processes/initWeb3State";
import {VerifyaAccounts} from "../features/VerifyaAccounts";
import {useAppSelector} from "./model/hooks";

function App() {
   const {address} = useAppSelector(state => state.blockChainSlice)
   return (
      <InitBlockChainData>
         <div className="App">
            {address !== '0x' ?
               <VerifyaAccounts />
               :
               <>
                  <ConnectMetamask />
                  <ConnectOtherWallets />
               </>
            }

         </div>
      </InitBlockChainData>
   );
}

export default withProviders(App);
