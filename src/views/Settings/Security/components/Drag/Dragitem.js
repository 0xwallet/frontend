import React, { Component } from 'react';
import './index.scss';
export default class Dragitem extends Component{
  render(){
    const {section,iclassname} = this.props;
    return(
      <div className="dragitem">
        <i className={iclassname} style={{marginRight:'.3rem'}}></i>
        {section}
      </div>
    )
  }
}