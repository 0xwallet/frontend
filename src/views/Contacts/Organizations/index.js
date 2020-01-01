import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap';
import classNames from 'classnames';
import Viewer from './Viewer'
import Calendar from './Calendar';
import DetailList from './DetailList';
import KanBan from './KanBan';

export default () => {
   const [activeTab, setActiveTab] = useState("1");
   return( 
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classNames({ active: activeTab === '1' })}
                            onClick={() => setActiveTab("1")}>
                    {/* <i className="icon-list"></i> */}
                    <span>看板</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classNames({ active: activeTab === '2' })}
                            onClick={() => setActiveTab("2")}>
                    {/* <i className="icon-speech"></i> */}
                    <span>日历</span>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <KanBan />
                </TabPane>
                <TabPane tabId="2">
                    <Calendar />
                </TabPane>
            </TabContent>
            <Viewer />
            <DetailList />
        </div>
    )
}