import { Client as HiveClient } from "@hivechain/dhive";

const urls = [
  "https://api.hive.blog",
  "https://api.hivekings.com",
  "https://anyx.io",
  "https://api.openhive.network",
];

class Client {
  private static instance: Client | null = null;
  private _client: HiveClient;

  private constructor() {
    this._client = new HiveClient(urls, {
      
    });
  }

  public static getInstance(): Client {
    if (!Client.instance) {
      Client.instance = new Client();
    }

    return Client.instance;
  }

  public get client(): HiveClient {
    if (!Client.instance) {
      Client.instance = new Client();
    }

    return this._client;
  }
}

export default Client;
