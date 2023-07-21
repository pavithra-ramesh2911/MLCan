import { Tag } from 'antd';
import { Containers } from '../../../../models/container.model';
import { ColumnsType, TableProps } from 'antd/lib/table';
import moment from 'moment';
import React from 'react';


  export const ColumnType1: ColumnsType<Containers> = [
    {
      title:"Container Number",
      dataIndex:"uid",
      key:"uid"
    },
    {
      title:"Yard",
      dataIndex:"yard",
      key:"yard",
    },
    {
        title: "Customer",
        dataIndex: "customerName",
        key: "customerName",
    },
    {
      title:"Owner Name",
      dataIndex:"owner",
      key:"owner",

    },
    {
        title:"Current Activity",
        dataIndex:"activityType",
        key:"activityType"
      },
      {
        title: "Activity Date",
        dataIndex: "activityDate",
        key: "activityDate",
        render: (date) => {
          if (date) {
            return moment(date).format('DD MMM YYYY');
          } else {
            return "";
          }
        },
      },
      {
        title: "Status",
        dataIndex: "activityStatus",
        key: "activityStatus",
        render: (text, record) => {
          const combinedValue = record.activityType ? `${record.activityType.charAt(0).toUpperCase() + record.activityType.slice(1)} ${text}` : "Idle";
          let color = "";
          let textColor = "";
          let borderRadius = "";
          
          if (text === "billing") {
            color = "#FFEDF3";
            textColor = "#ED2C6D";
            borderRadius = "10px";
          } else if (text === "done") {
            color = "#EAE6FE";
            textColor = "#534693";
            borderRadius = "10px";
          } else if (text === "issued") {
            color = "#FFF1B4";
            textColor = "#E89319";
            borderRadius = "10px";
          } else if (text === "approved") {
            color = "#FFDFB4";
            textColor = "#DA672C";
            borderRadius = "10px";
          } else {
            color = "#ABF5D3";
            textColor = "#056344";
            borderRadius = "10px";
          }
    
          return (
            <Tag color={color} style={{ color: textColor, borderRadius: borderRadius }}>
              {combinedValue}
            </Tag>
          );
        },
      },
      
  ];


  export const ColumnType2: ColumnsType<Containers> = [
    {
      title:"Container Number",
      dataIndex: "uid",
      key:"uid",
      
    },
    {
        title:"Yard",
        dataIndex:"yard",
        key:"yard",

    },
    {
        title: "Customer",
        dataIndex: "customerName",
        key: "customerName",

    },
    {
        title:"Owner Name",
        dataIndex:"owner",
        key:"owner",

      },
    {
      title:"Activity",
      dataIndex:"activityType",
      key:"activityType",
    },
    {
      title:"Activity ID",
      dataIndex:"activityUid",
      key:"activityUid",
    },
    {
      title:"Activity Date",
      dataIndex:"activityDate",
      key:"activityDate",
      render: (date) => {
        if (date) {
          return moment(date).format('DD MMM YYYY');
        } else {
          return "";
        }
      },
    },
    {
      title: "Status",
      dataIndex: "activityStatus",
      key: "activityStatus",
      render: (text, record) => {
        const combinedValue = record.activityType ? `${record.activityType.charAt(0).toUpperCase() + record.activityType.slice(1)} ${text}` : "Idle";
        let color = "";
        let textColor = "";
        let borderRadius = "";
        
        if (text === "billing") {
          color = "#FFEDF3";
          textColor = "#ED2C6D";
          borderRadius = "10px";
        } else if (text === "done") {
          color = "#EAE6FE";
          textColor = "#534693";
          borderRadius = "10px";
        } else if (text === "issued") {
          color = "#FFF1B4";
          textColor = "#E89319";
          borderRadius = "10px";
        } else if (text === "approved") {
          color = "#FFDFB4";
          textColor = "#DA672C";
          borderRadius = "10px";
        } else {
          color = "#ABF5D3";
          textColor = "#056344";
          borderRadius = "10px";
        }
  
        return (
          <Tag color={color} style={{ color: textColor, borderRadius: borderRadius }}>
            {combinedValue}
          </Tag>
        );
      },
    },
  ];


