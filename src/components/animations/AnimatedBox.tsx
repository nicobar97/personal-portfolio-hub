import { motion } from 'framer-motion';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.border};
  padding: 1.5rem;
  margin: 0rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: ${(props) => props.theme.shadow} 0px 7px 20px 0px;
`;

type Props = {
  children: React.ReactNode;
};

export const AnimatedBox: React.FC<Props> = (props: Props) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0.5 }}
      transition={{ duration: 0.2 }}
      className="square"
      whileInView={{ scale: 1, opacity: 1 }}
    >
      <Box>{props.children}</Box>
    </motion.div>
  );
};
