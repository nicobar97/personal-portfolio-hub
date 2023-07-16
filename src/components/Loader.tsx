import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useThemeStore } from '../stores/useThemeStore';
import { ThemeStyle } from '../model/Theme';

const loadingContainer = {
  margin: '0 auto 0px',
  width: '4rem',
  height: '3rem',
  display: 'flex',
  justifyContent: 'space-around',
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '60%',
  },
};
const loadingCircleTransition = {
  duration: 0.4,
  yoyo: Infinity,
  ease: 'easeInOut',
};

export const Loader = () => {
  const themeStore = useThemeStore();
  const loadingCircle = {
    display: 'block',
    width: '1rem',
    height: '1rem',
    backgroundColor: themeStore.style === ThemeStyle.DARK ? 'white' : 'black',
    borderRadius: '0.5rem',
  };
  return (
    <div>
      <motion.div
        style={loadingContainer}
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
      </motion.div>
    </div>
  );
};

export const LoaderContainer = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  align-items: center;
  justify-content: center;
`;
