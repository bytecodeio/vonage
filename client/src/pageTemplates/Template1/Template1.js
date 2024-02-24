import React, { Fragment, useState, useContext, useEffect, useRef } from "react";
import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';

import AOS from 'aos';
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { TypingEffect } from "react-typing-text-effect";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

import { LOOKER_MODEL, LOOKER_EXPLORE } from "../../utils/constants";
import { ExtensionContext } from "@looker/extension-sdk-react";

import EmbedQuery from "../../components/EmbedQuery";

import TopNav from "../../components/nav/TopNav.js";
import SideForm from "../../components/nav/Form.js";
import SwitchExplore from "../../components/nav/SwitchExplore.js";
import { createQuestion, getChatHistory, updateFeedback } from "../../services/writebackService.js";
import {v4 as uuidv4} from 'uuid'

import moment from "moment";

const CustomTable = ({
    data,
    cols,
    handleShow,
    selectedRow,
    setSelectedRow,
    search,
    setSearch
 }) => {

const [users1, setUsers1] = useState([]);
const [last, setLast] = useState(null);


useEffect(() => {
  getUsers(data);
}, [data]);

//Simulating making api call with useEffect
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
            {/*<th>
              {" "}
              <h6>NEXT RUN</h6>
            </th>*/}
            <th>
              {" "}
              <h6>RECIPENTS</h6>
            </th>
            {/*<th>
              {" "}
              <h6>HISTORY</h6>
            </th>*/}

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
                row.look_id == null &&  row.custom_url_params === '' ? (

                    <td><a class="white" href={`https://looker.bytecode.io/dashboards/${row.dashboard_id}`} target="_blank">{row.name}</a></td>
                )
                :
                row.custom_url_params === '' ? (

                    <td><a class="white" href={`https://looker.bytecode.io/looks/${row.look_id}`} target="_blank">{row.name}</a></td>
                )  : (

                    <td><a class="white" href={`https://looker.bytecode.io${row.custom_url_params}`} target="_blank">{row.name}</a></td>
                  )
              }

             <td>{row.user.first_name}</td>
             <td>{row.user.last_name}</td>

             <td><a class="white" href={`https://looker.bytecode.io/admin/users/${row.user.id}/edit`}  target="_blank">{row.user.display_name}</a></td>

               {
                 row.scheduled_plan_destination[0].format == 'wysiwyg_pdf' &&  row.scheduled_plan_destination[0].type === 'email' ? (


                  <td>PDF attachment via Email</td>

                ) :
                   row.scheduled_plan_destination[0].format == 'csv' &&  row.scheduled_plan_destination[0].type === 's3' ? (


                     <td>CSV file via Amazon S3</td>
                   ) :


                  row.scheduled_plan_destination[0].format == 'wysiwyg_pdf' &&  row.scheduled_plan_destination[0].type === 'looker-integration://1::slack_app' ? (

                     <td>PDF file via Slack</td>
                   ) :

                    row.scheduled_plan_destination[0].format == 'csv_zip' &&  row.scheduled_plan_destination[0].type === 'email' ? (

                       <td>CSV ZIP file attachment via Email</td>

                     ) :

                   row.scheduled_plan_destination[0].format == 'inline_table' &&  row.scheduled_plan_destination[0].type === 'email' ? (

                          <td>Data Table via Email</td>

                     ) : row.scheduled_plan_destination[0].format == 'csv_zip' &&  row.scheduled_plan_destination[0].type === 'looker-integration://1::slack_app' ? (

                      <td>CSV ZIP file file via Slack</td>

                    ) : row.scheduled_plan_destination[0].format == 'csv_zip' &&  row.scheduled_plan_destination[0].type === 'looker-integration://1::google_drive' ? (

                     <td>CSV ZIP file file via Google Drive</td>

                   ) : row.scheduled_plan_destination[0].format == 'wysiwyg_png' &&  row.scheduled_plan_destination[0].type === 'email' ? (

                    <td>Visualization attachment via Email</td>

                  ) : row.scheduled_plan_destination[0].format == 'wysiwyg_pdf' &&  row.scheduled_plan_destination[0].type === 'looker-integration://1::google_drive' ? (

                   <td>PDF file via Google Drive</td>


                     )  : (

                        <td>Other</td>
                     )
                 }


              {/*<td>{moment(row.next_run_at).utc().format('YYYY-MM-DD')}</td>*/}

              <td>{row.scheduled_plan_destination[0].address}</td>

             {/*<td><a class="white" href={`https://looker.bytecode.io/admin/scheduled_jobs?scheduled_plan_id=${row.scheduled_plan_destination[0].scheduled_plan_id}`} target="_blank">History</a></td>*/}

               <td>{row.scheduled_plan_destination[0].message}</td>


                <td>
                  <p>
                    <i
                      class="fal fa-edit fa-1x"
                      onClick={() => {
                        handleShow();
                        setSelectedRow(row);
                        console.log(row, "row");
                      }}
                      // onClick={() => {
                      //   handleShow;
                      //   console.log(
                      //     row,
                      //     "row"
                      //     // row.scheduled_plan_destination[0].scheduled_plan_id
                      //   );
                      // }}
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


