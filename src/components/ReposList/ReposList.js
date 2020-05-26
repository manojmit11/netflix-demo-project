import React, { Component, Fragment } from 'react';
import Repo from './Repo';
import styles from './ReposList.module.scss';
import { connect } from 'react-redux';
import Select from 'react-select';
import get from 'lodash/get';
import { changeReposSortByValue, changeSelectedRepo } from '../../actions';
import PropTypes from 'prop-types';
const options = [
    { value: 'forks', label: 'Number of Forks' },
    { value: 'watchers', label: 'Number of Watchers' },
];

class ReposList extends Component {

    static propsTypes = {
        changeReposSortByValue: PropTypes.func,
        changeSelectedRepo: PropTypes.func,
        reposList: PropTypes.array,
        selectedRepoIndex: PropTypes.number,
        sortReposBy: PropTypes.object,
    }

    handleChange = (newSortByValue) => {
        const { changeReposSortByValue } = this.props;
        changeReposSortByValue(newSortByValue);
    }

    handleClick = (index) => {
        const { changeSelectedRepo } = this.props;
        changeSelectedRepo(index);
    }

    renderReposList = () => {
        const { reposList, selectedRepoIndex } = this.props;
        return (reposList.length ?
            reposList.map((repo, index) => {
                const { name, description, language, forks, watchers } = repo;
                return <Repo name={name} description={description} language={language} forks={forks} watchers={watchers} handleClick={this.handleClick} key={`${name}_${index}`} index={index} selectedRepoIndex={selectedRepoIndex} />
            }) : null
        )
    }

    render() {
        const { sortReposBy, orgName } = this.props;
        return (
            <Fragment>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <h3>Repos List: {orgName}</h3>
                        <p>(Click on a repo to display the commits on the right-hand side panel)</p>
                    </div>
                    <div className={styles.sortByRow}>
                        <p className={styles.sortByLabel}>Sortby:</p>
                        <Select
                            value={sortReposBy}
                            onChange={this.handleChange}
                            options={options}
                            className={styles.dropDownList}
                        />
                    </div>
                    {this.renderReposList()}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    reposList: get(state, 'reposList', []),
    sortReposBy: get(state, 'sortReposBy', {}),
    selectedRepoIndex: get(state, 'selectedRepoIndex', 0),
    orgName: get(state, 'orgName', '')
})

const mapDispatchToProps = {
    changeReposSortByValue,
    changeSelectedRepo
}
export default connect(mapStateToProps, mapDispatchToProps)(ReposList);