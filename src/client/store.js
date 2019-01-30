import { createStore, combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

export default function(initial) {
  const store = createStore(
    combineReducers({
      form,
    }),
    // eslint-disable-next-line
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    initial
  );

  return store;
}
