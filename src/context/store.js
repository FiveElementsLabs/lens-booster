import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { reducer, initialState } from './reducer.js';

const useGlobalState = () => useReducer(reducer, initialState);

export const { Provider: SharedStateProvider, useTracked: useSharedState } = createContainer(useGlobalState);