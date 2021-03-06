import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Dragitem from './Dragitem';
import './index.scss';
// import { Divider } from 'antd';
// import "antd/dist/antd.css";
// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination,that) => {
    
    const verifytree = [droppableSource.droppableId,droppableDestination.droppableId];
    const sourcearr = ['droppable','droppable2','droppable3'];

    function getArrDifference(arr1, arr2) {
        return arr1.concat(arr2).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
        });
    }

    const diff = getArrDifference(verifytree,sourcearr)[0];
    
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    result[diff] = that.getList(diff)
    
    return result;
};

// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: 'none',
//     padding: grid * 2,

//     margin: `0 0 ${grid}px 0`,
//     // change background colour if dragging
//     background: isDragging ? 'lightgreen' : '#f0f3f5', // grey

//     // styles we need to apply on draggables
//     ...draggableStyle
// });
// // #f0f3f5
// const getListStyle = isDraggingOver => ({
//     // background: isDraggingOver ? '#fff' : '#fff',// // lightblue lightgrey
//     // padding: grid,
//     // borderRight: '1px solid grey',
//     paddingRight:'1rem',
//     borderRight:'1px solid grey',
//     // background:'lightblue',
//     width: '30%',
// });

export default class Drag extends Component {
    state = {
        items: getItems(2,0),
        selected: getItems(2, 10),
        last: getItems(3,15),
        candrop: true
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected',
        droppable3: 'last'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            if (source.droppableId === 'droppable3') {
                state = { last: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination,
                this
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2,
                last: result.droppable3,
            });
        }
    };

    onDragStart = ()=>{
        if(this.props.auth === false){
            this.setState({
                candrop: false
            })
        }
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.props.auth? this.onDragEnd: (null)} onDragStart={this.onDragStart}> 
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className="listfirst">
                            {this.state.items.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                           >
                                           <Dragitem section={item.content} iclassname='fa fa-bitcoin'/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {/* <Divider type="vertical" /> */}
                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className="listmid"
                            style={{
                                display:'block'
                            }}>
                            {this.state.selected.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            >
                                           <Dragitem section={item.content} iclassname='fa fa-bitcoin'/>                                           
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {/* <Divider type="vertical" /> */}
                <Droppable droppableId="droppable3">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className="lastlist"
                            style={{display: 'block'}}>
                            {this.state.last.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            >
                                           <Dragitem section={item.content} iclassname='fa fa-bitcoin'/>

                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
          
        );
    }
}
