import React from 'react';
import PropTypes from 'prop-types';


//Form with one input component
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || ''
        }
    }

    render() {
        return (
            <div className='w-75'>
                <input className='w-100' value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleEnter}/>
                <div className='d-flex justify-content-end mt-2'>
                    <button onClick={this.handleAdd} className='btn btn-sm btn-primary'>{this.props.submitText}</button>
                    <button onClick={this.handleClear} className='btn btn-sm btn-danger ml-1'>{this.props.cancelText}</button>
                </div>
            </div>
        );
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    handleAdd = () => {
        this.props.handleSubmit(this.state);
    }

    handleClear = () => {
        this.setState({
            value: ''
        });
        this.props.handleCancel();
    }

    handleEnter = (e) => {
        if(e.key==='Enter'){
            this.handleAdd();
        }
    }
}


export default Input;


Input.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    submitText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    value: PropTypes.any,
    id: PropTypes.any
}
