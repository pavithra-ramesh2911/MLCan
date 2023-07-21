import React, { FC, ReactNode, useCallback, useState } from "react";
import {
  Select,
  Table,
  TablePaginationConfig,
  Spin,
} from "antd";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
  TableRowSelection,
} from "antd/lib/table/interface";
import { User } from "../../../../models/user.model";
import { debounce } from "lodash";

const { Option } = Select;

interface UserTableProps {
  data?: any;
  handleSearch: Function;
  placeholder?: string;
  totalRecords?: number;
  columns: any;
  loading?: boolean;
  handleRedirect?: any;
  rowKey?: (record: any) => string | number;
  pagination?: boolean;
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => void;

  handleEdit?: (record: User) => void;
}

const UserTable: FC<UserTableProps> = (props) => {
  const {
    data,
    handleSearch,
    onChange,
    columns,
    pagination,
    rowKey,
    loading,
    handleRedirect,

  } = props;

  const updatedColumns = [...columns];
  const searchHandler = useCallback(debounce(handleSearch as any, 500), []);
  const handleChange = (e: any) => {
    searchHandler(e?.target?.value);
  };


  return (
    <>
      <div className="input-wrapper user-input">
        <span className="icon-search" />
        <input
          type="text"
          placeholder="Search by name"
          defaultValue={""}
          onChange={handleChange}
          
        />
      </div>
      {loading ? (
        <div className="loading-indicator">
          <Spin size="large"
          className="custom-spin"
          spinning={loading} />
        </div>
      ) : (
      <Table
        dataSource={data}
        columns={updatedColumns}
        className="user-management-table"
        onRow={handleRedirect}
        loading={loading}
        onChange={onChange}
        rowKey={rowKey}
        pagination={false}
      />
      )}
    </>
  );
};

export default UserTable;
