import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react';
import { ThemeStyleEnum } from '../model/Theme';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const squareVariants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0.5 },
};

const Box = styled.div<{ themeStyle: ThemeStyleEnum }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.colors(props.themeStyle).border};
  padding: 1.5rem;
  margin: 0rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: ${(props) => props.theme.colors(props.themeStyle).shadow} 0px 7px 20px 0px;
`;

export const AnimatedBox: React.FC<{ children: React.ReactNode; themeStyle: ThemeStyleEnum }> = (props: {
  children: React.ReactNode;
  themeStyle: ThemeStyleEnum;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({threshold: 0.1});

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={squareVariants}
      className="square"
    >
      <Box themeStyle={props.themeStyle}>{props.children}</Box>
    </motion.div>
  );
};
