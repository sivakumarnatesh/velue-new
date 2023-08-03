import { Table } from 'antd';
import React from 'react';

function AntdTable(props) {
  const { pageNo, limit, total, data, showSizeChanger } = props;
  return (
    <Table
      pagination={{
        current: pageNo,
        pageSize: limit,
        total,
        hideOnSinglePage: true,
        showSizeChanger:false,
        defaultPageSize: limit,
        // onShowSizeChange: false,
        position: ['bottomCenter'],
      }}
      dataSource={data}
      {...props}
    />
  );
}

export default AntdTable;