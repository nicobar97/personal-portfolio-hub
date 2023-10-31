import React from 'react';
import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import { DotLoader } from './DotLoader';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export const FullPageDotLoader: React.FC<{
  scale?: number;
  dotNumber?: number;
  cycleTimeMs?: number;
}> = (props: { scale?: number; dotNumber?: number; cycleTimeMs?: number }) => {
  return (
    <Container>
      <DotLoader
        scale={props.scale ?? 1}
        dotNumber={props.dotNumber ?? 5}
        cycleTimeMs={props.cycleTimeMs ?? 400}
      />
    </Container>
  );
};
