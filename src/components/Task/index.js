import React from 'react';
import formatMarkdown from '../../util/formatMarkdown';
import Textarea from "react-textarea-autosize";
import Modal from 'react-modal';
import './index.scss';

Modal.setAppElement('#root');   

export default class Task extends React.Component{
    render() {
        const list = [13,24];
        return(
            <div style={{position: "relative", background: "#20a8d8", padding: "2rem",borderRadius: "3px"}} id="task">
                {
                    list.map((v,i)=>(
                       <ListItem key={i}/>
                    ))
                }
            </div>
        )
    }
}

class ListItem extends React.Component{
    state = {
        ele: "",
        isShow: false,
        text: ""
    }

    componentDidMount() {
        this.setState({
            ele: this.ref
        })
    }

    handleClick = ()=>{
        this.setState({
            isShow: !this.state.isShow
        })
    }

    handleChangeText = (e)=>{
        this.setState({
            text: e.target.value
        })
    }

    render() {
        const { isShow, text } = this.state;
        return (
            <>
                <div style={{
                    width: '300px',
                    minHeight: "100px",
                    maxHeight: '300px',
                    height: "200px",
                    overflow: "auto",
                    marginBottom: "6px",
                    borderRadius: '3px',
                    background: 'white'
                }}
                ref={node=>this.ref=node}
                onClick={this.handleClick}>
                    <div dangerouslySetInnerHTML={{
                        __html: formatMarkdown(text)
                    }}/>
                </div>
                <Modals ele={this.ref} isShow={isShow} onClick={this.handleClick}
                onChangeText={this.handleChangeText} text={text}/>
            </>
        )
    }
}

class Modals extends React.Component{
    onBlur = ()=>{
        this.props.onClick()
    }

    render() {
        const { ele, isShow, onChangeText, text } = this.props;
        let top = 0;
        let left = 0;
        // let height = 0;
        if(ele){
            const Rect = ele.getBoundingClientRect();
            top = Rect.top;
            left = Rect.left;
            // height = Rect.height;
            console.log(Rect)
        }

        return(
            <Modal isOpen={isShow} style={{
                content: {
                    top,
                    left,
                    width: "300px",
                    height: "200px",
                    // background: "pink",
                    padding: 0
                }
            }} overlayClassName="modal-underlay">
                {/* <div className="modal-textarea-wrapper"> */}
                    <Textarea
                    autoFocus
                    spellCheck={false}
                    onBlur={this.onBlur}
                    onChange={onChangeText}
                    className="modal-textarea"
                    value={text}
                   ></Textarea>
                {/* </div> */}
            </Modal>
        )
    }
}