import React from "react";
import styled from "styled-components";
import TaskCard from "./TaskCard";

const MainComponent = styled.div`
  background-color: antiquewhite;
`;
const Heading = styled.div`
  font-family: system-ui, sans-serif;
  font-size: 40px;
`;
const TopBar = styled.div`
  display: flex;
  justify-content: center;
`;
const MainBody = styled.div`
  display: flex;
  justify-content: center;
`;
function AddTask() {
  return (
    <>
      <MainComponent>
        <TopBar>
          <Heading>ADD TASK</Heading>
        </TopBar>
        <MainBody>
          <TaskCard />
        </MainBody>
      </MainComponent>
    </>
  );
}

export default AddTask;