function Template1 ( { description } ) {
  const extensionContext = useContext(ExtensionContext);
  const sdk = extensionContext.core40SDK;
  const extensionSDK = extensionContext.extensionSDK;
  const { hostUrl } = extensionContext.extensionSDK.lookerHostData;
  const [apps, setApps] = useState([]);
  const [allApps, setAllApps] = useState([]);
  const [selectedButton, setSelectedButton] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const [slide, setSlide] = React.useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState({ cols: null, data: null });
  const [selectedRow, setSelectedRow] = useState();
  const [search, setSearch] = useState(null);
  const [status, setStatus] = useState(undefined);

  const [formData, setFormData] = useState({
    scheduleName:"",
    firstName: "",
    lastName: "",
    contentType:"",
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


  const handleUpdate = async (extensionContext) => {
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

      const usersContextData = extensionSDK.getContextData() || null;
      const newData = usersContextData.data.map((row) => {
        if (row.id === selectedRow.id) {
          return {
            ...selectedRow,
          };
        }
        return row;
      });


      extensionSDK.saveContextData({ data: newData, cols: usersContextData.cols });
      setData({ data: newData, cols: usersContextData.cols });



      setStatus({ type: 'success' });

      handleClose();

      setTimeout(() => {
        setStatus(undefined);
      }, 5000);
    }
    else {

      setStatus({ type: 'error', error });

      setTimeout(() => {
        setStatus(undefined);
      }, 5000);

    }
  };


  useEffect(() => {
    sdk
      .ok(
        sdk.all_scheduled_plans({
          all_users: true,
        })
      )
      .then((res) => {

        console.log(res, "All of scheduler info");

        console.log(res?.length, "new schedules added")

        console.log(usersContextData?.data?.length, "conttext data length")

        const usersContextData = extensionSDK.getContextData() || null;

        // SAVE DATA IN EXTENSION USERS CONTEXT IF NOT ALREADY SAVED
        if (!usersContextData && res?.length > 1) {

          console.log("no context data")
          const cols = Object.keys(res[0]).map((i) => i);
          extensionSDK.saveContextData({ data: res, cols });
          setData({ data: res, cols });
        } else {
          // CHECK IF DATA LENGTH HAS CHANGED AND PREVIOUS DATA IS LESS THAN NEW DATA LENGTH SO THAT WE CAN UPDATE EXTENSION USERS CONTEXT WITH NEW DATA
          if (usersContextData?.data?.length !== res?.length && usersContextData?.data?.length < res?.length) {

            console.log("repsonse has changed length")
            const cols = Object.keys(res[0]).map((i) => i);
            extensionSDK.saveContextData({ data: res, cols });
            setData({ data: res, cols });
          }
          // IF DATA LENGTH HAS NOT CHANGED THEN WE CAN USE THE DATA FROM EXTENSION USERS CONTEXT
          else {
            console.log("no change in length, use context")

            setData(usersContextData);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

//search

  const handleTogglePauseAll = async () => {
    const updatedUsers = await Promise.all(
      data.data.map(async (row) => {
        return sdk.ok(sdk.update_scheduled_plan(row.scheduled_plan_destination[0].scheduled_plan_id, { enabled: !isAllEnabled }));
      })
    )
    const usersContextData = extensionSDK.getContextData() || null;

    if (usersContextData && updatedUsers && updatedUsers.length > 0) {
        extensionSDK.saveContextData({ data: updatedUsers, cols: data.cols });
        setData({ data: updatedUsers, cols: data.cols });
    }
    setSelectedRow(null);
  };

  return (
    <Fragment>

  {status?.type === 'success' && <div class="successMessage"><p><i class="far fa-check"></i> Update Saved! Please refresh the app to see your changes.</p></div>}

   {status?.type === 'error' && (
     <div class="errorMessage"><p><i class="fas fa-exclamation-circle redInfo"></i> Update not saved!</p></div>
   )}

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
                  {/*<a class="msg-btn tran3s">
                    new scheduled report
                  </a>*/}
                  <div className="position-relative">
                    <input onChange={e => setSearch(e.target.value)} placeholder="Search Report Name or Last Name" type="search" class="form-control" />
                    <i class="far fa-search absoluteSearch"></i>
                  </div>

                </div>

                <div
                  class="col-lg-3 all">
                <Form.Check
                  onClick={handleTogglePauseAll}
                  checked={!isAnyEnabled}
                  type="switch"
                  id="custom-switch"
                  label="PAUSE ALL SCHEDULES"
                />
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
                        <Form.Group controlId="">
                          <Form.Label>SCHEDULER FIRST NAME</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            value={formData.firstName}
                            name="firstName"
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={6}>
                        <Form.Group controlId="">
                          <Form.Label>SCHEDULER LAST NAME</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            value={formData.lastName}
                            name="lastName"
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12} lg={6} md={12}>
                        <Form.Group controlId="">
                          <Form.Label>EMAIL ADDRESS</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            value={formData.address}
                            name="address"
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={6}>
                        <Form.Group controlId="">
                          <Form.Label>SCHEDULE NAME</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            value={formData.scheduleName}
                            name="scheduleName"
                          />
                        </Form.Group>
                      </Col>


                      <Col xs={12}  md={9}>
                        <Form.Group className="mb-3">
                          <Form.Label>Message</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            as="textarea"
                            rows={3}
                            name="message"
                            value={formData.message}
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
                handleUpdate(extensionContext);
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
