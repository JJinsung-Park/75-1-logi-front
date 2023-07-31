// third-party
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'root/RootSaga';
// project imports
import rootReducer from './reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

const sagaMiddleware = createSagaMiddleware();//사가 미
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);//루트 사가 실행
const persister = persistStore(store);

const { dispatch } = store;

const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;


export { store, persister, dispatch, useSelector, useDispatch };