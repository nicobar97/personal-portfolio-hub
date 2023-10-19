import { motion } from 'framer-motion';
import styled from 'styled-components';
import { GameCard } from '../../model/GameCard';
import { useState, useEffect } from 'react';
import { useNavbarStore } from '../navbar/useNavbarStore';

const Container = styled(motion.div)<{ isMobile: boolean }>`
  position: fixed;
  top: ${(props) => (props.isMobile ? '0%' : '12%')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-height: ${(props) => (props.isMobile ? '100vh' : '80vh')};
  overscroll-behavior: contain;
`;

const Card = styled(motion.div)<{ isMobile: boolean; isBarFloating: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.isMobile ? '100vw' : '')};
  max-width: 75%;
  max-height: ${(props) => (props.isMobile ? '100vh' : '70vh')};
  padding: 3rem;
  padding-top: ${(props) => (props.isMobile ? (props.isBarFloating ? '8rem' : '5rem') : '3rem')};
  border: ${(props) => (props.isMobile ? 'none' : '1px solid')} ${(props) => props.theme.border};
  border-radius: 1.5rem;
  background-color: ${(props) => props.theme.background};
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  gap: 1rem;
  padding-bottom: 3.5rem;
  box-shadow: inset ${(props) => props.theme.background}99 2px 2px 30px;
`;

const OverTitle = styled(motion.h5)`
  font-size: 0.7rem;
  margin: 0;
`;

const Title = styled(motion.h2)`
  font-size: 1.5rem;
  margin: 0;
`;

const SubTitle = styled(motion.h3)`
  font-size: 0.6rem;
  margin: 0;
`;

const Property = styled(motion.h3)`
  font-size: 1rem;
  font-weight: 400;
  margin: 0.5rem 0;
  color: ${(props) => props.theme.text};
`;

const Image = styled(motion.img)`
  max-width: 100%;
  border-radius: 0.5rem;
`;

const CloseButton = styled(motion.button)<{ isMobile: boolean }>`
  position: absolute;
  top: ${(props) => (props.isMobile ? '0rem' : '')};
  right: ${(props) => (props.isMobile ? '0' : '')};
  bottom: ${(props) => (props.isMobile ? '' : '0')};
  margin: ${(props) => (props.isMobile ? '5rem' : '0 auto 2.5rem auto')};
  width: ${(props) => (props.isMobile ? '' : '72%')};
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  text-align: center;
  background-color: ${(props) => props.theme.accent.color};
  box-shadow: ${(props) => props.theme.shadow} 0px 7px 20px 0px;
  border-radius: 0.5rem;
  opacity: 0;
  animation: fadeIn 0.5s ease 0.5s 1 forwards;
`;

const Header = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled(motion.div)<{ isMobile: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row-reverse')};
`;

const Right = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
`;

const Left = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Footer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled(motion.div)`
  width: 100%;
  max-width: 20rem;
`;

const Description = styled(motion.div)`
  padding-left: 5rem;
  padding: 1rem;
`;

const isMobileView = (windowWidth: number) => windowWidth < 580;

type Props = {
  card: GameCard;
  onClose: () => void;
};

export const CardShow: React.FC<Props> = (props: Props) => {
  const navbarStore = useNavbarStore();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <Container isMobile={isMobileView(windowWidth)}>
      <Card
        layoutId={props.card.id}
        isMobile={isMobileView(windowWidth)}
        isBarFloating={navbarStore.floating}
      >
        <Header>
          <OverTitle>{props.card.slug}</OverTitle>
          <Title>{props.card.name}</Title>
          <SubTitle>{props.card.set}</SubTitle>
        </Header>
        <Content isMobile={isMobileView(windowWidth)}>
          <Left>
            <ImageContainer>
              <Image
                src={`${props.card.image.en}?auto=format&dpr=1&w=512`}
                alt={props.card.name}
                loading="lazy"
              />
            </ImageContainer>
          </Left>
          <Right>
            <Title>Details</Title>
            <br></br>

            <Property>Type: {props.card.type}</Property>
            <Property>Rarity: {props.card.rarity}</Property>
            <Property>Feature: {props.card.feature}</Property>
            <Property>Color: {props.card.color.join(', ')}</Property>
            <Property>Power: {props.card.power}</Property>
            <Property>Life: {props.card.life}</Property>
            <Property>Rarity: {props.card.rarity}</Property>
            <Property>Attributes: {props.card.attributes}</Property>
            <Property>Counter: {props.card.counter ?? 'Uncounterable'}</Property>
          </Right>
        </Content>
        {props.card.text ? (
          <Description>
            <Title>Effect</Title>
            <Property>Card Text: {props.card.text}</Property>
          </Description>
        ) : null}
        <Footer>
          <CloseButton onClick={props.onClose} isMobile={isMobileView(windowWidth)}>Close</CloseButton>
        </Footer>
      </Card>
    </Container>
  );
};
