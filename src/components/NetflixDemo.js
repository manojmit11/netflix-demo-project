import React, { Component, Fragment } from 'react';
import TextInput from './TextInput/TextInput';
import ReposList from './ReposList/ReposList';
import CommitsList from './CommitsList/CommitsList';
import styles from './NetflixDemo.module.scss';
import { connect } from 'react-redux';
import {
    getListOfRepos,
} from '../actions';
import get from 'lodash/get';
import PropTypes from 'prop-types';

class NetflixDemo extends Component {
    state = {
        orgName: '',
    }

    static propTypes = {
        getListOfRepos: PropTypes.func,
        reposList: PropTypes.array,
        commitsList: PropTypes.array,
    }
    handleOrgNameSubmit = (e) => {
        const { getListOfRepos } = this.props;
        getListOfRepos(this.state.orgName);
    }
    handleOrgNameChange = (e) => {
        const { value } = e.target;
        this.setState({
            orgName: value
        });
    }
    render() {
        const { orgName } = this.state;
        const { reposList, commitsList, errorState } = this.props;
        return (
            <Fragment>
                <header>
                    <h1>
                        Manoj's Git
                    </h1>
                    <TextInput handleInputChange={this.handleOrgNameChange} handleOrgNameSubmit={this.handleOrgNameSubmit} orgName={orgName} />
                    {errorState && <h3 className={styles.error}>Error  while making the API call. Please try again after sometime.</h3>}
                </header>
                <section className={styles.container}>
                    <ReposList reposList={reposList} />
                    <CommitsList commitsList={commitsList} />
                </section>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    reposList: get(state, 'reposList', []),
    commitsList: get(state, 'commitsList', []),
    errorState: get(state, 'error', false)
})

const mapDispatchToProps = {
    getListOfRepos,
}

export default connect(mapStateToProps, mapDispatchToProps)(NetflixDemo);