import get from 'lodash/get';
import actionTypes from '../actionTypes';


const initialState = {
    reposList: [],
    branchesList: [],
    commitsList: [],
    selectedRepoIndex: 0,
    selectedBranch: '',
    sortReposBy: { value: 'forks', label: 'Number of Forks' },
    orgName: '',
    error: false
}

const netflixDemoReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.REPOS_FETCH_SUCCESS: {
            const record = get(payload, 'record', []);
            return {
                ...record,
            }
        }
        case actionTypes.COMMITS_FETCH_SUCCESS: {
            const commits = get(payload, 'commits', []);
            return {
                ...state,
                commitsList: [...commits]
            }
        }
        case actionTypes.BRANCHES_LIST_FETCH_SUCCESS: {
            const branches = get(payload, 'branches', []);
            return {
                ...state,
                branchesList: [...branches]
            }
        }
        case actionTypes.CHANGE_SELECTED_REPO_SUCCESS:
        case actionTypes.UPDATE_COMMITS_LIST: {
            const { payload: { record } } = action;
            return {
                ...state,
                ...record,
            }
        }
        case actionTypes.SET_ERROR_STATE:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default netflixDemoReducer;