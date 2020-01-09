import React from 'react';
import Drag from './components/Draggable';

class KanBan extends React.PureComponent{
    render() {
        const { currentOrgId } = this.props;
        return(
            <div>
                <Drag currentOrgId={currentOrgId} />
            </div>
        );
    };
}

export default KanBan;