import { BubblesEnum, Bubbles } from '../../model/Bubbles';
import { Routes, RoutesEnum } from '../../Routes';
import infoIcon from '../../assets/icons/info.png';
import lightModeIcon from '../../assets/icons/light-mode.png';
import darkModeIcon from '../../assets/icons/dark-mode.png';
import logo from '../../assets/images/logo_black_fill.svg';

export type Bubble = NavigatorBubble | ActionBubble;

export type ActionBubble = {
  type: 'action';
  bubble: BubblesEnum;
  iconSrc: string;
  altIconSrc?: string;
  handler: string;
};

export type NavigatorBubble = {
  type: 'navigator';
  bubble: BubblesEnum;
  iconSrc: string;
  altIconSrc?: string;
  navigateTo: RoutesEnum;
};

export const bubbles: Bubble[] = [
  {
    type: 'navigator',
    bubble: Bubbles.LOGO,
    iconSrc: logo,
    navigateTo: Routes.Me,
  },
  {
    type: 'navigator',
    bubble: Bubbles.INFO,
    iconSrc: infoIcon,
    navigateTo: Routes.Info,
  },
  {
    type: 'action',
    bubble: Bubbles.INFO,
    iconSrc: lightModeIcon,
    altIconSrc: darkModeIcon,
    handler: 'switch_dark_mode',
  },
];
