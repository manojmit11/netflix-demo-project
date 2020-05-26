import React from 'react'
import styles from './CommitsList.module.scss';
import Proptypes from 'prop-types';
export default function Commit({ message, author, date, url }) {

    return (
        <div className={styles.commitContainer}>
            <h4>
                <a href={url} target="_blank" rel="noopener noreferrer">{message}</a>
            </h4>
            <div className={styles.commitFooterContainer}>
                <div>Author:{author}</div>
                <div>Date:{date}</div>
            </div>
        </div>
    )
}
Commit.propTypes = {
    message: Proptypes.string,
    author: Proptypes.string,
    date: Proptypes.string,
    url: Proptypes.string
}