import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { SignedBlock } from "@hivechain/dhive";
import BlockchainService from "services/Blockchain.service";

// TODO: handle /b page
// PREVENT RE_RENDERING with each context update... 
const Block = () => {
  const { params } = useRouteMatch();
  const { blockNumber } = params as { blockNumber: string };
  const [blockData, setBlockData] = useState<SignedBlock>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!Number(blockNumber)) {
      setError("Block number is empty or invalid.");
    } else {
      BlockchainService.getBlockByNumber(Number(blockNumber))
        .then((block) => {
          setBlockData(block);
        })
        .catch((error) => setError(error.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="hiveyt-block">
      {error ? error : blockData?.witness}
    </section>
  );
};

export default Block;
