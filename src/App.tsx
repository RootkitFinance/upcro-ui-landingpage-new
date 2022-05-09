import React from 'react';
import './assets/css/App.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { ChakraProvider } from '@chakra-ui/react'
import { TransactionResponse } from "@ethersproject/providers";
import Web3ReactManager from './components/web3ReactManager';
import TransactionContext from './contexts/TransactionContext';
import { AppContextProvider } from './contexts/AppContext';
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import { Provider } from 'react-redux'
import store from './state'
import LocalStorageContextProvider, { Updater as LocalStorageContextUpdater } from './contexts/LocalStorage'
import TokenDataContextProvider from './contexts/TokenData'
import ApplicationContextProvider from './contexts/Application'

function App() {
  const addPendingTransaction = (description: string, txResponse: TransactionResponse) => {
    txResponse.wait().then(txReceipt => {
      // addToast(
      //   txReceipt.status === 1 ? IconType.Success : IconType.Failure,
      //   `${description} ${txReceipt.status === 1 ? "Completed" : "Failed"}`,
      //   txReceipt.transactionHash)
    })
  }

  function Updaters() {
    return (
      <>
        <ListsUpdater />
        <ApplicationUpdater />
        <TransactionUpdater />
        <MulticallUpdater />
      </>
    )
  }

  function ContextProviders({ children }:{children:any}) {
    return (
      <LocalStorageContextProvider>
        <ApplicationContextProvider>
          <TokenDataContextProvider>
              {children}
          </TokenDataContextProvider>
        </ApplicationContextProvider>
      </LocalStorageContextProvider>
    )
  }
  return (
    <ChakraProvider>
      <ContextProviders>
       <Provider store={store}>
          <TransactionContext.Provider value={{ addPendingTransaction }}>
            <Updaters />
            <AppContextProvider>
              <Web3ReactManager>
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </Web3ReactManager>
            </AppContextProvider>
           </TransactionContext.Provider> 
        </Provider>
      </ContextProviders>
     </ChakraProvider>
  );
}

export default App;
