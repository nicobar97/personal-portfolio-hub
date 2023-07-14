import { rest } from 'msw';
import { Either, Right } from 'purify-ts';

import { FetchAuthMapError } from '../model/Errors';
import { Hello } from '../model/Hello';

export const handlers = [
  rest.get('/hello/:helloId', (req, res, ctx) => {
    const hello = req.params['helloId'].toString();
    return res(ctx.delay(500), ctx.json<Either<FetchAuthMapError, Hello>>(Right({ hello })));
  }),
];
