import React from 'react';
import styles from './repo.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function Repo(props) {
    const { name, description, language, forks, watchers, handleClick, index, selectedRepoIndex } = props;
    const containerStyles = index === selectedRepoIndex ? classNames(styles.container, styles.selectedRepo) : styles.container;
    return (
        <div className={containerStyles} onClick={(e) => handleClick(index)} index={index}>
            <h3 className={styles.title}>
                <p>{name}</p>
            </h3>
            <div>{description}</div>
            <div className={styles.footer}>
                <div>Language:{language}</div>
                <div>Forks:{forks}</div>
                <div>Stars:{watchers}</div>
            </div>
        </div>
    )
}

Repo.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    language: PropTypes.string,
    forks: PropTypes.number,
    watchers: PropTypes.number,
    handleClick: PropTypes.func,
    index: PropTypes.number,
    selectedRepoIndex: PropTypes.number
}