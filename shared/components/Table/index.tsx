import React, { FC, ReactNode, useCallback, useEffect, useState } from "react";
import {
  Select,
  Table,
  DatePicker,
  TablePaginationConfig,
  Spin,
} from "antd";
import moment from "moment";
import { debounce } from "lodash";
import "../../../views/Home/Container/Container.scss";
import ContainerMetaService from "../../../services/ContainerService/meta.service";
import { Containers } from "../../../models/container.model";

const { Option } = Select;

interface CustomerTableProps {
  data?: any;
  handleSearch?: Function;
  placeholder?: string;
  totalRecords?: number;
  columns?: any;
  loading?: boolean;
  handleRedirect?: any;
  rowKey?: (record: any) => string | number;
  pagination?: boolean;
  onChange?: (
    pagination: TablePaginationConfig,
  ) => void;


}
interface Customer {
  name: string;
  id: string;
}
const ContainerTable: FC<CustomerTableProps> = (props) => {
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
  


  const [yardOptions, setYardOptions] = useState<string[]>([]); 
const [activityOptions, setActivityOptions] = useState<string[]>([]); 
const [customerOptions, setCustomerOptions] = useState<Customer[]>([]); 
const [error, setError] = useState<Error | undefined>(undefined);
const [containerFilterData, setContainerFilterData] = useState<Containers[]>([]);


const {fetchYardData, fetchLengthData, fetchHeightData, fetchTypeData, fetchActivityStatusData , fetchFilteredData, fetchCustomerData} = ContainerMetaService();

useEffect(() => {
  const fetchData = async () => {
    try {
      const yardData = await fetchYardData();
      const activityStatusData = await fetchActivityStatusData();
      const customersData = await fetchCustomerData();


      setYardOptions(yardData);
      setActivityOptions(activityStatusData);
      setCustomerOptions(customersData);
      console.log("Cus",customersData)
    } catch (error: any) {
      setError(error);
    } 
  };

  fetchData();
}, []);


  const searchHandler = useCallback(debounce(handleSearch as any, 500), []);
  const handleChange = (e: any) => {
    searchHandler(e?.target?.value);
  };

  const [isActive, setIsActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsActive(!isActive);
  };

  const handleSuffixClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };


  const [selectedFilters, setSelectedFilters] = useState({
    activity: "",
    status: "",
    yard: "",
    customers: "",
  });

  const handleResetClick = () => {
    setSelectedFilters({
      activity: "",
      status: "",
      yard: "",
      customers: "",
    });

  };

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const handleDateChange = (
    value: moment.Moment | null,
    dateString: string
  ) => {
    const formattedDate = moment(dateString).format("YYYY-MM-DD");
    console.log(value, formattedDate);
    setSelectedYear(formattedDate);
  };

  const handleActivityChange = (value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      activity: value,
    }));
  };

  const handleStatusChange = (value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleYardChange = (value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      yard: value,
    }));
  };

  const handleCustomerChange = (value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      customers: value,
    }));
  };


  const handleApplyClick = async () => {
    setIsDropdownOpen(false);
      const filteredData = await fetchFilteredData(
        selectedFilters,
        selectedYear
      );
      setContainerFilterData(filteredData);
      console.log("FILTER", filteredData);
  };




  return (
    <>
      <div className="input-wrapper container-input">
        <span className="icon-search" />
        <input
          type="text"
          placeholder="Search by container number"
          defaultValue={""}
          onChange={handleChange}
        />
         <button
          className={`custom-button ${isActive ? "active" : ""}`}
          onClick={handleDropdownClick}
        >
          <i className="icon-filter" />
          Filters
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-menu__header">
              <h4>Filters</h4>
              <button className="reset-button" onClick={handleResetClick}>
                Reset
              </button>
              <button className="apply-button" onClick={handleApplyClick}>
                Apply
              </button>
            </div>
            <div className="dropdown-menu__select">
              <div className="dropdown-menu__select__date">
                <label>Date</label>
                <DatePicker
                  className="datepicker"
                  picker="date"
                  suffixIcon={
                    <i
                      className="icon-calendar custom-suffix-icon"
                      onClick={handleSuffixClick}
                    />
                  }
                />
              </div>

              <div className="dropdown-menu__select__activity">
                <label>Activity</label>
                <Select
                  placeholder="Select"
                  optionFilterProp="children"
                  suffixIcon={
                    <i
                      className="icon-dropdown custom-suffix-icon"
                      onClick={handleSuffixClick}
                    />
                  }
                  onChange={handleActivityChange}
                  value={selectedFilters.activity || "Select"}
                >
                     <Option value="quote">quote</Option>
                  <Option value="repair">repair</Option>
                  <Option value="inspection">inspection</Option> 
                  
                </Select>
              </div>

              <div className="dropdown-menu__select__status">
                <label>Status</label>
                <Select
                  placeholder="Select"
                  optionFilterProp="children"
                  suffixIcon={<i className="icon-dropdown" />}
                  onChange={handleStatusChange}
                  value={selectedFilters.status || "Select"}
                >
                   {activityOptions.map((activity) => (
                  <Option value={activity} key={activity}>
                    {activity}
                  </Option>
                ))}
                  
                </Select>
              </div>

              <div className="dropdown-menu__select__yard">
                <label>Yard</label>
                <Select
                  placeholder="Select"
                  optionFilterProp="children"
                  suffixIcon={<i className="icon-dropdown" />}
                  onChange={handleYardChange}
                  value={selectedFilters.yard || "Select"} >
                    {yardOptions.map((yard) => (
                  <Option value={yard} key={yard}>
                    {yard}
                  </Option>
                ))}
                  
                </Select>
              </div>

              <div className="dropdown-menu__select__customer">
                <label>Customer</label>
                <Select
                  placeholder="Select a person"
                  optionFilterProp="children"
                  suffixIcon={<i className="icon-dropdown" />}
                  onChange={handleCustomerChange}
                  value={selectedFilters.customers || "Select"}
                >
                  {customerOptions.map((customer) => (
            <Option value={customer} key={customer.id}>
              {customer}
            </Option>
          ))}
                </Select>
              </div>
            </div>
          </div>
        )}


      </div>
   
      {loading ? (
        <div className="loading-indicator">
          <Spin size="large"
          className="custom-spin-container"
          spinning={loading} />
        </div>
      ) : (
        
        <Table
          dataSource={containerFilterData.length > 0 ? containerFilterData : data}
          columns={columns}
          className="container-table"
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

export default ContainerTable;
