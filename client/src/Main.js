import React, { useState, useContext, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";

import ToTopButton from "./components/ToTopButton.js";
import NavbarMain from "./components/NavbarMain";

import { ExtensionContext } from "@looker/extension-sdk-react";

import Template1 from "./pageTemplates/Template1/Template1";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";



export const Main = ({ inputValue, setInputValue, url, questions, setQuestions }) => {

  const { core40SDK: sdk } = useContext(ExtensionContext);

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
