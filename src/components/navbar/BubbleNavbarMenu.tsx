import { motion } from 'framer-motion';
import styled from 'styled-components';
import menuIcon from '../../assets/icons/menu.png';
import { ThemeStyle } from '../../model/Theme';
import { BubbleMenuContent } from './BubbleMenuContent';

const Icon = styled(motion.img)<{
  darkModeInvert: boolean;
}>`
  transform: none;
  width: 1.5rem;
  height: 1.5rem;
  transition: filter 0.5s;
  filter: ${(props) =>
    props.darkModeInvert && props.theme.style === ThemeStyle.DARK ? `invert(100%)` : ``};
`;

const Bubble = styled(motion.div)<{
  rounded: boolean;
  scale: number;
  borderSize: number;
  isExpanded: boolean;
}>`
  z-index: 5;
  display: flex;
  max-width: 25em;
  width: 1.5rem;
  flex-direction: row;
  justify-content: center;
  flex-flow: wrap;
  place-content: flex-start;
  padding: 1.1rem;
  border-radius: ${(props) => (props.rounded ? '2rem' : '0px')};
  gap: 1rem;
  background-color: ${(props) => (props.rounded ? props.theme.background : `transparent`)};
  transition:
    box-shadow 0.3s ease-out ${(props) => (props.rounded ? '0.2s' : '0s')},
    border 0.2s ease-out ${(props) => (props.rounded ? '0.3s' : '0s')},
    border-radius 0.3s ease-out ${(props) => (props.rounded ? '0s' : '1s')};

  box-shadow: ${(props) => (props.rounded ? `${props.theme.shadow} 0px 7px 20px 0px` : '')};
  border: ${(props) => (props.rounded ? props.borderSize : 0)}px solid
    ${(props) => props.theme.border};

  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  -webkit-user-drag: none;
`;

const BubbleLabel = styled(motion.span)`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
`;

const Header = styled(motion.div)`
  display: flex;
  flex-direction: row;
`;

const Content = styled(motion.div)`
  display: flex;
  flex-direction: row;
  padding-top: 0.8rem;
`;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const contentVariants = {
  open: {
    opacity: 1,
    display: 'flex',
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
  closed: {
    opacity: 0,
    display: 'none',
    transition: {
      duration: 0.3,
      delay: 0.1,
      when: 'afterChildren',
    },
  },
};

type Props = {
  rounded?: boolean;
  isMenuShown: boolean;
};

export const BubbleNavbarMenu: React.FC<Props> = (props: Props) => (
  <Bubble
    rounded={props.rounded ?? true}
    className="menu"
    borderSize={1}
    scale={1}
    isExpanded={props.isMenuShown}
    initial={false}
    variants={{
      open: {
        width: `20rem`,
        height: `100%`,
        transition: {
          duration: 0.2,
          ease: 'easeInOut',
        },
      },
      closed: {
        // width: `1.5rem`,
        height: `1.5rem`,
        transition: {
          duration: 0.2,
          delay: 5,
          delayChildren: 5,
        },
      },
    }}
    animate={props.isMenuShown ? 'open' : 'close'}
    whileTap={{ scale: props.rounded && !props.isMenuShown ? 1.5 : 1 }}
    hidden={!props.isMenuShown}
  >
    <motion.nav initial={false} animate={props.isMenuShown ? 'open' : 'closed'}>
      <Container>
        <Header>
          <Icon
            src={menuIcon}
            whileTap={{
              scale:
                (props.rounded !== undefined && props.rounded === false) || props.isMenuShown
                  ? 1.5
                  : 1,
            }}
            darkModeInvert={true}
          />
          <BubbleLabel
            variants={{
              open: {
                opacity: 1,
                transition: { staggerChildren: 0.07, delayChildren: 0.2 },
              },
              closed: {
                opacity: 0,
                transition: { staggerChildren: 0.05, staggerDirection: -1 },
              },
            }}
          >
            Menu
          </BubbleLabel>
        </Header>
        {props.isMenuShown && (
          <Content
            variants={contentVariants}
            initial="closed"
            animate={props.isMenuShown ? 'open' : 'closed'}
          >
            <BubbleMenuContent />
          </Content>
        )}
      </Container>
    </motion.nav>
  </Bubble>
);
