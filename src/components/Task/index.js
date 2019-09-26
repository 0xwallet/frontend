import React from 'react';
import formatMarkdown from '../../util/formatMarkdown';
import Textarea from "react-textarea-autosize";
import { Button } from 'reactstrap';
import Modal from 'react-modal';
import './index.scss';

Modal.setAppElement('#root');

export default class TaskWrap extends React.Component{
    render() {
        return(
            <>
                <Task />
                <Task />
                <Task />
            </>
        )
    }
}


class Task extends React.Component{
    state = {
        title: "welcome to owaf",
        isShow: false,
        showAddInput: false,
        list: [12,43]
    }

    handleClick = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    handleChangeText = (e)=> {
        this.setState({
            title: e.target.value
        })
    }

    handleShowInput = () => {
        this.setState({
            showAddInput: !this.state.showAddInput
        })
    }

    addNewCard = () => {
        const cloneList = [...this.state.list];
        cloneList.push('newcard');
        this.setState({
            list: cloneList
        })
    }

    render() {
        const { isShow, title, showAddInput, list } = this.state;
        return(
            <div style={{
                display: "inline-block",
            }}>
            <div style={{
                position: "relative",
                background: 'rgba(70,100,90,.65)',
                borderRadius: "5px",
                opacity: 0.8,
                marginRight: '1rem',
                }} id="task">
                <header>
                    <div style={{
                    width: "280px",
                    margin: '1rem 0 0 1rem'
                    }}>
                        <Textarea 
                        value={title}
                        spellCheck={false}
                        style={{
                            border: 'none',
                            borderRadius: '3px',
                            marginBottom: '1rem',
                            color: isShow? "#000": "#fff",
                            fontSize: "1.3rem",
                            resize: 'none',
                            fontWeight: 700,
                            width: "100%",
                            background: isShow? "#fff": 'none'
                        }} 
                        onFocus={this.handleClick} 
                        onBlur={this.handleClick}
                        onChange={this.handleChangeText}/>
                    </div>
                </header> 
                <div style={{
                      maxHeight: '69vh',
                      overflow: "auto", 
                      padding: '0 1rem 1rem'
                }}>
                    {
                        list.map((v,i)=>(
                        <ListItem key={i}/>
                        ))
                    }
                 </div>
            </div>
            {
            showAddInput? <Textarea onBlur={this.addNewCard}/>: 
            <Button style={{marginLeft: "1rem"}} color="primary" onClick={this.handleShowInput}>add</Button>
            }
            </div>
        )
    }
}

class ListItem extends React.Component{
    state = {
        ele: "",
        isShow: false,
        text: "### hello world [x]"
    }

    componentDidMount() {
        this.setState({
            ele: this.ref
        })
    }

    handleClick = event => {
        const { tagName, checked, id }= event.target;
        if (tagName.toLowerCase() === "input") {
          // The id is a string that describes which number in the order of checkboxes this particular checkbox has
          this.toggleCheckbox(checked, parseInt(id, 10));
        } else if (tagName.toLowerCase() !== "a") {
          this.toggleCardEditor();
        }
        if(tagName !== 'INPUT'){
            this.toggleCardEditor();
        }
    };

    toggleCardEditor = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    handleChangeText = (e)=>{
        this.setState({
            text: e.target.value
        })
    }

    toggleCheckbox = (checked, i) => {
        const { text } = this.state;
    
        let j = 0;
        const newText = text.replace(/\[(\s|x)\]/g, match => {
          let newString;
          if (i === j) {
            newString = checked ? "[x]" : "[ ]";
          } else {
            newString = match;
          }
          j += 1;
          return newString;
        })

        this.setState({
            text: newText
        })
    }

    render() {
        const { isShow, text } = this.state;
        return (
            <>
                <div style={{
                    width: '300px',
                    height: "150px",
                    overflow: "auto",
                    marginBottom: "6px",
                    borderRadius: '3px',
                    background: 'white'
                }}
                ref={node=>this.ref=node}
                onClick={(e)=>this.handleClick(e)}
                >
                    <div dangerouslySetInnerHTML={{
                        __html: formatMarkdown(text)
                    }} 
                />
                </div>
                <Modals ele={this.ref} isShow={isShow} toggleCardEditor={this.toggleCardEditor}
                onChangeText={this.handleChangeText} text={text}/>
            </>
        )
    }
}

class Modals extends React.Component{
    onBlur = ()=>{
        this.props.toggleCardEditor()
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
        }

        return(
            <Modal isOpen={isShow} style={{
                content: {
                    top,
                    left,
                    width: "300px",
                    height: "150px",
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

