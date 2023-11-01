import styled from 'styled-components';
import { MobileFrame } from '../components/misc/MobileFrame';
import { useQuery } from '@tanstack/react-query';
import { FetchAuthMapError } from '../model/errors';
import { Either } from 'purify-ts';
import { TrainTable } from '../model/Train';
import { getTrainTable } from '../api/Train';
import { motion } from 'framer-motion';
import { handleError } from '../components/errors/ErrorPopup';
import { FullPageDotLoader } from '../components/misc/FullPageDotLoader';
import { DotLoader } from '../components/misc/DotLoader';
import trenitaliaLogo from '../assets/trains/trenitalia.svg';
import trenordLogo from '../assets/trains/trenord.svg';
import italoLogo from '../assets/trains/italo.svg';
import tperLogo from '../assets/trains/trenitalia_tper.svg';
import frecciarossaLogo from '../assets/trains/frecciarossa.svg';
import { useThemeStore } from '../stores/useThemeStore';
import { ThemeStyle } from '../model/Theme';

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

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const TrainProviderImage = styled.img<{ invertColor?: boolean }>`
  width: 3rem;
  ${(props) => (props.invertColor ? 'filter: brightness(0) invert(1)' : '')};
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const TableRow = styled(motion.tr)`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 8px;
  text-align: left;

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

const TableHeaderCentered = styled.th`
  padding: 8px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

const TableCell = styled.td`
  padding: 8px;

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

const TableCellCentered = styled.td`
  padding: 8px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

const Title = styled.h2`
  margin: 0rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

type Props = {
  placeId: string;
};

export const TrainTableView: React.FC<Props> = (props: Props) => {
  const theme = useThemeStore();
  const query = useQuery<Either<FetchAuthMapError, TrainTable>, FetchAuthMapError>({
    queryKey: ['trainTable', props.placeId],
    queryFn: () => getTrainTable(props.placeId).run(),
  });

  return (
    <Content>
      <MobileFrame>
        {query.isSuccess &&
          query.data
            .map((trainTable) => (
              <>
                <Title>{trainTable.place}</Title>
                <StyledTable>
                  <thead>
                    <TableRow>
                      <TableHeader></TableHeader>
                      <TableHeader>Train</TableHeader>
                      <TableHeader>Destination</TableHeader>
                      <TableHeaderCentered>Time</TableHeaderCentered>
                      <TableHeaderCentered>Delay</TableHeaderCentered>
                      <TableHeaderCentered>Binary</TableHeaderCentered>
                      <TableHeaderCentered>Departing</TableHeaderCentered>
                    </TableRow>
                  </thead>
                  <tbody>
                    {trainTable.lines.map((trainLine) => (
                      <TableRow
                        key={trainLine.trainId}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <TableCell>
                          <TrainProviderImage
                            src={pickProviderLogo(trainLine.provider)}
                            invertColor={theme.style === ThemeStyle.DARK}
                          />
                        </TableCell>
                        <TableCell>{trainLine.trainId}</TableCell>
                        <TableCell>{formatText(trainLine.destination)}</TableCell>
                        <TableCellCentered>{trainLine.departureTime}</TableCellCentered>
                        <TableCellCentered>
                          {trainLine.delay !== 0 && trainLine.delay}
                        </TableCellCentered>
                        <TableCellCentered>{trainLine.binary}</TableCellCentered>
                        <TableCellCentered>
                          {trainLine.isDeparting && (
                            <DotLoader cycleTimeMs={200} dotNumber={3} scale={0.4} />
                          )}
                        </TableCellCentered>
                      </TableRow>
                    ))}
                  </tbody>
                </StyledTable>
              </>
            ))
            .mapLeft((err: FetchAuthMapError) => <MobileFrame>{handleError(err)}</MobileFrame>)
            .extract()}
        {query.isError && <MobileFrame>{handleError(query.error)}</MobileFrame>}
        {query.isLoading && (
          <MobileFrame>
            <FullPageDotLoader />
          </MobileFrame>
        )}
      </MobileFrame>
    </Content>
  );
};

const formatText = (text: string) =>
  text.length > 20
    ? `${text.substring(0, 12)}...${text.substring(text.length - 6, text.length)}`
    : text;

const pickProviderLogo = (provider: string) => {
  switch (provider) {
    case 'trenitalia':
      return trenitaliaLogo;
    case 'italo':
      return italoLogo;
    case 'trenitalia tper':
      return tperLogo;
    case 'trenord':
      return trenordLogo;
    case 'frecciarossa':
      return frecciarossaLogo;
    default:
      return trenitaliaLogo;
  }
};
