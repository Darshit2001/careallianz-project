import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AddTask from "./Component/AddTask";
import TaskList from "./Component/TaskList";
import NavbarAll from "./Component/Header";
import styled from "styled-components";

const MainComponent = styled.div`
  background-color: antiquewhite;
  height: 100vh;
`;

function App() {
  return (
    <>
      <MainComponent>
        <NavbarAll />
        <Routes>
          <Route exact path="/" element={<AddTask />} />
          <Route exact path="/TaskList" element={<TaskList />} />
        </Routes>
      </MainComponent>
    </>
  );
}

export default App;
