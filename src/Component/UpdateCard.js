import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
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
  height: 60%;
  padding: 30px;
`;
const LableHeading = styled.div`
  font-size: 20px;
  margin: 5px 0px;
`;
const InputBoxTitle = styled.input.attrs({ type: "text" })`
  cursor: pointer;
  margin-bottom: 0;
  text-transform: uppercase;
  width: 100%;
  border-radius: 5px;
  height: 35px;
  border-color: transparent;
  box-shadow: 0px;
  outline: none;
  transition: 0.15s;
  text-align: left;
`;
const ComponentAlignCenter = styled.div`
  display: flex;
  justify-content: center;
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

function UpdateCard({ list, updateitem, isupdate, setIsUpdate }) {
  const [markDone, setMarkDone] = useState("");
  const [startDate, setStartDate] = useState(new Date(updateitem.DueDate));
  const dispatch = useDispatch();
  const inputTitle = useRef(null);
  const inputDiscription = useRef(null);
  useEffect(() => {
    inputTitle.current.value = updateitem.Title;
    inputDiscription.current.value = updateitem.Discription;
    if (updateitem?.taskDone) {
      setMarkDone("checked");
    }
  }, []);

  function handleSubmitButton() {
    setIsUpdate(false);
    const newlist = list.map((curr) => {
      if (curr.id === updateitem.id) {
        console.log(curr.id, updateitem.id, inputTitle.current.value);
        return {
          id: curr.id,
          Title: inputTitle.current.value,
          Discription: inputDiscription.current.value,
          taskDone: markDone,
          DueDate: startDate,
        };
      } else {
        return curr;
      }
    });
    console.log(newlist, "newlist");
    dispatch(addTodos(newlist));
  }
  function handlecheck() {
    if (markDone === "") {
      setMarkDone("checked");
    } else {
      setMarkDone("");
    }
  }
  return (
    <>
      <ComponentAlignCenter>
        <MainComponent>
          <TopBar>
            <form>
              <LableHeading>Title</LableHeading>
              <InputBoxTitle ref={inputTitle}></InputBoxTitle>
              <LableHeading>Discription</LableHeading>
              <InputBoxDiscription ref={inputDiscription}></InputBoxDiscription>

              <LableHeading>Mark As Done</LableHeading>
              <input type="checkbox" checked={markDone} onClick={handlecheck} />
              <LableHeading>Select Due-Date : </LableHeading>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </form>
          </TopBar>

          <ButtonContainer>
            <ButtonSubmit onClick={handleSubmitButton}>
              UPDATE TASK
            </ButtonSubmit>
          </ButtonContainer>
        </MainComponent>
      </ComponentAlignCenter>
    </>
  );
}

export default connect((state) => {
  return {
    list: state.addList.taskList,
  };
})(UpdateCard);
