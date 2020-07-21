/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface NavMenuProps {
  isOpen?: boolean;
}

const NavMenu: React.FunctionComponent<NavMenuProps> = ({
  children,
  isOpen,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.set({ opacity: 0, top: -200 });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      controls.start({ opacity: 0, top: -200, transition: { duration: 0.5 } });
    } else {
      controls.start({
        opacity: 1,
        top: 0,
        transition: { duration: 0.5 },
      });
    }
  }, [isOpen]);

  return (
    <motion.ul className="nav-menu" animate={controls}>
      {children}
    </motion.ul>
  );
};

export default NavMenu;
