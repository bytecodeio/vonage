import React, { Fragment, useState, useContext, useEffect, useRef } from "react";
import { Button, Col, Container, Dropdown, Form, FormCheck, FormControl, Image, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Row, Spinner, Table, ThemeProvider } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


import { ExtensionContext } from "@looker/extension-sdk-react";

const CustomTable = ({
  data,
  cols,
  handleShow,
  selectedRow,
  setSelectedRow,
  search,
  setSearch,
  loading,
  appConfig
}) => {

  const [users1, setUsers1] = useState([]);
  const [last, setLast] = useState(null);

  useEffect(() => {
    getUsers(data);
  }, [data]);

  const isAllDisabled = data?.data && data.data?.every((row) => row.enabled === false);

  const getUsers = data => {
    setUsers1(data);
  };

  const bylast = (user, last) => {
    if (last) {
      return user.last_name.toLowerCase().includes(search.toLowerCase());

    } else return user;
  };

  const bySearch = (user, search) => {
    if (search) {
      return user.name.toLowerCase().includes(search.toLowerCase()) || user.user.last_name.toLowerCase().includes(search.toLowerCase()) ||
        user.user.first_name.toLowerCase().includes(search.toLowerCase());

    } else return user;
  };

  const filteredList = (users1, last, search) => {
    return users1
      .filter(user => bylast(user, last))
      .filter(user => bySearch(user, search));
  };

const { extensionSDK } = useContext(ExtensionContext);
const baseUrl = extensionSDK.lookerHostData.hostUrl

  return (
    <Fragment>
      <Table className="mt-5 mb-5 pt-5 thisTable">
        <thead>
          <tr>
            <th>
              <h6>REPORT NAME</h6>
            </th>

            <th>
              <h6>FIRST NAME</h6>
            </th>
            <th>
              {" "}
              <h6>LAST NAME</h6>
            </th>
            <th>
              {" "}
              <h6>OWNER</h6>
            </th>

            <th>
              {" "}
              <h6>CONTENT TYPE</h6>
            </th>

            <th>
              {" "}
              <h6>RECIPENTS</h6>
            </th>

            <th>
              {" "}
              <h6>MESSAGE</h6>
            </th>
            <th>
              {" "}
              <h6>EDIT</h6>
            </th>
          </tr>
        </thead>

        <tbody>

          {filteredList(users1, last, search).map((row, i) => {
            return (
              <tr key={row.id}>
                {
                  row.look_id == null && row.custom_url_params === '' ? (

                    <td><a class="white" href={`${baseUrl}/dashboards/${row.dashboard_id}`} target="_blank">{row.name}</a></td>
                  )
                    :
                    row.custom_url_params === '' ? (

                      <td><a class="white" href={`${baseUrl}/looks/${row.look_id}`} target="_blank">{row.name}</a></td>
                    ) : (

                      <td><a class="white" href={`${baseUrl}${row.custom_url_params}`} target="_blank">{row.name}</a></td>
                    )
                }
                <td>{row.user.first_name}</td>
                <td>{row.user.last_name}</td>

                <td><a class="white" href={`${baseUrl}/admin/users/${row.user.id}/edit`} target="_blank">{row.user.display_name}</a></td>

                {
                  row.scheduled_plan_destination[0].format == 'wysiwyg_pdf' && row.scheduled_plan_destination[0].type === 'email' ? (

                  <td>PDF attachment via Email</td>

                ) :
                  row.scheduled_plan_destination[0].format == 'csv' && row.scheduled_plan_destination[0].type === 's3' ? (

                    <td>CSV file via Amazon S3</td>
                  ) :

                    row.scheduled_plan_destination[0].format == 'wysiwyg_pdf' && row.scheduled_plan_destination[0].type === 'looker-integration://1::slack_app' ? (

                      <td>PDF file via Slack</td>
                    ) :

                      row.scheduled_plan_destination[0].format == 'csv_zip' && row.scheduled_plan_destination[0].type === 'email' ? (

                        <td>CSV ZIP file attachment via Email</td>

                      ) :

                      row.scheduled_plan_destination[0].format == 'inline_table' && row.scheduled_plan_destination[0].type === 'email' ? (

                        <td>Data Table via Email</td>

                      ) : row.scheduled_plan_destination[0].format == 'csv_zip' && row.scheduled_plan_destination[0].type === 'looker-integration://1::slack_app' ? (

                        <td>CSV ZIP file file via Slack</td>

                      ) : row.scheduled_plan_destination[0].format == 'csv_zip' && row.scheduled_plan_destination[0].type === 'looker-integration://1::google_drive' ? (

                        <td>CSV ZIP file file via Google Drive</td>

                      ) : row.scheduled_plan_destination[0].format == 'wysiwyg_png' && row.scheduled_plan_destination[0].type === 'email' ? (

                        <td>Visualization attachment via Email</td>

                      ) : row.scheduled_plan_destination[0].format == 'wysiwyg_pdf' && row.scheduled_plan_destination[0].type === 'looker-integration://1::google_drive' ? (

                        <td>PDF file via Google Drive</td>

                          ) : (
                            <td>Other</td>
                      )
                   }

                <td>{row.scheduled_plan_destination[0].address}</td>

                <td>{
                  !row.enabled || isAllDisabled ? (
                    <p class="paused">Schedule is Paused</p>
                  ) : (
                    <p class="active">Schedule is Active</p>
                  )
                }</td>
                <td>
                  <p>
                    <i
                      class="fal fa-edit fa-1x"
                      onClick={() => {
                        handleShow();
                        setSelectedRow(row);
                        console.log(row, "row");
                      }}

                    ></i>
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Fragment>
  );
};


function Template1({ description }) {
  const extensionContext = useContext(ExtensionContext);
  const sdk = extensionContext.core40SDK;
  const extensionSDK = extensionContext.extensionSDK;
  const { hostUrl } = extensionContext.extensionSDK.lookerHostData;
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({ cols: null, data: null });
  const [selectedRow, setSelectedRow] = useState();
  const [search, setSearch] = useState(null);
  const [status, setStatus] = useState(undefined);

  const [formData, setFormData] = useState({
    scheduleName: "",
    firstName: "",
    lastName: "",
    contentType: "",
    address: "",
    message: "",
    enabled: false,
  });

  const isAllEnabled = data?.data && data.data?.every((row) => row.enabled === true);
  const isAnyEnabled = data?.data && data.data?.some((row) => row.enabled === true);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDisabled = () => {
    setFormData({
      ...formData,
      enabled: !formData.enabled,
    });
    setSelectedRow({
      ...selectedRow,
      enabled: !formData.enabled,
    });
  };

  useEffect(() => {

    if (selectedRow) {
      setFormData({
        scheduleName: selectedRow.name || "",
        firstName: selectedRow.user.first_name || "",
        lastName: selectedRow.user.last_name || "",
        contentType: selectedRow.scheduled_plan_destination[0].format || "",
        address: selectedRow.scheduled_plan_destination[0].address || "",
        message: selectedRow.scheduled_plan_destination[0].message || "",
        enabled: selectedRow.enabled || false
      });
    }
  }, [selectedRow]);


  const handleUpdate = async () => {
    setLoading(true);
    let response = await sdk.ok(
      sdk.update_scheduled_plan(
        selectedRow?.scheduled_plan_destination[0].scheduled_plan_id,
        {
          ...selectedRow,
          scheduled_plan_destination: [
            {
              ...selectedRow.scheduled_plan_destination[0],
              address: formData.address,
              message: formData.message,
            },
          ],
          user: {
            ...selectedRow.user,
            first_name: formData.firstName,
            last_name: formData.lastName,
          },

          enabled: formData.enabled,

          res: {
            ...selectedRow,
            scheduleName: formData.scheduleName,
          },
        }
      )
    );

    if (response) {
      console.log(response, "response");

      const newData = data?.data?.map((row) => {
        if (row.id === selectedRow.id) {
          return {
            ...selectedRow,
          };
        }
        return row;
      });

      extensionSDK.saveContextData({ data: newData, cols: data.cols });
      setData({ data: newData, cols: data.cols });
      handleClose();
      setLoading(false);

    }
    else {

      setLoading(false);

    }
  };

  const callSDKFuncs = async (is_all_users) => {

    const res = await sdk.ok(sdk.all_scheduled_plans(is_all_users))

    const usersContextData = extensionSDK.getContextData() || null

    if(!usersContextData) {
      const cols = res?.length ? Object.keys(res[0]).map((i) => i) : null
      extensionSDK.saveContextData({ data: res, cols })
      setData({ data: res, cols });
      setLoading(false);
    }
    else {
      let contextData = usersContextData?.data
      let temp = res
      for (const schedule of contextData) {
        let is_available = false
        for (const data of res) {
          if (schedule.id == data.id) {
            is_available = true
            break
          }
        }

        if(!is_available) {
          try{
            let response = await sdk.ok(sdk.scheduled_plan(schedule.id))
            if(response.id == schedule.id) temp.push(schedule)
          } catch(err) {
            console.log(err)
          }
        }
      }
      temp.sort((a, b) => a.id - b.id);

      const cols = Object.keys(res[0]).map((i) => i)
      extensionSDK.saveContextData({ data: temp, cols })
      setData({ data: temp, cols })
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true);
    callSDKFuncs(true);
  }, []);


  const handleTogglePauseAll = async () => {
    setLoading(true);
    const updatedUsers = await Promise.all(
      data.data.map(async (row) => {
        return sdk.ok(sdk.update_scheduled_plan(row.scheduled_plan_destination[0].scheduled_plan_id, { enabled: !isAnyEnabled }));
      })
    )
    const usersContextData = extensionSDK.getContextData() || null;

    if (usersContextData && updatedUsers && updatedUsers.length > 0) {
      extensionSDK.saveContextData({ data: updatedUsers, cols: data.cols });
      setData({ data: updatedUsers, cols: data.cols });
      setLoading(false);
    }
    setSelectedRow(null);
    setLoading(false);
  };

  return (
    <Fragment>

      <Container fluid>
        <h2 class="intro-title text-center mb-5 pb-0">Report Scheduler</h2>
        <div className="position-relative fancy-short-banner-five">
          <Container fluid className="p5">
            <div class="bg-wrapper mb-5">
              <div class="bg-black blackBG">
                <div class="row align-items-center mb-5">
                  <div
                    class="col-lg-5 text-center text-lg-start aos-init aos-animate"
                    data-aos="fade-right"
                  >
                    <h3 class="pe-xxl-5 md-pb-20">Scheduled Reports</h3>
                  </div>

                  <div
                    class="col-lg-4 text-center text-lg-end aos-init aos-animate"
                    data-aos="fade-left"
                  >

                    <div className="position-relative">
                      <input onChange={e => setSearch(e.target.value)} placeholder="Search Report Name or Last Name" type="search" class="form-control" />
                      <i class="far fa-search absoluteSearch"></i>
                    </div>

                  </div>
                  <div
                    class="col-lg-3 all">
                    {
                      loading ?
                        (<Spinner animation="border" role="status" />)
                        :
                        (<Form.Check
                          onClick={handleTogglePauseAll}
                          checked={!isAnyEnabled}
                          type="switch"
                          id="custom-switch"
                          label="PAUSE ALL SCHEDULES"
                          style={{
                            cursor: "pointer"
                          }}
                        />)
                    }
                  </div>
                </div>

                <div className="dashboard-content">

                  {data.data && (
                    <CustomTable
                      data={data.data}
                      cols={data.cols}
                      handleShow={handleShow}
                      selectedRow={selectedRow}
                      setSelectedRow={setSelectedRow}
                      search={search}
                      setSearch={setSearch}

                    />
                  )}

                </div>
              </div>
            </div>
          </Container>

        </div>

        <Modal show={show} onHide={handleClose}>
          <div class="bgWhite">
            <Modal.Header>
              <i class="fal fa-times-circle" onClick={handleClose}></i>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mt-3">
                <Col xs={12} md={12}>
                  <Form>
                    <div className="cardForm">
                      <Row>
                        <h4 class="mb-3">Update Schedules</h4>

                        <Col xs={12} md={6}>
                          <Form.Group controlId="" class="grayBorder">
                            <Form.Label>SCHEDULER FIRST NAME</Form.Label>
                            <Form.Control

                              value={formData.firstName}
                              name="firstName"
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                          <Form.Group controlId="" class="grayBorder">
                            <Form.Label>SCHEDULER LAST NAME</Form.Label>
                            <Form.Control

                              value={formData.lastName}
                              name="lastName"
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} lg={6} md={12}>
                          <Form.Group controlId="" class="grayBorder">
                            <Form.Label>EMAIL ADDRESS</Form.Label>
                            <Form.Control

                              value={formData.address}
                              name="address"
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                          <Form.Group controlId="" class="grayBorder">
                            <Form.Label>SCHEDULE NAME</Form.Label>
                            <Form.Control

                              value={formData.scheduleName}
                              name="scheduleName"
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                          <Form.Check
                            onClick={handleDisabled}
                            disabled={!isAnyEnabled ? true : false}
                            checked={!selectedRow?.enabled}
                            type="switch"
                            id="custom-switch"
                            label="PAUSE REPORT"
                            style={{
                              opacity: !isAnyEnabled ? 0.5 : 1,
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <a
                class="btn-eight"
                onClick={() => {
                  handleUpdate();
                }}
              >
                Save
              </a>
              <a class="btn-one" onClick={handleClose}>
                Close
              </a>
            </Modal.Footer>
          </div>
        </Modal>
      </Container>

    </Fragment>
  );
};

export default Template1;
