import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextInput.module.scss';
export default function TextInput(props) {
    const { orgName, handleOrgNameSubmit, handleInputChange } = props;
    return (
        <form onSubmit={e => { e.preventDefault(); handleOrgNameSubmit(e) }}>
            <label>
                OrgName:
                    <input type="text" value={orgName} onChange={handleInputChange} />
            </label>
            <button value="Search" disabled={orgName.length === 0}>Search</button>
        </form>
    )
}
TextInput.prototypes = {
    orgName: PropTypes.string,
    handleOrgNameSubmit: PropTypes.func,
    handleInputChange: PropTypes.func
}