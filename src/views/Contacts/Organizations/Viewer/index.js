import React,{PureComponent}from 'react';
import { Card, CardBody, CardHeader ,Row,Col} from 'reactstrap';
// import { Line } from 'react-chartjs-2';
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import Channels from './Channels';

// import Widget01 from './Widget01';
// import Widget03 from './Widget03';
import Widget04 from './Widget04';
// import Widget02 from './Widget02';
  
// // Brand Card Chart
// const makeSocialBoxData = (dataSetNo) => {
//     const socialBoxData = [
//       { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
//       { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
//       { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
//       { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
//     ];
  
//     const dataset = socialBoxData[dataSetNo];
//     const data = {
//       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//       datasets: [
//         {
//           backgroundColor: 'rgba(255,255,255,.1)',
//           borderColor: 'rgba(255,255,255,.55)',
//           pointHoverBackgroundColor: '#fff',
//           borderWidth: 2,
//           data: dataset.data,
//           label: dataset.label,
//         },
//       ],
//     };
//     return () => data;
//   };

//   const socialChartOpts = {
//     tooltips: {
//       enabled: false,
//       custom: CustomTooltips
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//     legend: {
//       display: false,
//     },
//     scales: {
//       xAxes: [
//         {
//           display: false,
//         }],
//       yAxes: [
//         {
//           display: false,
//         }],
//     },
//     elements: {
//       point: {
//         radius: 0,
//         hitRadius: 10,
//         hoverRadius: 4,
//         hoverBorderWidth: 3,
//       },
//     },
//   };

export default class Viewer extends PureComponent{
    constructor(){
        super()
        this.myRef = React.createRef();
    }
    render(){
        // console.log(this.myRef)
        return(
            <Card>
                <CardHeader>
                    <i className="icon-calendar"></i>My organizations{' '}
                    {/* <a href="https://coreui.io/pro/react/" className="badge badge-danger">CoreUI Pro Component</a> */}
                    <div className="card-header-actions">
                    <a href="https://github.com/intljusticemission/react-big-calendar" rel="noopener noreferrer" target="_blank" className="card-header-action">
                        <small className="text-muted">docs</small>
                    </a>
                    </div>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12" sm="6" lg="3">
                            {/* <Widget01 color="danger" variant="inverse" header="$98.111,00" smallText="">
                                <small className="text-muted">Excepteur sint occaecat...</small>
                            </Widget01> */}
                            <Widget04 icon="icon-people" color="info" header="87.500" value="25">Visitors</Widget04>

                        </Col>
                        <Col xs={12} sm={6} md={3} >
                             <Widget04 icon="icon-people" color="info" header="87.500" value="25" onClick={()=>{this.myRef.current.toggle()}}>Visitors</Widget04>
                            {/* <Widget03 dataBox={() => ({ variant: 'twitter', followers: '973k', tweets: '1.792' })}  >
                                <div className="chart-wrapper" onClick={()=>{this.myRef.current.toggle()}}>
                                    <Line data={makeSocialBoxData(1)} options={socialChartOpts} height={90} />
                                </div>
                            </Widget03> */}
                         </Col>
                         <Col xs="12" sm="6" lg="3">
                             <Widget04 icon="icon-people" color="info" header="87.500" value="25">Visitors</Widget04>
                            {/* <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-cogs" color="primary" /> */}
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                            <Widget04 icon="icon-people" color="info" header="87.500" value="25">Visitors</Widget04>
                            {/* <Widget04 icon="icon-pie-chart" color="primary" header="28%" value="25">Returning Visitors</Widget04> */}
                        </Col>
                    </Row>
                </CardBody>
                 <Channels ref={this.myRef}/>
            </Card>
        )
    }
}