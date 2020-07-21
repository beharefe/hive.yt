import Client from "./Client.service";
import { SignedBlock, BlockchainMode } from "@hivechain/dhive";

class BlockchainService {
  private client = Client.getInstance().client;

  public async getBlocks(): Promise<
    AsyncGenerator<SignedBlock, void, unknown>
  > {
    return this.client.blockchain.getBlocks({ mode: BlockchainMode.Latest });
  }

  public async getBlockByNumber(blockNumber: number): Promise<SignedBlock> {
    return this.client.database.getBlock(blockNumber);
  }

  public async getBlockchainInfo() {
    return this.client.database.getDynamicGlobalProperties();
  }
}

export default new BlockchainService();
