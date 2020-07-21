/* eslint-disable react-hooks/exhaustive-deps */
import "./App.scss";
import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
// Containers
import Landing from "containers/landing";
import Account from "containers/account";
import Block from "containers/block";
// Components
import Transaction from "containers/transaction";
import Navbar from "components/navbar";
// State
import { GlobalPropertiesContext, GlobalPropertiesActionType } from "state";
// Services
import BlockchainService from "services/Blockchain.service";
import MarketService from "services/Market.service";

const MARKET_DATA_INTERVAL = 60 * 1000;

function App() {
  const { dispatch } = useContext(GlobalPropertiesContext);

  const getPrices = () => {
    MarketService.getPrice()
      .then((price) => {
        dispatch({
          type: GlobalPropertiesActionType.SET_PRICES,
          price,
        });
      })
      .catch((error) => {
        console.error("An error occured when retrieving prices: ", error);
      });
  };

  useEffect(() => {
    // TODO: Maybe get this data via context??
    async function iterateBlocks(): Promise<void> {
      try {
        for await (const block of await BlockchainService.getBlocks()) {
          const properties = await BlockchainService.getBlockchainInfo();
          dispatch({
            type: GlobalPropertiesActionType.UPDATE_GLOBAL_PROPERTIES,
            properties,
          });

          dispatch({
            type: GlobalPropertiesActionType.ADD_RECENT_BLOCK,
            block: {
              id: block.block_id,
              transactionsLength: block.transactions.length,
              witness: block.witness,
              // TODO: do something with missing block number....
              number: (block.transactions[0] as any)?.block_num,
            },
          });
        }
      } catch (error) {
        console.log("handled", error);
      }
    }

    iterateBlocks();
  }, []);

  useEffect(() => {
    getPrices();
    
    const interval = setInterval(() => {
      getPrices();
    }, MARKET_DATA_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="hiveyt-app">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/a/:accountName" component={Account} />
        <Route exact path="/b/:blockNumber" component={Block} />
        <Route exact path="/tx/:transactionId" component={Transaction} />
      </Switch>
      {/* / */}
      {/* /[name] witness | account*/}
      {/* /blocks */}
      {/* /b/[id] */}
      {/* /transactions */}
      {/* /tx/[transactionId] */}
    </div>
  );
}

export default App;
