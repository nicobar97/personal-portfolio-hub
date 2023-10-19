import { motion } from 'framer-motion';
import styled from 'styled-components';
import { GameCard } from '../../model/GameCard';

const Card = styled(motion.div)`
  display: inline-flex;
  min-width: 8rem;
  min-height: 8rem;
  margin: 0.5rem;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.background};
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset ${(props) => props.theme.background}99 2px 2px 30px;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  transition: transform 0.2s;
`;

const Header = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  padding-top: 0rem;
`;

const OverTitle = styled(motion.h5)`
  font-size: 0.5rem;
  margin: 0;
`;

const Title = styled(motion.h2)`
  font-size: 0.8rem;
  margin: 0;
`;

const SubTitle = styled(motion.h3)`
  font-size: 0.4rem;
  margin: 0;
`;

const ImageContainer = styled(motion.div)`
  padding-left: .5rem;
  padding-right: .5rem;
  padding-top: .5rem;
`;

const Image = styled(motion.img)`
  width: 100%;
  border-radius: 0.5rem;
`;

type Props = {
  card: GameCard;
  onClick: () => void;
};

export const CardPreview: React.FC<Props> = (props: Props) => {
  return (
    <Card key={props.card.id} layoutId={props.card.id} onClick={props.onClick}>
      <Header>
        <OverTitle>{props.card.slug}</OverTitle>
        <Title>{props.card.name.substring(0, 20)}</Title>
        <SubTitle>{props.card.set}</SubTitle>
      </Header>
      <ImageContainer>
        <Image
          src={`${props.card.image.en}?auto=format&dpr=1&fit=crop&w=256`}
          alt={props.card.name}
          loading="lazy"
        />
      </ImageContainer>
    </Card>
  );
};
