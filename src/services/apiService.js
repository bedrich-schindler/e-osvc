import { createAction } from 'redux-api-middleware';
import { API_URL } from '../../config/config';

export const createApiAction = ({
  endpoint, method, types, body = null,
}) => createAction({
  body: body
    ? JSON.stringify(body)
    : null,
  endpoint: `${API_URL}${endpoint}`,
  headers: {
    'Content-Type': 'application/json',
  },
  method,
  types,
});
