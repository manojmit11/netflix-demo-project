import { takeEvery, call, put, select } from 'redux-saga/effects';
import actionTypes from '../actionTypes';
import apiConstants from '../constants/apiConstants';
import { reposFetchSuccess, ChangeSelectedRepoSuccess, updateCommitsList, setErrorState } from '../actions';
import get from 'lodash/get';

function* getListOfRepos(action) {
    const { payload: { orgName } } = action;
    try {
        const response = yield call(fetch, `${apiConstants.BASE_URL}/orgs/${orgName}/repos`);
        const repos = yield response.json();
        const sortReposBy = yield select(state => get(state, 'sortReposBy', {}));
        const sortedReposList = repos.sort((a, b) => b[sortReposBy.value] - a[sortReposBy.value]);
        const branchesList = yield call(fetch, `${apiConstants.BASE_URL}/repos/${orgName}/${sortedReposList[0].name}/branches`);
        const commitsList = yield call(fetch, `${apiConstants.BASE_URL}/repos/${orgName}/${sortedReposList[0].name}/commits`);
        const record = {
            reposList: sortedReposList,
            selectedRepoIndex: 0,
            selectedBranch: sortedReposList[0].default_branch,
            branchesList: yield branchesList.json(),
            commitsList: yield commitsList.json(),
            orgName,
            sortReposBy
        }
        yield put(reposFetchSuccess(record))
    } catch (error) {
        yield put(setErrorState());
    }
}

function* changeReposSortByValue(action) {
    const { payload: { newSortByValue } } = action;
    try {
        const reposList = yield select(state => get(state, 'reposList', []));
        const sortedReposList = reposList.sort((a, b) => b[newSortByValue.value] - a[newSortByValue.value]);
        const orgName = yield select(state => get(state, 'orgName'));
        const branchesList = yield call(fetch, `${apiConstants.BASE_URL}/repos/${orgName}/${sortedReposList[0].name}/branches`);
        const commitsList = yield call(fetch, `${apiConstants.BASE_URL}/repos/${orgName}/${sortedReposList[0].name}/commits`);
        const record = {
            reposList: sortedReposList,
            selectedRepoIndex: 0,
            selectedBranch: sortedReposList[0].default_branch,
            branchesList: yield branchesList.json(),
            commitsList: yield commitsList.json(),
            sortReposBy: newSortByValue,
            orgName
        }
        yield put(reposFetchSuccess(record));
    } catch (error) {
        yield put(setErrorState());
    }

}

function* changeBranch(action) {
    const { payload: { newBranch } } = action;
    try {
        const orgName = yield select(state => get(state, 'orgName'));
        const reposList = yield select(state => get(state, 'reposList', []));
        const selectedRepoIndex = yield select(state => get(state, 'selectedRepoIndex', 0));
        const commitsList = yield call(fetch, `${apiConstants.BASE_URL}/repos/${orgName}/${reposList[selectedRepoIndex].name}/commits?sha=${newBranch.value}`);
        const record = {
            selectedBranch: newBranch.label,
            commitsList: yield commitsList.json()
        }
        yield put(updateCommitsList(record))
    } catch (error) {
        yield put(setErrorState());
    }
}
/* destructure state */
function* changeSelectedRepo(action) {
    const { payload: { index } } = action;
    try {
        const orgName = yield select(state => get(state, 'orgName'));
        const reposList = yield select(state => get(state, 'reposList', []));
        const branchesList = yield call(fetch, `${apiConstants.BASE_URL}/repos/${orgName}/${reposList[index].name}/branches`);
        const commitsList = yield call(fetch, `${apiConstants.BASE_URL}/repos/${orgName}/${reposList[index].name}/commits`);
        const record = {
            selectedRepoIndex: index,
            selectedBranch: reposList[index].default_branch,
            branchesList: yield branchesList.json(),
            commitsList: yield commitsList.json(),
        }
        yield put(ChangeSelectedRepoSuccess(record));
    } catch (error) {
        yield put(setErrorState());
    }
}

export default function* netflixDemoProjectSaga() {
    yield takeEvery(actionTypes.GET_LIST_OF_REPOS, getListOfRepos);
    yield takeEvery(actionTypes.CHANGE_REPOS_SORT_BY_VALUE, changeReposSortByValue);
    yield takeEvery(actionTypes.CHANGE_BRANCH, changeBranch);
    yield takeEvery(actionTypes.CHANGE_SELECTED_REPO, changeSelectedRepo);
}