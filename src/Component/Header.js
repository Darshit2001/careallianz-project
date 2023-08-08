import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const MainComponent = styled.div`
  background-color: antiquewhite;
  display: flex;
  justify-content: space-between;
`;
const Heading = styled.div`
  font-family: system-ui, sans-serif;
  font-size: 30px;
  margin-left: 30px;
`;
const LeftItem = styled.div`
  display: flex;
`;

const ButtonSubmit = styled.button`
  margin: 10px 10px;
  border-radius: 5px;
  height: 30px;
  border-color: transparent;
  background-color: #e5e4e2;
  color: black;
`;
const LinkCSS = {
  color: "black",
  textDecoration: "none",
};

function NavbarAll() {
  return (
    <>
      <MainComponent>
        <Heading>Task Manager</Heading>
        <LeftItem>
          <ButtonSubmit>
            <Link to="/" style={LinkCSS}>
              AddTask
            </Link>
          </ButtonSubmit>
          <ButtonSubmit>
            <Link to="/TaskList" style={LinkCSS}>
              TaskList
            </Link>
          </ButtonSubmit>
        </LeftItem>
      </MainComponent>
    </>
  );
}

export default NavbarAll;
