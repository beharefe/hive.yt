import "./Blocks.scss";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { BlockMetadata } from "hiveyt-types";

interface BlockProps extends BlockMetadata {
  index?: number;
}

const Block: React.FunctionComponent<BlockProps> = ({
  index = 0,
  transactionsLength,
  witness,
  number,
}) => {
  const isTablet = useMediaQuery({ maxWidth: 991 });
  const controls = useAnimation();

  useEffect(() => {
    if (isTablet) {
      controls.set({ x: 0, y: -150, opacity: 0 });

      controls.start((i) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 1 },
      }));
    } else {
      controls.set({ x: 150, opacity: 0 });

      controls.start((i) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 1 },
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.li
      custom={index}
      className="recent-block-item"
      animate={controls}
      style={{ pointerEvents: !number ? "none" : "auto" }}
    >
      <div className="number-wrapper">
        <Link to={`/b/${number}`} title={`Go to block #${number}`}>
          {number}
        </Link>
        <div className="transactions-count">tx: {transactionsLength}</div>
      </div>
      <div className="divider" />
      <Link
        className="witness"
        to={`/a/${witness}`}
        title={`Go to witness @${witness}`}
      >
        {witness}
      </Link>
    </motion.li>
  );
};

export default Block;
