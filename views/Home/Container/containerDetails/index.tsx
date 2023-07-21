import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../../../shared/components/Sidebar/Sidebar";
import "./containerDetails.scss";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { Containers } from "../../../../models/container.model";
import {  Input, Modal, Spin, Table, Tabs } from "antd";
import { AppRoutes } from "../../../../routes/routeConstants/appRoutes";
import ContainerEditForm from "../containerForm/containerEditForm";
import moment from "moment";
import { deserialize } from "serializr";
import ContainerService from "../../../../services/ContainerService/container.service";
import { Logs } from "../../../../models/log.model";
import { ColumnsType } from "antd/lib/table/interface";
import { Comments } from "../../../../models/comment.model";
import { Formik, Form, FormikConfig } from "formik";
import InputField from "../../../../shared/components/InputField";
import { Activity } from "../../../../models/activity.model";


const ContainerDetails = () => {
  
  const { TabPane } = Tabs;
  const { id } = useParams();
  const [searchValueLog, setSearchValueLog] = useState("");
  const [loading, setLoading] = useState(false);
  const [eachContainerData, setEachContainerData] = useState<Containers | undefined>(undefined);
  const [containercomments, setContainerComments] = useState<Comments[]>([]);
  const [containerlogs, setContainerLogs] = useState<Logs[]>([]);
  const [containeractivity, setContainerActivity] = useState<Activity[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.hash ? location.hash.replace("#", "") : "1"; 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingActivity, setIsLoadingActivity] = useState(false);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [isLoadingLog, setIsLoadingLog] = useState(false);

  useEffect(() => {
    navigate(`/container/${id}#${activeTab}`);
  }, [id, activeTab, navigate]);

  const handleTabChange = (tabKey: string) => {
    navigate(`/container/${id}#${tabKey}`);
  };


  const {
    fetchEachContainerData,
    fetchComments,
    handleCommentSubmit,
    fetchLogs,
    fetchActivity,
  } = ContainerService();

  const handleContainerButtonClick = () => {
    navigate(AppRoutes.CONTAINERS);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingActivity(true);
      setIsLoadingComment(true);
      setIsLoadingLog(true);
      try {
        const containerData = await fetchEachContainerData(id ?? "");
        setEachContainerData(deserialize(Containers, containerData));

        const commentsData = await fetchComments(id ?? "");
        setContainerComments(deserialize(Comments, commentsData) as Comments[]);

        const logsData = await fetchLogs(id ?? "");
        setContainerLogs(deserialize(Logs, logsData as unknown as Logs[]));

        const activityData = await fetchActivity(id ?? "");
        setContainerActivity(deserialize(Activity, activityData as unknown as Activity[]));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        setIsLoadingActivity(false);
        setIsLoadingComment(false);
        setIsLoadingLog(false);
      }
    };


    fetchData();
  }, [id]);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const Logcolumns: ColumnsType<Logs> = [
    {
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: moment.MomentInput) => {
        const formattedDate = moment(text).format("DD MMM YY [at] HH:mm:ss");
        return <span>{formattedDate}</span>;
      },
    },
    {
      dataIndex: "formType",
      key: "formType",
      render: (text: string, record: Logs) => {
        const combinedValue = `${text} form - ${record.uid} `;
        const status = "status changed from ";
        const statusChange = `${record.prevStatus} -> ${record.currentStatus}`;
        const by = "by";
        const Admin = `Admin - ${record.creator?.name}`;

        return (
          <span>
            <span style={{ color: "#356AE6" }}>{combinedValue} &nbsp;</span>
            {status}
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>
              {statusChange} &nbsp;
            </span>
            {by} &nbsp;
            <span style={{ color: "#F99F1C" }}>{Admin}</span>
          </span>
        );
      },
    },
  ];

  const handleSubmit: FormikConfig<{ comment: string }>["onSubmit"] = async (
    values,
    { resetForm }
  ) => {
    setLoading(true);
    try {
      await handleCommentSubmit(values, id ?? "");
      const commentsData = await fetchComments(id ?? "");
      setContainerComments(deserialize(Comments, commentsData) as Comments[]);
      resetForm();
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-details">
      <Sidebar />
      <div className="container-details__content">
        <div className="container-details__header">
          <button onClick={handleContainerButtonClick}>
            &larr; Containers
          </button>
          <div className="container-details__header__UID">
            <h1>{eachContainerData?.uid || "Loading..."}</h1>
            <i className="icon-edit" onClick={handleAddClick}></i>
            {isModalOpen && (
              <Modal open={isModalOpen} footer={null}>
                <h1>
                  Edit Container{" "}
                  <i
                    className="icon-close edit-close "
                    onClick={handleCloseModal}
                  ></i>
                </h1>
                <ContainerEditForm />
              </Modal>
            )}
          </div>

          <div className="container-details__header__content">
            <div className="yard">
              <h5>Yard name</h5>
              <h4>{eachContainerData?.yard}</h4>
            </div>

            <div className="customer">
              <h5>Customer</h5>
              {eachContainerData && eachContainerData.customer && (
                <h4>{eachContainerData.customer.name}</h4>
              )}
            </div>

            <div className="owner">
              <h5>Owner Name</h5>
              <h4>{eachContainerData?.owner}</h4>
            </div>

            <div className="submitter">
              <h5>Submitter Initials</h5>
              <h4>{eachContainerData?.submitter}</h4>
            </div>

            <div className="length">
              <h5>Length</h5>
              <h4>{eachContainerData?.length}&nbsp;&nbsp;FEET</h4>
            </div>

            <div className="height">
              <h5>Height</h5>
              <h4>{eachContainerData?.height}&nbsp;&nbsp;FEET</h4>
            </div>

            <div className="type">
              <h5>Container Type</h5>
              <h4>{eachContainerData?.type}</h4>
            </div>

            <div className="year">
              <h5>Manufacture Year</h5>
              <h4>{eachContainerData?.year}</h4>
            </div>
          </div>
        </div>

        <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="Activity" key="1">
          {isLoadingActivity ? (
              <Spin className="custom-spin-container"/>
            ) :containeractivity && containeractivity.length
              ? containeractivity.map((activity) => (
                  <div className="activity-body" key={activity.id}>
                    {activity.activityType === "repair" && (
                      <i className="activity-icon">
                        <div className="icon-repair" />
                      </i>
                    )}
                    {activity.activityType === "inspection" && (
                      <i className="activity-icon">
                        <div className="icon-inspection" />
                      </i>
                    )}
                    {activity.activityType === "quote" && (
                      <i className="activity-icon">
                        <div className="icon-quote" />
                      </i>
                    )}

                    <h5>{activity.activityType} Form</h5>
                    <h2>{activity.uid}</h2>
                    <h4>{moment(activity.createdAt).format("DD MMM YY")}</h4>
                  </div>
                ))
              : null}
          </TabPane>

          <TabPane tab="Comment" key="2" >
          {isLoadingComment ? (
              <Spin className="custom-spin-container" />
            ) : (
              <>
            <div className="comment_input">
              <Formik initialValues={{ comment: "" }} onSubmit={handleSubmit}>
                <Form className="comment">
                  <InputField
                    type="text"
                    name="comment"
                    placeholder={"Type your comment"}
                  />

                  <button type="submit" className="comment-button">
                    Add Comment
                  </button>
                </Form>
              </Formik>
            </div>

            <div className="comment_body">
              {containercomments && containercomments ? (
                containercomments.map((containercomments) => (
                  <div className="comment_item" key={id}>
                    <div className="commenter">
                      <h1>RU</h1>
                      <h3>{containercomments.commenter?.name}</h3>
                      <h4>
                        {moment(containercomments.createdAt).format(
                          "DD MMM YY"
                        )}
                      </h4>
                    </div>
                    <p>{containercomments.comment}</p>
                  </div>
                ))
              ) : (
                <p>No comments available.</p>
                
              )}
            </div>
            </>
             )}
          </TabPane>

          <TabPane tab="Log" key="3" className="no-scroll">
          {isLoadingLog ? (
              <Spin size="large"
              className="custom-spin-container"
              spinning={loading}/>
            ) : (
              <>
            <Input
              className="log-search"
              type="text"
              placeholder="Search by container number"
              value={searchValueLog}
              prefix={<i className="icon-search"></i>}
              // onChange={handleChangeLog}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // handleSearchLog();
                }
              }}
            />
            <Table
              className="log-table"
              dataSource={containerlogs}
              columns={Logcolumns}
              pagination={false}
            ></Table>
             </>
            )}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ContainerDetails;
