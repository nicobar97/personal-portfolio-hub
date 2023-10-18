import { motion } from 'framer-motion';
import styled from 'styled-components';
import { GameCard } from '../../model/GameCard';
import { useState, useEffect } from 'react';

const Container = styled(motion.div)`
  position: fixed;
  top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  overflow-y: scroll;
  max-height: 80vh;
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
  margin: 0.5rem 0;
  color: ${(props) => props.theme.text};
`;

const Image = styled(motion.img)`
  max-width: 100%;
  border-radius: 0.5rem;
`;

const Card = styled(motion.div)`
  display: flex;
  max-width: 50rem;
  min-height: 70vh;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.background};
  overflow: hidden;
  flex-direction: column;
  gap: 1rem;
  /* justify-content: center; */
  align-items: left;
  box-shadow: inset ${(props) => props.theme.background}99 2px 2px 30px;
`;

const CloseButton = styled(motion.button)`
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  position: absolute;
  bottom: 0;
  margin-bottom: 2rem;
  text-align: center;
  width: 80%;
  background-color: ${(props) => props.theme.accent.color};
  box-shadow: ${(props) => props.theme.shadow} 0px 7px 20px 0px;
  border-radius: 0.5rem;
`;

const Header = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled(motion.div)<{ currentWidth: number; thresholdWidth: number }>`
  display: flex;
  flex-direction: ${(props) => (props.currentWidth < props.thresholdWidth ? 'column' : 'row')};
  justify-content: center;
  align-items: center;
`;

const Right = styled(motion.div)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;

const Left = styled(motion.div)`
  display: flex;
  padding: 0.5rem;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

type Props = {
  card: GameCard;
  onClose: () => void;
};

export const CardShow: React.FC<Props> = (props: Props) => {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  useEffect(() => {
    setCurrentWidth(window.innerWidth);
  }, [window.innerWidth]);
  return (
    <Container>
      <Card layoutId={props.card.id}>
        <Header>
          <OverTitle>{props.card.slug}</OverTitle>
          <Title>{props.card.name}</Title>
          <SubTitle>{props.card.set}</SubTitle>
        </Header>
        <Content currentWidth={currentWidth} thresholdWidth={580}>
          <Left>
            <ImageContainer>
              <Image src={`${props.card.image.en}?auto=format&dpr=1&w=512`} alt={props.card.name} />
            </ImageContainer>
          </Left>
          <Right>
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
        {/* <Content>
          <Property>Card Text: {props.card.text}</Property>
        </Content> */}
        <Footer>
          <CloseButton onClick={props.onClose}>Close</CloseButton>
        </Footer>
      </Card>
    </Container>
  );
};
