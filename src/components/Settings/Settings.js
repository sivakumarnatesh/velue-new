import React from 'react'
import SettingsTop from './SettingsTop';
import './Settings.scss';
import RolesTable from './RolesTable';

function Settings() {
  return (
    <div className='Settings'>
      <SettingsTop />
      <RolesTable />
    </div>
  )
}

export default Settings;