import { Maybe } from 'purify-ts';
import { useParams } from 'react-router-dom';

export const LocalHelloPage: React.FC = () =>
  Maybe.fromNullable(useParams()['helloId'])
    .map((helloId: string) => (
      <>
        <div data-testid="hello">{helloId}</div>
      </>
    ))
    .orDefault(
      <>
        <div data-testid="error">Missing param</div>
      </>,
    );
