import { createStore, combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
// import reducer from './reducer';

export default function(initial) {
  const store = createStore(
    combineReducers({
      // pages: reducer,
      form,
    }),
    // eslint-disable-next-line
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    initial
  );

  return store;
}
