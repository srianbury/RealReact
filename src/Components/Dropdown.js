import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';


const withToggle = (className, text) => {
    return class extends React.Component{
        handleClick = (e) => {
            e.preventDefault();
            this.props.onClick(e);
        }
    
        render(){
            return(
                <button className={className} onClick={this.handleClick}>
                    {text}
                </button>
            );
        }
    }
}


class CustomDropdown extends React.Component{
    render(){
        const { toggleClass, text, items, id } = this.props;
        const ColorWithToggle = withToggle(toggleClass, text);
        return(
            <Dropdown style={pointerStyle}>
                <Dropdown.Toggle as={ColorWithToggle} />
                <Dropdown.Menu>
                    {items.map(val => 
                    <Dropdown.Item 
                        key={val}
                        onClick={() => this.props.handleChange(id, val)}>
                        {val}
                    </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}


class Page extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dropdownVal: null,
            textDropdownVal: null,
        };
    }
    render(){
        const { dropdownVal, textDropdownVal } = this.state;
        const items = ['one', 'two', 'three'];

        return(
            <div className='container'>
                <div>List of commonly used custom components</div>
                <div className='row'>
                    <div className='col-sm-4'>
                        {dropdownVal || 'Please Select'}
                        <CustomDropdown
                            id='dropdownVal'
                            handleChange={this.handleChange}
                            items={items}
                            toggleClass='btn btn-sm btn-info'
                            text={<i className="fas fa-ellipsis-v" />} />
                    </div>

                    <div className='col-sm-4'>
                        <CustomDropdown
                            id='textDropdownVal'
                            handleChange={this.handleChange}
                            items={items}
                            toggleClass='btn btn-sm btn-info'
                            text={<h6>{textDropdownVal || 'Please Select'}</h6>} />
                    </div>
                </div>
            </div>
        );
    }

    handleChange = (id, val) => {
        let change = {};
        change[id] = val;
        this.setState(change);
    }
}


const pointerStyle = { cursor:'pointer' }


export { Page };