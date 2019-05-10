import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';


const IconDropdown = ({ icon, toggle: Toggle, ...rest}) => {
    return(
        <Dropdown style={pointerStyle}>
            <Dropdown.Toggle as={Toggle} />
            <Dropdown.Menu>
                <Dropdown.Item eventKey="1">One</Dropdown.Item>
                <Dropdown.Item eventKey="2">Two</Dropdown.Item>
                <Dropdown.Item eventKey="3">Three</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}


class CustomToggle extends React.Component{
    handleClick = (e) => {
        e.preventDefault();
        this.props.onClick(e);
    }

    render(){
        return(
            <button className={this.props.className} onClick={this.handleClick}>
                {this.props.children}
            </button>
        );
    }
}


const SmBlueToggle = ({ className, ...rest}) => {
    return(
        <CustomToggle className='btn btn-sm btn-info' {...rest}>
            {<i className="fas fa-ellipsis-v" />}
        </CustomToggle>
    );
}

const Page = () => {
    return(
        <div className='container'>
            <div>List of commonly used custom components</div>
            <IconDropdown
                toggle={SmBlueToggle} />
        </div>
    );
}


const pointerStyle = { cursor:'pointer' }


export { Page };