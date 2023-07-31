import React from 'react';
import Typewriter from 'typewriter-effect';
import styled from 'styled-components';

const MyTitleMessage = styled.h1`
    position: absolute;
    width: 60%;
    top: 13rem;
    z-index: 1;
    margin-top: -30px;
    text-align: center;
    strong {
        font-size: 1.1em;
    }

    div {
        text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
        font-weight: 100;
        letter-spacing: 7px;
        .main {
            color: rgb(93, 129, 187);
            font-size: 50px;
        }
        .sub {
            font-size: 30px;
            color: rgb(155, 171, 196);
            letter-spacing: 2px;
            margin: 20px;
        }
    }
`;
const Message = () => {
    return (
        <MyTitleMessage>
            <div className="titleMessage">
                <div className="main text-center mb-3">
                    Hi, I am
                    <br />
                    <span>
                        <strong>72th ERP</strong>
                    </span>
                </div>
                <div className="sub">
                    <Typewriter
                        options={{
                            strings: ['React', 'Spring Boot', 'Oracle', 'AmazonWebService', 'Git'],
                            autoStart: true,
                            loop: true,
                            delay: 70
                        }}
                    />
                </div>
            </div>
        </MyTitleMessage>
    );
};

export default Message;
