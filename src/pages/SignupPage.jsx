/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import '../App.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import regsuccess from '../img/goal.png';
import Template from '../components/Template';

// 회원가입 페이지

function SignupPage() {
  // 사용자 입력을 받아올 변수
  const [Nickname, setNickname] = React.useState('');
  const [UserID, setUserID] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [Password_veri, setPassword_veri] = React.useState('');
  const [Errtxt, setErrtxt] = React.useState('');

  //  회원가입 성공여부
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  // 페이지 이전용도
  const history = useHistory();

  // state변수를 변경시키는 함수들
  const onChangeNick = (e) => {
    setNickname(e.target.value);
  };
  const onChangeID = (e) => {
    setUserID(e.target.value);
  };
  const onChangePW = (e) => {
    setPassword(e.target.value);
  };
  const onChangePW_V = (e) => {
    setPassword_veri(e.target.value);
  };

  // 회원가입 버튼을 누를 경우 실행되는 일
  const onSubmitHandler = (e) => {
    e.preventDefault(); // refresh 방지
    setErrtxt('');

    // 입력 안했을 때
    if (!Nickname) {
      setErrtxt('닉네임을 입력해주세요');
      return; // 오류나면 더 진행되지 않음
    }
    if (!UserID) {
      setErrtxt('ID를 입력해주세요');
      return;
    }
    if (!Password) {
      setErrtxt('비밀번호를 입력해주세요');
      return;
    }
    if (!Password_veri) {
      setErrtxt('비밀번호 확인이 필요합니다!');
      return;
    }

    // 비밀번호 제한사항 검사
    if (Password.length < 8 || Password.length > 12) {
      setErrtxt('비밀번호는 8자이상 12자이하여야 합니다');
      return;
    }
    // 비밀번호!= 확인용비밀번호
    if (Password !== Password_veri) {
      setErrtxt('비밀번호가 일치하지 않습니다');
      return;
    }

    // 서버로 전송
    const formbody = {
      nickname: Nickname,
      userID: UserID,
      password: Password,
      password2: Password_veri,
    };

    axios
      .post('http://localhost:5000/api/signup', formbody, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.Result === 'Success') {
          // signup 오류
          // console.log('성공');
          setIsRegistraionSuccess(true);
        } else {
          // signup 오류

          // 1. 닉네임 중복
          if (res.data.Result === 'NK_duplicated') {
            // console.log('닉네임중복');
            setErrtxt('이미 존재하는 닉네임입니다');
          }

          // 2. 아이디 중복
          if (res.data.Result === 'ID_duplicated') {
            // console.log('아이디 중복');
            setErrtxt('이미 존재하는 아이디입니다');
          }
        }
      })
      .catch((err) => {
        // 에러시 에러 페이지로 이동
        // console.error(err);
        history.push('/error?errtype=register');
      });
  };

  return (
    <>
      <div className="main-container">
        {isRegistraionSuccess === true ? ( // 회원가입 성공 후
          <Template>
            <Styleh1> WELCOME TO SEAFLAG </Styleh1>
            <img
              src={regsuccess}
              style={{
                width: '200px',
                position: 'absolute',
                left: '200px',
                top: '120px',
              }}
              alt="img"
            />
            <span
              style={{
                fontSize: '20px',
                fontFamily: 'NanumSquare_L',
                position: 'absolute',
                bottom: '120px',
                left: '100px',
                textAlign: 'center',
              }}
            >
              환영합니다! 저희 서비스에 가입해주셔서 감사합니다
              <br />
              원하는 영상을 원하는 부분만 검색해보세요!
            </span>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button>
                <Stylespan>로그인 페이지로 이동</Stylespan>
              </Button>
            </Link>
          </Template>
        ) : (
          // 회원 가입 창
          <Template>
            <Styleh1> SIGN UP </Styleh1>
            <InsertForm onSubmit={onSubmitHandler}>
              <Input
                placeholder="Nickname"
                value={Nickname}
                onChange={onChangeNick}
              />
              <Input placeholder="ID" value={UserID} onChange={onChangeID} />
              <Input
                type="password"
                placeholder="Create password"
                value={Password}
                onChange={onChangePW}
              />
              <Input
                type="password"
                placeholder="Verify password"
                value={Password_veri}
                autoFocus
                onChange={onChangePW_V}
              />
              <br />
              <Label>{Errtxt}</Label>
              <Button onClick={onSubmitHandler}>
                <Stylespan>Register</Stylespan>
              </Button>
            </InsertForm>
          </Template>
        )}
      </div>
    </>
  );
}

const InsertForm = styled.form`
  padding-left: 50px;
  padding-top: 1%;
  padding-right: 50px;
  padding-bottom: 1%;

  text-align: center;
  Input {
    margin-bottom: 7px;
    margin-top: 7px;
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #dee2e6;

  width: 80%;
  outline: none;
  font-size: 15px;
  box-sizing: border-box;
  background: white;
`;

const Label = styled.label`
  padding: 5px;
  font-size: 15px;
  font-family: 'NanumSquare_R';
  color: #fa605a;
`;

const Button = styled.button`
  /* 디자인 */
  background: #fa605a;
  &:hover {
    background: #b52038;
  }
  &:active {
    background: #b52038;
  }
  color: white;
  border-radius: 5%;
  border: none;
  outline: none;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.4); /* 그림자효과 */

  /* 크기 */
  width: 300px;
  height: 40px;

  /* 위치 */
  position: absolute;
  left: 25%; /* 중앙으로 배치 */
  bottom: 10%; /* 조금 위쪽으로 */
  /* transform: translate(-50%, -80%); */

  /* z-index: 5; */
  cursor: pointer;
  transition: 0.125s all ease-in;

  /* display: inline; */
  /* align-items: center; */
  /* justify-content: center; */
`;

const Stylespan = styled.span`
  color: white;
  font-size: 20px;
  font-family: NanumSquare_R;
  white-space: nowrap;
`;

const Styleh1 = styled.h1`
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 45px;
  text-align: center;
  font-family: 'BwSurco';
  color: #404040;
`;

export default SignupPage;
