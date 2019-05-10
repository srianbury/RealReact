import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';


class CustomToggle extends React.Component{
    handleClick = (e) => {
        e.preventDefault();
        this.props.onClick(e);
    }

    render(){
        return(
            <button className='btn btn-success' onClick={this.handleClick}>
                {this.props.children}
            </button>
        );
    }
}


const withToggle = (className, icon) => {
    return class extends React.Component{
        handleClick = (e) => {
            e.preventDefault();
            this.props.onClick(e);
        }
    
        render(){
            return(
                <button className={className} onClick={this.handleClick}>
                    {icon}
                </button>
            );
        }
    }
}


class IconDropdown extends React.Component{
    render(){
        const { toggleClass, toggleIcon } = this.props;
        const ColorWithToggle = withToggle(toggleClass, toggleIcon);
        return(
            <Dropdown style={pointerStyle}>
                <Dropdown.Toggle as={ColorWithToggle} />
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="1">One</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Two</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Three</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}


class Page extends React.Component{
    render(){
        return(
            <div className='container'>
                <div>List of commonly used custom components</div>
                <IconDropdown
                    toggleClass='btn btn-sm btn-info'
                    toggleIcon={<i className="fas fa-ellipsis-v" />} />
            </div>
        );
    }
}


const pointerStyle = { cursor:'pointer' }


export { Page };