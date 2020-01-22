import React from "react";

const Loading = () => (
  <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
     <div className="sk-wave">
      <div className="sk-rect sk-rect1"></div>&nbsp;
      <div className="sk-rect sk-rect2"></div>&nbsp;
      <div className="sk-rect sk-rect3"></div>&nbsp;
      <div className="sk-rect sk-rect4"></div>&nbsp;
      <div className="sk-rect sk-rect5"></div>
    </div>
  </div>
);

export default Loading;
