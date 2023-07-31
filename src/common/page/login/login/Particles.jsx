import React from "react";
import Particles from "react-particles-js";
import { particlesOptions } from "./particlesOption";
import "./Particles.css";

const Particle = () => {
  return (
    <div>
      <Particles
        className="particles particles-box"
        height="100%"
        width="100%"
        params={particlesOptions}
      />
    </div>
  );
};

export default Particle;
