/* eslint-disable no-unused-vars */
import '../App.css';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navigationbar from '../components/Navigationbar';
import LoginBlock from '../components/LoginBlock';
import Footer from '../components/Footer';
import Template from '../components/Template';

function MemberOnlyPage() {
  return (
    <>
      <div className="top-container">
        {/* <span>main</span> */}
        <div className="template-container">
          <Template>
            아니 왜안댐
            <h1> Sorry, Member ONLY </h1>
            <Button>
              <Link
                to="/login"
                style={{ textDecoration: 'none', width: '100vw' }}
              >
                <Stylespan>로그인 페이지로 이동</Stylespan>
              </Link>
            </Button>
          </Template>
          {/* <Button onClick={onTestFunc}> TEST </Button> */}
        </div>
      </div>
      <div className="bottom-container">
        <span>bottom continer</span>
      </div>
    </>
  );
}

const TemplateBlock = styled.div`
  /* 크기 */
  width: 50vw;
  height: 60vh;

  /* 위치-> 부모 relative */
  position: absolute; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  /* margin: 0 auto; 페이지 중앙에 나타나도록 설정 */

  /* margin-top: 2.5vh; */
  /* margin-bottom: 2.5vh; */
  display: inline-block;
  flex-direction: column;

  /* 디자인 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  opacity: 1;

  h1 {
    margin: 0;
    margin-top: 40px;
    margin-bottom: 35px;
    font-size: 30px;
    text-align: center;
    font-family: 'BwSurco';
    color: #404040;
  }
`;
const Button = styled.button`
  background: #fa605a;
  &:hover {
    background: #b52038;
  }
  &:active {
    background: #b52038;
  }

  z-index: 5;
  cursor: pointer;
  width: 250px;
  height: 35px;
  display: block;
  font-size: 20px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, -80%); /* 버튼위치 */
  color: white;
  border-radius: 5%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */
`;

const Stylespan = styled.span`
  color: white;
  font-size: 20px;
  font-family: NanumSquare_R;
  white-space: nowrap;
`;
export default MemberOnlyPage;
