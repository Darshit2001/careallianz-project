import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { addTodos } from "./TaskListStore";
import { useDispatch } from "react-redux";
import UpdateCard from "./UpdateCard";
import context from "react-bootstrap/esm/AccordionContext";
const MainComponent = styled.div`
  display: flex;
  justify-content: center;
`;
const MainList = styled.div``;
const ListContainer = styled.div`
  background-color: #e5e4e2;
  margin: 10px;
  min-width: 700px;
  display: flex;
  justify-content: space-between;
`;
const LableHeading = styled.div`
  font-size: 20px;
  margin: 5px 0px 0px 5px;
`;
const LableText = styled.div`
  font-size: 15px;
  margin: 9px 0px 0px 8px;
`;
const ListTop = styled.div`
  display: flex;
`;
const ListLeftContainer = styled.div``;
const ListRightContainer = styled.div``;
const Icon = styled.image`
  margin: 5px;
`;

const SearchInput = styled.input.attrs({ type: "search" })`
  border-radius: 5px;
  width: 50vh;
  height: 35px;
`;
const TopBAR = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0px;
`;
const ListRight = styled.div`
  display: flex;
  justify-content: end;
`;

const TaksDone = styled.div`
  background-color: #90ee90;
  margin: 0px 10px;
  height: 30px;
  padding: 3px 8px;
  margin: 5px;
  border-radius: 5px;
`;

function TaskList({ taskList }) {
  const [datalist, setDataList] = useState(taskList);
  const [isupdate, setIsUpdate] = useState(false);
  const [updateitem, setUpdateItem] = useState();
  //const searchText = useRef(null);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (searchText === "") {
      setDataList(taskList);
    }
  }, [searchText]);
  useEffect(() => {
    setDataList(taskList);
  }, [isupdate]);
  function handleSearch(event) {
    if (event?.key === "Enter") {
      const newdatalist = taskList.filter((curr) => {
        if (curr.Title.includes(searchText)) {
          return curr;
        }
      });
      setDataList(newdatalist);
    }
  }
  function handleDeleteFunction(e) {
    console.log(e, "e");
    setDataList(
      datalist.filter((value) => {
        if (value.id !== e.id) return value;
      })
    );
    dispatch(
      addTodos(
        datalist.filter((value) => {
          if (value.id !== e.id) return value;
        })
      )
    );
  }

  if (isupdate)
    return (
      <UpdateCard
        updateitem={updateitem}
        isupdate={isupdate}
        setIsUpdate={setIsUpdate}
      />
    );

  return (
    <>
      <TopBAR>
        <SearchInput
          value={searchText}
          onKeyDown={(e) => {
            handleSearch(e);
          }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder="Search By Title"
        ></SearchInput>
      </TopBAR>

      <MainComponent>
        <MainList>
          {datalist &&
            datalist.map((e) => {
              return (
                <ListContainer>
                  <ListLeftContainer>
                    <ListTop>
                      <LableHeading>Title - </LableHeading>
                      <LableText>{e.Title}</LableText>
                    </ListTop>
                    <ListTop>
                      <LableHeading>Discription - </LableHeading>
                      <LableText>{e.Discription}</LableText>
                    </ListTop>
                  </ListLeftContainer>
                  <ListRightContainer>
                    <ListRight>
                      {e.taskDone === "checked" && <TaksDone>DONE</TaksDone>}
                      <Icon
                        onClick={() => {
                          setUpdateItem(e);
                          setIsUpdate(true);
                        }}
                      >
                        🖌
                      </Icon>
                      <Icon
                        onClick={() => {
                          handleDeleteFunction(e);
                        }}
                      >
                        ❌
                      </Icon>
                    </ListRight>

                    {e.DueDate && (
                      <ListTop>
                        <TaksDone>
                          {JSON.stringify(e.DueDate).slice(1, 11)}
                        </TaksDone>
                      </ListTop>
                    )}
                  </ListRightContainer>
                </ListContainer>
              );
            })}
        </MainList>
      </MainComponent>
    </>
  );
}

export default connect((state) => {
  return {
    taskList: state.addList.taskList,
  };
})(TaskList);
