//2021-03-24 65기 이은경
import React from 'react';
import { Carousel } from 'react-bootstrap';
import 인사 from './image/인사.jpg';
import 회계 from './image/회계.jpg';
import 물류 from './image/물류.jpg';
const Main = () => {
    return (
        <div>
            <Carousel fade>
                <Carousel.Item
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <img
                        className="d-block w-100"
                        src={인사}
                        alt="First slide"
                        style={{
                            height: 650,
                            padding: '0 10px',
                            maxWidth: '1300px'
                        }}
                    />

                    <Carousel.Caption>
                        <h3>Human Resource</h3>
                        <p>Welcome to SeoulItProject 68th.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <img
                        className="d-block w-100"
                        src={회계}
                        alt="Second slide"
                        style={{ height: 650, padding: '0 10px ', maxWidth: '1300px' }}
                    />

                    <Carousel.Caption>
                        <h3>Accounting</h3>
                        <p>Welcome to SeoulItProject 68th.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <img
                        className="d-block w-100"
                        src={물류}
                        alt="Third slide"
                        style={{ height: 650, padding: '0 10px', maxWidth: '1300px' }}
                    />

                    <Carousel.Caption>
                        <h3>logistics</h3>
                        <p>Welcome to SeoulItProject 68th.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Main;
