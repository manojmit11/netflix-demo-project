import { all } from 'redux-saga/effects';
import netflixDemoSaga from './netflixDemoSaga';

export default function* rootSaga() {
    yield all([netflixDemoSaga()]);
}