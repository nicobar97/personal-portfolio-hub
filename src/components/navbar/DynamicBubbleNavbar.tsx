import React, { useEffect } from 'react';
import { useNavbarStore } from './useNavbarStore';
import styled from 'styled-components';
import { BubbleNavbar } from './BubbleNavbar';

const ContentContainer = styled.div`
  margin-top: 3rem;
  height: 100%;
  min-height: calc(100vh - 3rem);
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
  const scrollTriggerY = 30;
  const navbar = useNavbarStore();

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
      <BubbleNavbar
        bubbles={navbar.bubbles}
        isFloating={navbar.floating}
        isHidden={navbar.hidden}
        isMenuExpanded={navbar.menuExpanded}
        toggleMenu={navbar.toggleMenu}
      />
      <ContentContainer
        onClick={() => navbar.menuExpanded && navbar.collapseMenu()}
      >
        {props.children}
      </ContentContainer>
    </>
  );
};
