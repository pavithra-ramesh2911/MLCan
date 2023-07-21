import React, { useEffect, useState } from "react";
import Sidebar from "../../../shared/components/Sidebar/Sidebar";
import Header from "../../../shared/components/Header";
import { Modal, Pagination, Table, Tabs } from "antd";
import "./Container.scss";
import TabPane from "antd/lib/tabs/TabPane";
import ContainerTable from "../../../shared/components/Table";
import { Containers } from "../../../models/container.model";
import { ColumnType1, ColumnType2 } from "./containerTable/Data";
import ContainerService from "../../../services/ContainerService/container.service";
import { deserialize } from "serializr";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";
import { generatePath, useLocation, useNavigate, useParams } from "react-router-dom";
import ContainerAddForm from "./containerForm/containerAddForm";

const Container = () => {
  const navigate = useNavigate();
  const [isAddContainerModalOpen, setisAddContainerModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchContainerData, searchContainerData, fetchContainerDataTab } = ContainerService();
  const [containerData, setContainerData] = useState<Containers[]>([]);
  const [draftData, setDraftData] = useState<Containers[]>([]);
  const [doneData, setDoneData] = useState<Containers[]>([]);
  const [issuedData, setIssuedData] = useState<Containers[]>([]);
  const [approvedData, setApprovedData] = useState<Containers[]>([]);
  const location = useLocation();
  const activeTab = location.hash ? location.hash.replace("#", "") : "1"; // Get the active tab from the URL hash


  useEffect(() => {
    fetchContainerData(currentPage)
      .then((responseData) => {
        setContainerData(responseData);
        setContainerData(
          deserialize(Containers, responseData as unknown as Containers[])
        );
      })
      
      fetchContainerDataTab("draft")
      .then((responseData) => {
        setDraftData(responseData);
        setDraftData(
          deserialize(Containers, responseData as unknown as Containers[])
        );
        console.log(responseData);
      });

      fetchContainerDataTab("done")
      .then((responseData) => {
        setDoneData(responseData);
        setDoneData(
          deserialize(Containers, responseData as unknown as Containers[])
        );
        console.log(responseData);
      });


      fetchContainerDataTab("issued")
      .then((responseData) => {
        setIssuedData(responseData);
        setIssuedData(
          deserialize(Containers, responseData as unknown as Containers[])
        );
        console.log(responseData);
      });

      fetchContainerDataTab("approved")
      .then((responseData) => {
        setApprovedData(responseData);
        setApprovedData(
          deserialize(Containers, responseData as unknown as Containers[])
        );
        console.log(responseData);
      });
     
     
  }, [currentPage]);

  const handleTabChange = (tabKey: string) => {
    navigate(`/container#${tabKey}`);
  };

  const handleAddOpenClick = () => {
    setisAddContainerModalOpen(true);
  };

  const handleAddCloseClick = () => {
    setisAddContainerModalOpen(false);
  };
  const handlePageChange = (PageNumber: number) => {
    setCurrentPage(PageNumber);
    console.log("current Page", PageNumber);
  };

  const redirectContainer = (container: Containers) => ({
    onClick: () => {
      navigate(
        generatePath(AppRoutes.CONTAINER_DETAILS, { id: String(container.id) })
      );
    },
  });

  const handleSearch = async (search: string) => {
      const searchData = await searchContainerData(search);
      console.log("search", searchData.docs)
          setContainerData(
            deserialize(Containers, searchData.docs as unknown as Containers[])
          );
  };

  return (
    <div className="container">
      <Sidebar />
      <Header title="Container" onAddClick={handleAddOpenClick} />

      {isAddContainerModalOpen && (
        <Modal
          open={isAddContainerModalOpen}
          onCancel={handleAddCloseClick}
          footer={null}
          className="ContainerAdd-modal"
        >
          <h1>
            Add New Container{" "}
            <i className="icon-close closess" onClick={handleAddCloseClick}></i>
          </h1>
          <ContainerAddForm />
        </Modal>
      )}
      <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="All" key="1">
          
          <ContainerTable
            columns={ColumnType1}
            data={containerData}
            loading={loading}
            handleRedirect={redirectContainer}
            handleSearch={handleSearch}
          ></ContainerTable>
          {Pagination && (
            <Pagination
              defaultCurrent={1}
              total={40}
              onChange={handlePageChange}
            />
          )}
        </TabPane>

        <TabPane tab="Draft" key="2">
          <ContainerTable
            columns={ColumnType2}
            data={draftData}
            loading={loading}
            handleRedirect={redirectContainer}
            handleSearch={handleSearch}
          ></ContainerTable>
         
        </TabPane>

        <TabPane tab="Admin Review Pending" key="3">
          <ContainerTable
            columns={ColumnType2}
            data={doneData}
            loading={loading}
            handleRedirect={redirectContainer}
            handleSearch={handleSearch}
          ></ContainerTable>
         
        </TabPane>

        <TabPane tab="Pending Customer Approval" key="4">
          <ContainerTable
            columns={ColumnType2}
            data={issuedData}
            loading={loading}
            handleRedirect={redirectContainer}
            handleSearch={handleSearch}
          ></ContainerTable>
         
        </TabPane>

        <TabPane tab="Quotes Approved by Customer" key="5">
          <ContainerTable
            columns={ColumnType2}
            data={approvedData}
            loading={loading}
            handleRedirect={redirectContainer}
            handleSearch={handleSearch}
          ></ContainerTable>
         
        </TabPane>
      </Tabs>
  
    </div>
  );
};

export default Container;
