import {User} from '../../../../models/user.model';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { Tag } from 'antd';
import React from 'react'




export const ColumnsType1: ColumnsType<User> = [
    {
      title:"ID",
      dataIndex: "uid",
      key:"uid",
      
    },
    {
        title:"Name",
        dataIndex:"name",
        key:"name",

    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",

    },

    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      render: (phoneNumber) => {
        const formattedPhoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
        return <span>{formattedPhoneNumber}</span>;
      },
    },
    
      {
        title: "Status",
        dataIndex: "active",
        key: "status",
        render: (active: boolean) => (
          <Tag
      style={{
        backgroundColor: active ? "#ABF5D3" : "#FFC1D4",
        color: active ? "#056344" : "#C92B3E",
        fontSize: "13px",
        borderRadius: "10px",
        border: "none",
        paddingLeft: "8px",
        paddingRight: "2px",
        width: active ? "52px" : "60px",

      }}
    >
            {active ? "Active" : "Inactive"}
          </Tag>
        ),
      },
     
  ];



