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
import trenitaliaLogo from '../assets/trains/trenitalia.svg'
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

const TrainProviderImage = styled.img<{invertColor?: boolean}>`
  ${(props) => props.invertColor ? 'filter: brightness(0) invert(1)' : ''};
`

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

const TableCell = styled.td`
  padding: 8px;

  @media (max-width: 768px) {
    padding: 6px;
  }
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
        {query.isSuccess && (
          <StyledTable>
            <thead>
              <TableRow>
                <TableHeader>Provider</TableHeader>
                {/* <TableHeader>Category</TableHeader> */}
                <TableHeader>Train ID</TableHeader>
                <TableHeader>Destination</TableHeader>
                <TableHeader>Departure Time</TableHeader>
                <TableHeader>Delay</TableHeader>
                <TableHeader>Binary</TableHeader>
                <TableHeader>Departing</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {query.data
                .map((trainTable) =>
                  trainTable.lines.map((trainLine) => (
                    <TableRow
                      key={trainLine.trainId}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <TableCell><TrainProviderImage src={trenitaliaLogo} invertColor={theme.style === ThemeStyle.DARK}/></TableCell>
                      {/* <TableCell>{trainLine.category}</TableCell> */}
                      <TableCell>{trainLine.trainId}</TableCell>
                      <TableCell>{trainLine.destination}</TableCell>
                      <TableCell>{trainLine.departureTime}</TableCell>
                      <TableCell>{trainLine.delay}</TableCell>
                      <TableCell>{trainLine.binary}</TableCell>
                      <TableCell>{trainLine.isDeparting ? (<DotLoader cycleTimeMs={200} dotNumber={3} scale={.4}/>) : ' '}</TableCell>
                    </TableRow>
                  )),
                )
                .mapLeft((err: FetchAuthMapError) => <MobileFrame>{handleError(err)}</MobileFrame>)
                .extract()}
            </tbody>
          </StyledTable>
        )}
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
