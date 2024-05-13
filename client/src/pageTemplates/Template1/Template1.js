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
      return user.id.toLowerCase().includes(search.toLowerCase());

    } else return user;
  };

  const bySearch = (user, search) => {
    if (search) {
      return user.id.toLowerCase().includes(search.toLowerCase()) || user.name.toLowerCase().includes(search.toLowerCase())

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
      <Table className="mb-5 thisTable">
        <thead>
          <tr>


            <th>
              <h6>ID</h6>
            </th>

            <th>
             <h6>REPORT NAME</h6>
           </th>
           <th>
            <h6>EMAIL</h6>
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
                <td>{row.id}</td>


               <td>{row.name}</td>


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
    id: 0,
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
        id: selectedRow.id || 0,
        enabled: selectedRow.enabled || false
      });
    }
  }, [selectedRow]);


  const handleUpdate = async () => {
    setLoading(true);
    let response = await sdk.ok(
      sdk.update_scheduled_plan(
        selectedRow?.id,
        {
          ...selectedRow,
          enabled: formData.enabled,
        }
      )
    );

    if (response) {
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

    const cols = ['id', 'enabled', 'name', 'scheduled_plan_destination']

    const res = await sdk.ok(sdk.all_scheduled_plans({
      fields: 'id, enabled, name, scheduled_plan_destination',
      all_users: is_all_users
    }))

    const usersContextData = extensionSDK.getContextData()

    if(!usersContextData.data) {
      extensionSDK.saveContextData({ data: res, cols })
      setData({ data: res, cols });
      setLoading(false);
    }
    else {
      let contextData = usersContextData?.data
      let temp = res

      const batchSize = 50;
      const batches = Math.ceil(contextData.length / batchSize);

      for (let i = 0; i < batches; i++) {
        const start = i * batchSize;
        const end = Math.min((i + 1) * batchSize, contextData.length);
        const batch = contextData.slice(start, end);
        await Promise.all(batch.map(async (schedule) => {
          let is_available = false
          for (const data of temp) {
            if (schedule.id == data.id) {
              is_available = true
              break
            }
          }

          if(!is_available) {
            try{
              let response = await sdk.ok(sdk.scheduled_plan(schedule?.id, 'id, enabled'))
              if(response.id == schedule.id) temp.push(response)
            } catch(err) {
              console.log("getting schedule failed", schedule?.id)
              console.log(err)
            }
          }
        }));

        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      temp.sort((a, b) => a.id - b.id);

      const cols = ['id', 'enabled']
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
    const batchSize = 50;
    const batches = Math.ceil(data.data.length / batchSize);

    for (let i = 0; i < batches; i++) {
      const start = i * batchSize;
      const end = Math.min((i + 1) * batchSize, data.data.length);
      const batch = data.data.slice(start, end);
      await Promise.all(batch.map(async (row) => {
        if( row.enabled == isAnyEnabled ) {
          try{
            return await sdk.ok(sdk.update_scheduled_plan(row.id, { enabled: !isAnyEnabled }));
          }
          catch(e) {
            console.log(e)
          }
        }
      }));

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    let updatedUsers = data.data.map(item => ({
      id: item.id,
      enabled: !isAnyEnabled,
    }));

    const usersContextData = extensionSDK.getContextData() || null;
    const cols = ['id', 'enabled']

    if (usersContextData.data && updatedUsers && updatedUsers.length > 0) {
      extensionSDK.saveContextData({ data: updatedUsers, cols });
      setData({ data: updatedUsers, cols });
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
                      <input onChange={e => setSearch(e.target.value)} placeholder="Search Report by ID or Name" type="search" class="form-control" />
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
              <Row className="mt-3 mb-5">
                <Col xs={12} md={12}>
                  <Form>
                    <div className="cardForm">
                      <Row>
                        <h4 class="mb-3">Update Single Schedule by ID</h4>


                        <Col xs={12} md={12}>
                          <Form.Group controlId="" class="grayBorder">
                            <Form.Label>SCHEDULE ID</Form.Label>
                            <Form.Control

                              value={formData.id}
                              name="scheduleName"
                            />
                          </Form.Group>
                        </Col>



                        <Col xs={12} md={12}>
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
