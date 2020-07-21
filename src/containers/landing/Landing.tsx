import "./Landing.scss";
import React, { useContext, useEffect, useState } from "react";
import Blocks from "components/blocks";
import { Link } from "react-router-dom";

import { GlobalPropertiesContext } from "state";
// import Chart from "chart.js";
// import MarketService, { HivePrice } from "services/Market.service";
import Loading from "components/loading";
import PriceChart from "components/pricechart";
import { formatDate } from "utils/Date";

const getLastIrreversibleClass = (value: number) => {
  if (value > 20 && value < 60) {
    return "orange";
  } else if (value > 60) {
    return "red";
  } else {
    return "green";
  }
};

// TODO: get market data each 5 minutes
const Landing = () => {
  const {
    state: { blockchainProperties, price },
  } = useContext(GlobalPropertiesContext);
  const [loading, setLoading] = useState(true);
  // const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (blockchainProperties.head_block_number) {
      setLoading(false);
    }
  }, [blockchainProperties]);

  const {
    head_block_number = 0,
    time,
    current_witness,
    virtual_supply,
    current_supply,
    current_sbd_supply,
    total_vesting_fund_steem,
    total_vesting_shares,
    pending_rewarded_vesting_steem,
    pending_rewarded_vesting_shares,
    sbd_print_rate,
    sbd_interest_rate,
    last_irreversible_block_num = 0,
  } = blockchainProperties;

  const { eur, usd, btc } = price;

  const lastIrreversibleBlockDiff =
    head_block_number - last_irreversible_block_num;

  return (
    <section className="hiveyt-landing">
      {loading ? (
        <Loading description="Waiting for the blocks" animationName="world" />
      ) : (
        // TODO: Make this more compact
        <React.Fragment>
          <div className="box blockchain">
            <h3>Blockchain</h3>
            <div className="blockchain-info">
              <div className="labelled-item">
                <label>Head Block Number</label>
                <Link to={`/b/${head_block_number}`}>{head_block_number}</Link>
              </div>
              <div className="labelled-item">
                <label>Current Witness</label>
                <Link to={`/a/${current_witness}`}>{current_witness}</Link>
              </div>
              <div className="labelled-item" style={{ whiteSpace: 'nowrap' }}>
                <label>Blockchian Time</label>
                {time && formatDate(time)}
              </div>
            </div>

            <h3>Supply Info</h3>
            <div className="supply-info">
              <div className="labelled-item">
                <label>Virtual Supply</label>
                {virtual_supply}
              </div>
              <div className="labelled-item">
                <label>Current Supply</label>
                {current_supply}
              </div>
              <div className="labelled-item">
                <label>Current HBD Supply</label>
                {current_sbd_supply}
              </div>
              <div className="labelled-item">
                <label>Total Vesting Fund HIVE</label>
                {total_vesting_fund_steem}
              </div>
              <div className="labelled-item">
                <label>Total Vesting Shares</label>
                {total_vesting_shares}
              </div>
              <div className="labelled-item">
                <label>Pending Rewarded Vesting HIVE</label>
                {pending_rewarded_vesting_steem}
              </div>
              <div className="labelled-item">
                <label>Pending Rewarded Vesting Shares</label>
                {pending_rewarded_vesting_shares}
              </div>
              <div className="labelled-item">
                <label>HBD Interest Rate</label>
                {sbd_interest_rate}%
              </div>
              <div className="labelled-item">
                <label>HBD Print Rate</label>
                {sbd_print_rate ? sbd_print_rate / 100 : 0}%
              </div>
              <div className="labelled-item">
                <label>Last Irreversible Block Difference</label>
                <div
                  className={`last-irreversible ${getLastIrreversibleClass(
                    lastIrreversibleBlockDiff
                  )}`}
                >
                  {lastIrreversibleBlockDiff}
                </div>
              </div>
            </div>

            <h3>Market Data</h3>
            <div className="market-info">
              <div className="labelled-item flat">
                <label>HIVE/BTC</label>
                {btc}
                <span className="currency-symbol">₿</span>
              </div>
              <div className="labelled-item flat">
                <label>HIVE/USD</label>
                {usd}
                <span className="currency-symbol">$</span>
              </div>
              <div className="labelled-item flat">
                <label>HIVE/EUR</label>
                {eur}
                <span className="currency-symbol">€</span>
              </div>
            </div>
            <PriceChart />
          </div>
          {/* <div className="box market">
            <h3>Market</h3>
            <div>Some market data</div>
          </div> */}
          <div className="box recent-blocks">
            <h3>Recent Blocks</h3>
            <Blocks />
          </div>
        </React.Fragment>
      )}
    </section>
  );
};

export default Landing;
