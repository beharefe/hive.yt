import "./Blocks.scss";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import Block from "./Block";
import { GlobalPropertiesContext } from "state";

const Blocks = () => {
  const { state } = useContext(GlobalPropertiesContext);
  const { blocks } = state;

  return blocks.length ? (
    <motion.ul className="recent-blocks-wrapper">
      {blocks.map((block, index) => {
        // TODO: Sometimes there is no block number
        // because there is no transactions, fix this..
        // const blockNumber = block.number
        //   ? block.number
        //   : // sometimes there is no block number, get number by incrementing previous block's number
        //     arr[arr.length - index - 2].number + 1;
        return <Block key={block.id} index={index} {...block} />;
      })}
    </motion.ul>
  ) : (
    <div className="recent-blocks-waiting">Waiting for blocks...</div>
  );
};

export default Blocks;
