import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ThemeStyle, ThemeStyleEnum } from '../model/Theme';

const Icon = styled(motion.img)<{ themeStyle: ThemeStyleEnum }>`
  height: 1.5rem;
  margin: 0;
  transition: filter 0.5s;
  ${(props) => (props.themeStyle === ThemeStyle.DARK ? `filter: invert(100%);` : ``)}
`;

const Bubble = styled(motion.div)<{ floating: boolean; themeStyle: ThemeStyleEnum }>`
  z-index: 5;
  display: flex;
  flex-direction: column;
  height: 1.5rem;
  padding: 1.1rem;
  border-radius: 100px;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors(props.themeStyle).background};
  transition: box-shadow 0.3s ease-out ${(props) => (props.floating ? '0.2s' : '0s')};

  ${(props) =>
    props.floating
      ? `box-shadow: ${props.theme.colors(props.themeStyle).shadow} 0px 7px 20px 0px;
      background-color: ${props.theme.colors(props.themeStyle).background};
`
      : `background-color: transparent`}
`;

type Props = {
  onBubbleClick: () => void;
  isFloating: boolean;
  iconSrc: string;
  style: ThemeStyleEnum;
};

export const NavbarBubble: React.FC<Props> = (props: Props) => (
  <div onClick={props.onBubbleClick}>
    <Bubble
      themeStyle={props.style}
      floating={props.isFloating}
      whileTap={{ scale: props.isFloating ? 1.5 : 1 }}
    >
      <Icon
        themeStyle={props.style}
        src={props.iconSrc}
        whileTap={{ scale: !props.isFloating ? 1.5 : 1 }}
      />
    </Bubble>
  </div>
);
