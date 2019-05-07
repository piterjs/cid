import createStore from 'storeon';

import errors from './errors';
import user from './user';

const store = createStore([errors, user]);

export default store;
