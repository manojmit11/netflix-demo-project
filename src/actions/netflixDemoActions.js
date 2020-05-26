import actionTypes from '../actionTypes';

export const getListOfRepos = (orgName) => ({
    type: actionTypes.GET_LIST_OF_REPOS,
    payload: {
        orgName
    }
})

export const reposFetchSuccess = (record = []) => ({
    type: actionTypes.REPOS_FETCH_SUCCESS,
    payload: {
        record
    }
})

export const commitsFetchSuccess = (commits = []) => ({
    type: actionTypes.COMMITS_FETCH_SUCCESS,
    payload: {
        commits
    }
})

export const changeReposSortByValue = (newSortByValue) => ({
    type: actionTypes.CHANGE_REPOS_SORT_BY_VALUE,
    payload: {
        newSortByValue
    }
})

export const changeBranch = (newBranch) => ({
    type: actionTypes.CHANGE_BRANCH,
    payload: {
        newBranch
    }
})

export const changeSelectedRepo = (index) => ({
    type: actionTypes.CHANGE_SELECTED_REPO,
    payload: {
        index
    }
})

export const ChangeSelectedRepoSuccess = (record) => ({
    type: actionTypes.CHANGE_SELECTED_REPO_SUCCESS,
    payload: {
        record
    }
})

export const updateCommitsList = (record) => ({
    type: actionTypes.UPDATE_COMMITS_LIST,
    payload: {
        record
    }
})

export const setErrorState = () => ({
    type: actionTypes.SET_ERROR_STATE,
    payload: {}
})