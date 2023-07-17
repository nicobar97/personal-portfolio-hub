import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ThemeStyle, ThemeStyleEnum } from '../model/Theme';

const Icon = styled(motion.img)<{
  themeStyle: ThemeStyleEnum;
  darkModeInvert: boolean;
}>`
  margin: 0;
  transition: filter 0.5s;
  filter: ${(props) =>
    props.darkModeInvert && props.themeStyle === ThemeStyle.DARK ? `invert(100%)` : ``};
`;

const Bubble = styled(motion.div)<{
  rounded: boolean;
  themeStyle: ThemeStyleEnum;
  scale: number;
  borderSize: number;
}>`
  z-index: 5;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: ${(props) => `${props.scale * 1.5}rem`};
  padding: 1.1rem;
  border-radius: ${(props) => (props.rounded ? '100px' : '0px')};
  gap: 1rem;
  background-color: ${(props) =>
    props.rounded ? props.theme.colors(props.themeStyle).background : `transparent`};
  transition:
    box-shadow 0.3s ease-out ${(props) => (props.rounded ? '0.2s' : '0s')},
    border 0.2s ease-out ${(props) => (props.rounded ? '0.3s' : '0s')},
    border-radius 0.3s ease-out ${(props) => (props.rounded ? '0s' : '1s')};
  box-shadow: ${(props) =>
    props.rounded ? `${props.theme.colors(props.themeStyle).shadow} 0px 7px 20px 0px` : ''};
  border: ${(props) => (props.rounded ? props.borderSize : 0)}px solid
    ${(props) => props.theme.colors(props.themeStyle).border};

  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  -webkit-user-drag: none;
`;

const BubbleLabel = styled(motion.div)`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  align-items: center;
  justify-content: center;
`;

type Props = {
  onBubbleClick: () => void;
  iconSrc: string;
  style: ThemeStyleEnum;
  rounded?: boolean;
  scale?: number;
  darkModeInvert?: boolean;
  label?: string;
  borderSize?: number;
};

export const BubbleButton: React.FC<Props> = (props: Props) => (
  <div onClick={props.onBubbleClick}>
    <Bubble
      themeStyle={props.style}
      rounded={props.rounded ?? true}
      borderSize={props.borderSize ?? 0}
      scale={props.scale ?? 1}
      whileTap={{ scale: props.rounded ? 1.5 : 1 }}
    >
      <Icon
        themeStyle={props.style}
        src={props.iconSrc}
        whileTap={{ scale: props.rounded !== undefined && props.rounded === false ? 1.5 : 1 }}
        darkModeInvert={props.darkModeInvert ?? false}
      />
      {props.label && (
        <BubbleLabel>
          <div>{props.label}</div>
        </BubbleLabel>
      )}
    </Bubble>
  </div>
);
