import React, { useState, useContext, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import SideForm from "./components/nav/Form.js";

import ToTopButton from "./components/ToTopButton.js";
import NavbarMain from "./components/NavbarMain";

import { ExtensionContext } from "@looker/extension-sdk-react";
import moment from "moment";
import Template1 from "./pageTemplates/Template1/Template1";
import TopNav from "./components/nav/TopNav.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import AOS from 'aos';
import "aos/dist/aos.css";

import {
  LOOKER_MODEL,
  LOOKER_EXPLORE,
  LOOKML_FIELD_TAGS,
  PRODUCT_MOVEMENT_VIS_DASHBOARD_ID,
} from "./utils/constants";



import { sortDateFilterList } from "./utils/globalFunctions";

export const Main = ({ inputValue, setInputValue, url, questions, setQuestions }) => {

  useEffect(() => {
  AOS.init({
    duration: 1200,
  });
  }, []);

  const { core40SDK: sdk } = useContext(ExtensionContext);

  const [currentNavTab, setCurrentNavTab] = useState("dashboard");

  const [isFetchingLookmlFields, setIsFetchingLookmlFields] = useState(true);

  const [showMenu, setShowMenu] = useState();
  const [keyword, setKeyword] = useState("");

  const slideIt = (show) => {
    setShowMenu(show);
  };

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };



  return (
    <>

      <NavbarMain />
      <Container fluid className="padding-0 lavender">
        <Template1
          inputValue={inputValue}
          setInputValue={setInputValue}
          url={url}
          questions={questions}
          setQuestions={setQuestions}
        />
      </Container>

      <ToTopButton />


    </>
  );
};
