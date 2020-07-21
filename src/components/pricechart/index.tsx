import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "coingecko-coin-price-chart-widget": any;
    }
  }
}

export default () => (
  <coingecko-coin-price-chart-widget
    coin-id="hive"
    currency="usd"
    height="300"
    locale="en"
  ></coingecko-coin-price-chart-widget>
);
