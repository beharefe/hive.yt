const API_URL = "https://api.coingecko.com/api/v3";

export interface HivePrice {
  [key: string]: number;
}

class MarketService {
  public async getPrice(): Promise<HivePrice> {
    const url = this.constructUrl("/simple/price", {
      ids: "hive",
      vs_currencies: "eur,usd,btc",
    });
    const response = await fetch(url);
    const data = await response.json();
    return data["hive"];
  }

  public async getMarketData(days = 1): Promise<[]> {
    const url = this.constructUrl("/coins/hive/market_chart", {
      vs_currency: "usd",
      days: days.toString(),
    });
    const response = await fetch(url);
    const data = await response.json();
    return data["prices"];
  }

  // private handleError() {}
  // private parseResponse() {}

  private constructUrl(
    endpoint: string,
    params?: { [key: string]: string }
  ): string {
    const p = new URLSearchParams(params);
    return `${API_URL}${endpoint}?${p.toString()}`;
  }
}

export default new MarketService();
