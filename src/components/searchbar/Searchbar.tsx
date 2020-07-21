/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface SearchbarProps {
  isOpen?: boolean;
}

const Searchbar: React.FunctionComponent<SearchbarProps> = ({
  isOpen = false,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.set({ opacity: 0, width: 0 });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      controls.start({ opacity: 0, width: 0, transition: { duration: 0.5 } });
    } else {
      controls.start({
        opacity: 1,
        width: 200,
        transition: { duration: 0.5 },
      });
    }
  }, [isOpen]);

  return (
    <motion.input placeholder="Search..." animate={controls}></motion.input>
  );
};

export default Searchbar;
