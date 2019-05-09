import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import {
  searchRequest,
  searchSuccess,
  searchFailure
} from '../middlewares/actions';

const isFetching = handleActions(
  {
    [searchRequest]: () => true,
    [searchSuccess]: () => false,
    [searchFailure]: () => false
  },
  false
);

const result = handleActions(
  {
    [searchRequest]: () => [],
    [searchSuccess]: (state, action) => action.payload
  },
  []
);

const error = handleActions(
  {
    [searchRequest]: () => null,
    [searchFailure]: (state, action) => action.payload
  },
  null
);

export default combineReducers({
  result,
  isFetching,
  error
});

export const getResult = createSelector(
  state => state.search.result,
  result =>
    result.map(({ id, name, image, summary }) => ({
      id,
      name,
      image: image,
      summary
    }))
);
export const getIsFetching = state => state.search.isFetching;
export const getError = state => state.search.error;
