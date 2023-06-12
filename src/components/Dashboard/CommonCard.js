import React from 'react'
import Title from '../../sharedComponents/Title/Title';
import { Select } from 'antd';

const CommonCard = ({Children}) => {
    const {Option} = Select;
  return (
    <div className='CommonCard'>
        <div className='CardTop'>
            <Title title='Sales Dashboard' className='Sales' />
            <div>
                <Select className='Dropdown' defaultValue='This month'>
                    <Option value='month'>This month</Option>
                </Select>
            </div>
        </div>
        <div className='Children'>{Children}</div>
    </div>
  )
}

export default CommonCard;