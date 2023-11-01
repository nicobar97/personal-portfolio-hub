import styled from 'styled-components';
import { MobileFrame } from '../components/misc/MobileFrame';
import { AnimatedBox } from '../components/animations/AnimatedBox';
import { AnimateFade } from '../components/animations/Animations';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../Routes';
import trainIds from '../assets/static/TrainPlaceIds.json';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow-x: hidden;
  margin-top: 0.5rem;
  padding: 1.5rem;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;

const Title = styled.h2`
  margin: 0rem;
  cursor: pointer;
`;

const Clickable = styled.div`
  cursor: pointer;
`;

const findIdByPlace = (place: string) =>
  trainIds.find((t) => t.place === place.toLocaleUpperCase())!;

export const TrainListView: React.FC = () => {
  const navigate = useNavigate();

  const places = ['milano centrale', 'bologna centrale', 'milano porta garibaldi', 'torino porta nuova'];

  const placeIds = places.map((place) => findIdByPlace(place)).filter((id) => id !== undefined);

  const getTrainTableUrl = (placeId: string) => Routes.TrainTable.replace(':placeId', placeId);

  return (
    <AnimateFade>
      <Content>
        <MobileFrame>
          {placeIds.map((placeId) => (
            <Clickable onClick={() => navigate(getTrainTableUrl(placeId.id))}>
              <AnimatedBox>
                <Title>{placeId.place}</Title>
              </AnimatedBox>
            </Clickable>
          ))}
        </MobileFrame>
      </Content>
    </AnimateFade>
  );
};
