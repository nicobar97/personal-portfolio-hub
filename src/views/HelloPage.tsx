import { useQuery } from '@tanstack/react-query';
import { Maybe } from 'purify-ts';
import { useParams } from 'react-router-dom';

import { getHello } from '../api/hello';
import { FetchAuthMapError } from '../model/errors';
import { Hello } from '../model/hello';

export const HelloPage: React.FC = () => {
  const params = useParams();
  const helloId = Maybe.fromNullable(params.helloId).orDefault('onyon');
  const query = useQuery({
    queryKey: ['hello'],
    queryFn: () => getHello(helloId).run(),
  });

  return (
    <>
      {query.isLoading ? (
        <>
          <div data-testid="loader">Loading...</div>
        </>
      ) : query.isSuccess ? (
        query.data
          .map((data: Hello) => (
            <>
              <div key={data.hello}>{data.hello}</div>
            </>
          ))
          .mapLeft((err: FetchAuthMapError) => (
            <>
              <div data-testid="error">{err.message}</div>
            </>
          ))
          .extract()
      ) : query.isError ? (
        <>
          <div data-testid="error">Error status: {query.status}</div>
        </>
      ) : null}
    </>
  );
};
