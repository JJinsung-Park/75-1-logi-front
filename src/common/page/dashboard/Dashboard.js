import React, { Suspense, useEffect, useRef, useMemo } from 'react';
import { Canvas, Dom, useLoader, useFrame } from 'react-three-fiber';
import { TextureLoader, LinearFilter } from 'three';
import lerp from 'lerp';
import { Text, MultilineText } from './components/Text';
import Plane from './components/Plane';
import { Block, useBlock } from './blocks';
import state from './store';
import './styles.css';
import * as types from '../../reducer/commonReducer';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Link } from 'react-router-dom';

// function Startup() {
//   const ref = useRef()
//   useFrame(() => (ref.current.material.opacity = lerp(ref.current.material.opacity, 0, 0.025)))
//   return <Plane ref={ref} color="#0e0e0f" position={[0, 0, 200]} scale={[100, 100, 1]} />
// }

// function Paragraph({ image, index, offset, factor, header, aspect, text }) {
//   const { contentMaxWidth: w, canvasWidth, margin, mobile } = useBlock()
//   const size = aspect < 1 && !mobile ? 0.65 : 1
//   const alignRight = (canvasWidth - w * size - margin) / 2
//   const pixelWidth = w * state.zoom * size
//   const left = !(index % 2)
//   const color = index % 2 ? "#D40749" : "#2FE8C3" // 소 제목 색상
//   return (
//     <Block factor={factor} offset={offset}>
//       <group position={[left ? -alignRight : alignRight, 0, 0]}>
//         <Plane map={image} args={[1, 1, 32, 32]} shift={75} size={size} aspect={aspect} scale={[w * size, (w * size) / aspect, 1]} frustumCulled={false} />
//         <Dom
//           style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: left ? "left" : "right" }}
//           position={[left || mobile ? (-w * size) / 2 : 0, (-w * size) / 2 / aspect - 0.4, 1]}>
//           <div tabIndex={index}>{text}</div>
//         </Dom>
//         <Text left={left} right={!left} size={w * 0.04} color={color} top position={[((left ? -w : w) * size) / 2, (w * size) / aspect / 2 + 0.5, -1]}>
//           {header}
//         </Text>
//         <Block factor={0.2}>
//           <Text opacity={0.5} size={w * 0.1} color="#1A1E2A" position={[((left ? w : -w) / 2) * size, (w * size) / aspect / 1.5, -10]}>
//             {"0" + (index + 1)}
//           </Text>
//         </Block>
//       </group>
//     </Block>
//   )
// }

function Content() {
    const images = useLoader(
        TextureLoader,
        state.paragraphs.map(({ image }) => image)
    );
    useMemo(() => images.forEach(texture => (texture.minFilter = LinearFilter)), [images]);
    const { contentMaxWidth: w, canvasWidth, canvasHeight, mobile } = useBlock();
    return (
        <>
            <Block factor={1} offset={0}>
                <Block factor={1.2}>
                    <Text left size={w * 0.0825} position={[-w / 3.2, 0.5, -1]} color="#d40749">
                        REACT
                    </Text>
                </Block>
                <Block factor={1.0}>
                    <Dom position={[-w / 3.2, -w * 0.08 + 0.25, -1]}>
                        React isn't magic, {mobile ? <br /> : ' '} It's adding innovation to thought
                    </Dom>
                </Block>
            </Block>
            {/* <Block factor={1.2} offset={5.7}>
        <MultilineText top left size={w * 0.08} lineHeight={w / 8} position={[-w / 3.5, 0, -1]} color="#2fe8c3" text={"Difficulties\nduring\nthe\nproject"} />
      </Block>
      {state.paragraphs.map((props, index) => (
        <Paragraph key={index} index={index} {...props} image={images[index]} />
      ))}
      {state.stripes.map(({ offset, color, height }, index) => (
        <Block key={index} factor={-1.5} offset={offset}>
          <Plane args={[50, height, 32, 32]} shift={-4} color={color} rotation={[0, 0, Math.PI / 8]} position={[0, 0, -10]} />
        </Block>
      ))} 
      <Block factor={1.25} offset={8}>
        <MultilineText top left size={w * 0.05} lineHeight={w / 10} position={[-w / 3.5, 0, -1]} color="#2fe8c3" text={"Thank\nyou\nfor\nattending"} />
        <Dom className="bottom-left" position={[-canvasWidth / 2, -canvasHeight / 2, 0]}>
          Copyright@68th, All Rights Reserved
        </Dom>
      </Block>
      */}
        </>
    );
}

function App() {
    const dispatch = useDispatch();
    // const scrollArea = useRef()
    // const onScroll = e => (state.top.current = e.target.scrollTop)
    // useEffect(() => void onScroll({ target: scrollArea.current }), [])

    const startClick = e => {
        e.preventDefault();
        dispatch({ type: types.START_PROJECT });
    };
    return (
        <>
            <Canvas
                className="canvas"
                concurrent
                pixelRatio={1}
                orthographic
                camera={{ zoom: state.zoom, position: [0, 0, 500] }}
            >
                <Suspense fallback={<Dom center className="loading" children="Loading..." />}>
                    <Content />
                    {/* <Diamonds /> */}
                    {/* <Startup /> */}
                </Suspense>
            </Canvas>
            {/* <div className="scrollArea" ref={scrollArea} onScroll={onScroll}> */}
            {/* <div className="scrollArea" >
        {new Array(state.sections).fill().map((_, index) => (
          <div key={index} id={"0" + index} style={{ height: `${(state.pages / state.sections) * 100}vh` }} />
        ))}
      </div> */}
            <div className="frame">
                <h1 className="frame__title">72th REACT PROJECT</h1>
                <div className="frame__links">
                    <BrowserRouter>
                        <Link
                            className="frame__link"
                            to="/"
                            children="시작하기"
                            onClick={startClick}
                        />
                    </BrowserRouter>
                </div>
                {/*<div className="frame__nav">
           <a className="frame__link" href="#00" children="intro" />
          <a className="frame__link" href="#01" children="01" />
          <a className="frame__link" href="#02" children="02" />
          <a className="frame__link" href="#03" children="03" />
          <a className="frame__link" href="#04" children="04" />
          <a className="frame__link" href="#05" children="05" />
          <a className="frame__link" href="#07" children="06" />
          <a className="frame__link" href="https://celestialsys.com/blog/redux-fundamentals-building-blocks-and-data-flow/" children="redux" /> 
        </div>*/}
            </div>
        </>
    );
}

export default App;
