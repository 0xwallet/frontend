import React from 'react';
import Drag from './components/Draggable';

class KanBan extends React.PureComponent{
    render() {
        return(
            <div>
                <Drag />
            </div>
        );
    };
}

export default KanBan;