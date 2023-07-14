import { motion } from 'framer-motion';
import { ThemeStyleEnum } from '../model/Theme';
import styled from 'styled-components';

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

export const AnimatedBox: React.FC<{
  children: React.ReactNode;
  themeStyle: ThemeStyleEnum;
}> = (props: { children: React.ReactNode; themeStyle: ThemeStyleEnum }) => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="square"
      whileInView={{ scale: 1, opacity: 1 }}
    >
      <Box themeStyle={props.themeStyle}>{props.children}</Box>
    </motion.div>
  );
};
