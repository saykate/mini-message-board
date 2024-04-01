import { arrayOf, shape, string } from 'prop-types';

export const MessagePropTypes = shape({
  _id: string,
  text: string,
  user: shape({
    _id: string,
    username: string,
  }),
}).isRequired;

export const MessagesPropTypes = arrayOf(MessagePropTypes);