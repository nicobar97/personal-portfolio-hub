import React, { useEffect } from 'react';
import { BubbleNavbar } from './BubbleNavbar';
import { useNavbarStore } from './useNavbarStore';
import styled from 'styled-components';

const ContentContainer = styled.div`
  margin-top: 3rem;
`;

const setUpScrolling = (
  scrollTriggerY: number,
  setIsFloatingBar: (isFloatingBar: boolean) => void,
) => {
  const handleScroll = () => {
    if (window.scrollY > scrollTriggerY) {
      setIsFloatingBar(true);
    } else {
      setIsFloatingBar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollTriggerY, setIsFloatingBar]);
};

type Props = {
  children: React.ReactNode;
};

export const DynamicBubbleNavbar: React.FC<Props> = (props: Props) => {
  const navbar = useNavbarStore();
  const scrollTriggerY = 30;

  setUpScrolling(scrollTriggerY, navbar.setFloating);

  useEffect(() => {
    if (window.location.pathname.includes('manga/chapters/read')) {
      if (!navbar.floating) {
        if (navbar.hidden) navbar.show();
      } else {
        if (!navbar.hidden) navbar.hide();
      }
    } else {
      if (navbar.hidden) navbar.show();
    }
  }, [window.location.pathname, navbar.floating]);

  return (
    <>
      <BubbleNavbar bubbles={navbar.bubbles} isFloating={navbar.floating} hidden={navbar.hidden} />
      <ContentContainer>{props.children}</ContentContainer>
    </>
  );
};
