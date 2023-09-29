import React, { useEffect, useState } from 'react';
import { Variants, motion } from 'framer-motion';
import { styled } from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled(motion.div)<{ scale: number }>`
  width: ${(props) => props.scale * 10}px;
  height: ${(props) => props.scale * 10}px;
  background-color: ${(props) => props.theme.accent.color};
  border-radius: 50%;
  margin: 0 8px;
`;

const dotVariants: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 2, 1],
    transition: {
      repeat: Infinity,
      duration: 1,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
};

export const Loader: React.FC<{ scale?: number }> = (props: { scale?: number }) => {
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prevDot) => (prevDot + 1) % 5);
    }, 400);

    return () => clearInterval(interval);
  }, []);
  return (
    <LoaderContainer>
      {[0, 1, 2, 3, 4].map((index) => (
        <Dot
          key={index}
          scale={props.scale ?? 1}
          variants={dotVariants}
          initial={activeDot === index ? 'animate' : 'initial'}
          animate={activeDot === index ? 'animate' : 'initial'}
        />
      ))}
    </LoaderContainer>
  );
};
