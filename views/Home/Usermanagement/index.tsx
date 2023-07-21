import React, { useEffect, useState } from "react";
import Sidebar from "../../../shared/components/Sidebar/Sidebar";
import Header from "../../../shared/components/Header";
import TabPane from "antd/lib/tabs/TabPane";
import { Button, Modal, Pagination, Tabs } from "antd";
import "./Usermanagement.scss";
import UserTable from "./UserTable";
import UserDataService from "../../../services/UserService/user.service";
import { ColumnsType1 } from "./UserTable/usersData";
import UserAddForm from "./userForm/userAddForm";
import UserEditForm from "./userForm/userEditform";
import { ReactComponent as BinIcon } from "../../../assets/img/Trash-Recycle Bin-Delete-User Interface-Remove.svg";
import { boolean } from "yup";

const Usermanagement = () => {
  const { fetchUserData, deleteUserData, searchUserData } = UserDataService();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersData, setUsersData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteUserName, setDeleteUserName] = useState("");
  const [deleteUserId, setDeleteUserId] = useState("");
  const [editUserId, setEditUserId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [editUserName, setEditUserName] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [editUserPhone, setEditUserPhone] = useState("");
  const [editUserActive, setEditUserActive] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUserData(currentPage)
      .then((responseData) => {
        setUsersData(responseData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        setLoading(false);
      });
  }, [currentPage]);

  const fetchAndSetUserData = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        fetchUserData(currentPage)
          .then((responseData) => {
            setUsersData(responseData);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Failed to fetch user data:", error);
            setLoading(false);
          });
      }, 200);
    } catch (error) {
      console.error("Failed to handle form submission success:", error);
    }
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddCloseModal = async() => {
    setIsAddModalOpen(false);
  };

  const handleEditClick = (
    name: string,
    id: string,
    email: string,
    phone: string,
    active: boolean
  ) => {
    setEditUserName(name || "");
    setEditUserEmail(email || "");
    setEditUserPhone(phone || "");
    setEditUserActive(active);
    setIsEditModalOpen(true);
    setEditUserId(id);
  };

  

  const handleEditCloseModal = async () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = (name: string, id: string) => {
    setDeleteUserName(name || "");
    setDeleteUserId(id);
    setIsDeleteModalOpen(true);  
  };

  const handleDeleteCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCall = async () => {
    setIsDeleteModalOpen(false);
    await deleteUserData(deleteUserId);
   fetchAndSetUserData();
  };
  

  const handlePageChange = (PageNumber: number) => {
    setCurrentPage(PageNumber);
    console.log("current Page", PageNumber);
  };


  const handleFormSubmitSuccess = async () => {
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      fetchAndSetUserData();
  };
  

  const updatedColumns = [
    ...ColumnsType1,
    {
      title: "",
      dataIndex: "",
      render: (text: string, record: any) => (
        <span>
          <i
            className="icon-edit"
            style={{ paddingRight: "25px" }}
            onClick={() =>
              handleEditClick(
                record.name,
                record.id,
                record.email,
                record.phone,
                record.active
              )
            }
          ></i>
          <i
            className="icon-delete"
            onClick={() => handleDeleteClick(record.name, record.id)}
          ></i>
        </span>
      ),
    },
  ];

  const handleSearch = async (search: string) => {
    try {
      console.log("search:", search);
      const searchData = await searchUserData(search);
      setSearchValue(searchData);
    } catch (error) {
      console.error("Failed to search users:", error);
    }
  };

  return (
    <div className="user-management">
      <Sidebar />
      <Header title="User Management" onAddClick={handleAddClick} />
      {isAddModalOpen && (
        <Modal
          open={isAddModalOpen}
          onCancel={handleAddCloseModal}
          footer={null}
          className="UserAdd-modal"
        >
          <h1>
            Add New User{" "}
            <i className="icon-close close" onClick={handleAddCloseModal}></i>
          </h1>
          <UserAddForm 
            closeAddModal={handleFormSubmitSuccess}  />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal
          open={isEditModalOpen}
          onCancel={handleEditCloseModal}
          footer={null}
          className="UserEdit-modal"
        >
          <h1>
            Edit User{" "}
            <i className="icon-close closes" onClick={handleEditCloseModal}></i>
          </h1>
          <UserEditForm
            id={editUserId}
            username={editUserName}
            email={editUserEmail}
            phone={editUserPhone}
            active={editUserActive}
            closeEditModal={handleFormSubmitSuccess} 
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          open={isDeleteModalOpen}
          onCancel={handleDeleteCloseModal}
          footer={null}
          className="UserDelete-modal"
        >
          <BinIcon className="bin-icon" />
          <h2>
            Are you sure to delete the Admin -{" "}
            <span style={{ color: "#2989C9" }}>{deleteUserName}</span>
          </h2>
          <h3>You can't undo this action </h3>

          <Button
            className="cancel-button"
            type="primary"
            htmlType="submit"
            onClick={handleDeleteCloseModal}
          >
            Cancel
          </Button>
          <Button
            className="delete-button"
            type="primary"
            htmlType="submit"
            onClick={() => handleDeleteCall()}
          >
            Delete
          </Button>
        </Modal>
      )}
      <Tabs defaultActiveKey="1">
        <TabPane tab="Admin" key="1"></TabPane>
      </Tabs>
      <div className="user-management__body">
        <UserTable
          data={searchValue.length > 0 ? searchValue : usersData}
          columns={updatedColumns}
          handleSearch={handleSearch}
          loading={loading}
        />
        {Pagination && (
          <Pagination
            defaultCurrent={1}
            total={50}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Usermanagement;
