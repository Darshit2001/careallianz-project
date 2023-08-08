import React from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { addTodos } from "./TaskListStore";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const MainComponent = styled.div`
  background-color: #e5e4e2;
  margin-top: 100px;
  font-family: system-ui, sans-serif;
  width: 50%;
  height: 40%;
  padding: 30px;
`;
const LableHeading = styled.div`
  font-size: 20px;
  margin: 5px 0px;
`;
const InputBoxTitle = styled.input.attrs({ type: "text" })`
  cursor: pointer;
  margin-bottom: 0;
  width: 100%;
  border-radius: 5px;
  height: 35px;
  border-color: transparent;
  box-shadow: 0px;
  outline: none;
  transition: 0.15s;
  text-align: left;
`;

const InputBoxDiscription = styled.textarea.attrs({ type: "text" })`
  cursor: pointer;
  margin-bottom: 0;
  width: 100%;
  border-radius: 5px;
  height: 50px;
  border-color: transparent;
  box-shadow: 0px;
  outline: none;
  transition: 0.15s;
  text-align: left;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;
const ButtonSubmit = styled.button`
  padding: 10px;
  border-radius: 5px;
  border-color: transparent;
  backgound: #c0c0c0;
`;
const TopBar = styled.div``;

function TaskCard({ list }) {
  const [taskList, setTaskList] = useState(list);
  const [title, setTitle] = useState("dcdc");
  const [discription, setDiscription] = useState("n bjhd");
  const [startDate, setStartDate] = useState(new Date());
  const inputTitle = useRef(null);
  const inputDiscription = useRef(null);
  const dispatch = useDispatch();
  function handleSubmitButton() {
    setTaskList([
      ...taskList,
      {
        id: uuid(),
        Title: inputTitle.current.value,
        Discription: inputDiscription.current.value,
        DueDate: startDate,
      },
    ]);
    dispatch(
      addTodos([
        ...taskList,
        {
          id: uuid(),
          Title: inputTitle.current.value,
          Discription: inputDiscription.current.value,
          DueDate: startDate,
        },
      ])
    );
    inputTitle.current.value = "";
    inputDiscription.current.value = "";
    console.log("taskList", taskList);
  }
  return (
    <>
      <MainComponent>
        <TopBar>
          <form>
            <LableHeading>Title</LableHeading>
            <InputBoxTitle ref={inputTitle}></InputBoxTitle>
            <LableHeading>Discription</LableHeading>
            <InputBoxDiscription ref={inputDiscription}></InputBoxDiscription>
            <LableHeading>Select Due-Date : </LableHeading>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </form>
        </TopBar>

        <ButtonContainer>
          <ButtonSubmit onClick={handleSubmitButton}>ADD TASK</ButtonSubmit>
        </ButtonContainer>
      </MainComponent>
    </>
  );
}

export default connect((state) => {
  return {
    list: state.addList.taskList,
  };
})(TaskCard);
