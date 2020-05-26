import React, { Component, Fragment } from 'react';
import styles from './CommitsList.module.scss';
import Select from 'react-select';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Commit from './Commit';
import { changeBranch } from '../../actions';
import PropTypes from 'prop-types';

class CommitsList extends Component {

    static propsTypes = {
        commitsList: PropTypes.array,
        selectedBranch: PropTypes.string,
        branchesList: PropTypes.array,
        changeBranch: PropTypes.func
    }
    renderCommitsList = () => {
        const { commitsList } = this.props;
        return (commitsList.length ? commitsList.map((commit, index) => {
            const { commit: { message, author: { name, date } }, html_url } = commit;
            return <Commit message={message} author={name} date={date} url={html_url} key={`${name}_${index}`} />
        }) : null);
    }
    handleBranchChange = (newBranch) => {
        const { changeBranch } = this.props;
        changeBranch(newBranch);
    };
    render() {
        let repoName = '';
        const { selectedBranch, branchesList, reposList, selectedRepoIndex, orgName } = this.props;
        if (reposList[selectedRepoIndex]) {
            repoName = reposList[selectedRepoIndex].name;
        }
        const branches = branchesList.map(branch => ({
            value: branch.commit.sha,
            label: branch.name
        }));
        const selectedBranchObj = {
            value: selectedBranch,
            label: selectedBranch
        }
        return (
            <Fragment>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <h3>Commits List:- {orgName && <strong>{orgName} / {repoName} / {selectedBranch} </strong>}</h3>
                        <p>(Switch branches to see commits from different branches)</p>
                    </div>
                    <div className={styles.sortByRow}>
                        <p className={styles.sortByLabel}>Select Branch:</p>
                        <Select
                            value={selectedBranchObj}
                            placeholder='Select a branch'
                            onChange={this.handleBranchChange}
                            options={branches}
                            className={styles.dropDownList}
                        />
                    </div>
                    {this.renderCommitsList()}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    commitsList: get(state, 'commitsList', []),
    selectedBranch: get(state, 'selectedBranch'),
    branchesList: get(state, 'branchesList'),
    reposList: get(state, 'reposList', []),
    selectedRepoIndex: get(state, 'selectedRepoIndex', 0),
    orgName: get(state, 'orgName', '')
});

const mapDispatchToProps = {
    changeBranch
};
export default connect(mapStateToProps, mapDispatchToProps)(CommitsList);
