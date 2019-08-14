import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Progress ,Dropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import Channels from './Channels';

const propTypes = {
  header: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  invert: PropTypes.bool,
};

const defaultProps = {
  header: '87.500',
  icon: 'icon-people',
  color: 'info',
  value: '25',
  children: 'Visitors',
  invert: false,
};

class Widget04 extends Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    channels : ['channels1','chane2','chane3'],
    control : {
      income: {
        open: false,
        name: 'income',
        list: ['# list1','# list2','# list3'],
        icon: 'fa fa-bitcoin',
      },
      channels: {
        open: false,
        name: 'channels',
        list: ['89547784@qq.com','user_b','user_c'],
        icon: 'fa fa-hashtag',
      },
      org: {
        open: false,
        name:"org",
        list: ['# list1','# list2','# list3'],
        icon: 'fa fa-gg-circle',
      },
      all: {
        open: false,
        name: 'all',
        list: ['# list1','# list2','# list3'],
        icon: 'fa fa-gg-circle',
      }
    }
  }

  controlopen = (id)=>{
    const newobj = {...this.state.control};
    newobj[id].open = !newobj[id].open
    this.setState({
      control: newobj
    })
  }
  selorg = (_e,v,id)=>{
    const newobj = {...this.state.control};
    newobj[id].name = v
    this.setState({
      control: newobj
    })
    if(id === 'channels'){
      this.myRef.current.toggle(v);
    }
  }
  render() {
    const { className, cssModule, header, icon, color, value, children, invert, ...attributes } = this.props;

    // demo purposes only
    const progress = { style: '', color: color, value: value };
    const card = { style: '', bgColor: '', icon: icon };

    if (invert) {
      progress.style = 'progress-white';
      progress.color = '';
      card.style = 'text-white';
      card.bgColor = 'bg-' + color;
    }

    const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);
    progress.style = classNames('progress-xs mt-3 mb-0', progress.style);

    return (
      <Card className={classes} {...attributes}>
        <CardBody>
          <div className="" style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',fontSize: '2rem'}}>
                  <Dropdown id={this.props.id} isOpen={this.state.control[this.props.id].open} toggle={()=>this.controlopen(this.props.id)}>
                    <DropdownToggle caret className="p-0" color="#000" style={{fontSize: '1.2rem'}}>
                      <i className={this.state.control[this.props.id].icon}>{'   '}{this.state.control[this.props.id].name}</i>
                    </DropdownToggle>
                    <DropdownMenu left="true">
                      {
                          this.state.control[this.props.id].list.map((v,i)=>{
                              return(
                                <DropdownItem onClick={(e)=>{
                                    this.selorg(e,v,this.props.id)
                                }} key={i}>{v}</DropdownItem> 
                              )
                          })
                      }
                    </DropdownMenu>
                  </Dropdown>
            <i className={card.icon} ></i>
          </div>
          <div className="h4 mb-0" style={{marginTop: '.5rem'}}>{header}</div>
          <small className="text-muted text-uppercase font-weight-bold">{children}</small>
          <Progress className={progress.style} color={progress.color} value={progress.value} />
        </CardBody>
          <Channels ref={this.myRef}/>
      </Card>
    );
  }
}

Widget04.propTypes = propTypes;
Widget04.defaultProps = defaultProps;

export default Widget04;