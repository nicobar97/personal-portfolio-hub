import styled from 'styled-components';
import { MobileFrame } from '../components/misc/MobileFrame';
import { AnimatedBox } from '../components/animations/AnimatedBox';
import { useQuery } from '@tanstack/react-query';
import { FetchAuthMapError } from '../model/errors';
import { AnimateFade, AnimateFadeIn, AnimateFadeInDown } from '../components/animations/Animations';
import { Loader } from '../components/misc/Loader';
import { handleError } from '../components/errors/ErrorPopup';
import { Either } from 'purify-ts';
import { TrainTable } from '../model/Train';
import { getTrainTable } from '../api/Train';

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

// const Clickable = styled.div`
//   cursor: pointer;
// `;

// const Text = styled.div`
//   cursor: text;
// `;

const Info = styled.p`
  margin: 0rem;
  font-style: italic;
  cursor: text;
`;

type Props = {
  placeId: string;
};

export const TrainTableView: React.FC<Props> = (props: Props) => {
  const query = useQuery<Either<FetchAuthMapError, TrainTable>, FetchAuthMapError>({
    queryKey: ['trainTable', props.placeId],
    queryFn: () => getTrainTable(props.placeId).run(),
  });

  return (
    <AnimateFade>
      <Content>
        <MobileFrame>
          {query.isSuccess && (
            <AnimateFadeIn trigger={query.isSuccess}>
              {query.data
                .map((trainTable) =>
                  trainTable.lines
                    .map((trainLine) => (
                      <AnimatedBox>
                          <Info>{trainLine.destination}</Info>
                          <Title>{trainLine.trainId} - {trainLine.provider}</Title>
                        </AnimatedBox>
                    )),
                )
                .mapLeft((err: FetchAuthMapError) => (
                  <AnimateFadeInDown trigger={query.isSuccess}>
                    <MobileFrame>{handleError(err)}</MobileFrame>
                  </AnimateFadeInDown>
                ))
                .extract()}
            </AnimateFadeIn>
          )}
          {query.isError && (
            <AnimateFadeInDown trigger={query.isError}>
              <MobileFrame>{handleError(query.error)}</MobileFrame>
            </AnimateFadeInDown>
          )}
          {query.isLoading && (
            <AnimateFadeInDown trigger={query.isLoading}>
              <MobileFrame>
                <Loader />
              </MobileFrame>
            </AnimateFadeInDown>
          )}
        </MobileFrame>
      </Content>
    </AnimateFade>
  );
};
