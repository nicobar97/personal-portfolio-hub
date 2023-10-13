import React, { useEffect } from 'react';
import { useNavbarStore } from '../stores/useNavbarStore';
import { TabsEnum } from '../model/Tabs';
import { NavigationBar } from './NavigationBar';

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
  currentTab: TabsEnum;
  changeTab: (tab: TabsEnum) => void;
};

export const NavigationBarStateful: React.FC<Props> = (props: Props) => {
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
    <NavigationBar
      bubbles={navbar.bubbles}
      currentTab={props.currentTab}
      isFloating={navbar.floating}
      hidden={navbar.hidden}
      changeTab={props.changeTab}
    />
  );
};
