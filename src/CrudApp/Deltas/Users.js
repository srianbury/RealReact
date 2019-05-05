import React from 'react';
import PropTypes from 'prop-types';


class UserInput extends React.Component{
    constructor(props) {
        super(props);
        const { data } = this.props;
        this.state = {
            name: (data==null) ? '' : data.name,
            username: (data==null) ? '' : data.username,
            phone: (data==null) ? '' : data.phone,
        }
    }

    render(){
        return(
            <div>
                <div className="form-group row">
                    <label 
                        className="col-sm-2 col-form-label">
                        Name
                    </label>
                    <div className="col-sm-10">
                        <input 
                            id="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label 
                        className="col-sm-2 col-form-label">
                        Username
                    </label>
                    <div className="col-sm-10">
                        <input 
                            id="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label 
                        className="col-sm-2 col-form-label">
                        Phone
                    </label>
                    <div className="col-sm-10">
                        <input 
                            id="phone"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            className="form-control" 
                            type="text" />
                    </div>
                </div>

                <div className='d-flex justify-content-end mt-2'>
                    <button onClick={this.handleAdd} className='btn btn-sm btn-primary'>{this.props.submitText}</button>
                    <button onClick={this.handleClear} className='btn btn-sm btn-danger ml-1'>{this.props.cancelText}</button>
                </div>
            </div>
        );
    }

    handleChange = (e) => {
        let change = {};
        change[e.target.id] = e.target.value;
        this.setState(change);
    }

    handleAdd = () => {
        this.props.handleSubmit(this.state);
    }

    handleClear = () => {
        this.setState({
            name: '',
            username: '',
            phone: ''
        });
        this.props.handleCancel();
    }
}
UserInput.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    submitText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    data: PropTypes.object
}


const UserViewRow = (props) => {
    const { record } = props;
    return(
        <div className='border rounded'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <h3>Name</h3>
                        <p>{record.name}</p>
                    </div>
                    <div className='col-sm-6'>
                        <h3>Username</h3>
                        <p>{record.username}</p>
                    </div>
                    <div className='col-sm-6'>
                        <h3>Phone</h3>
                        <p>{record.phone}</p>
                    </div>
                </div>

                <div className='d-flex justify-content-end'>
                    <button className='btn btn-sm btn-success' onClick={props.handleEdit}>Edit</button>
                    <button className='btn btn-sm btn-danger ml-1' onClick={props.handleDelete}>Delete</button>
                </div>
            </div>
                    
        </div>
    );
}


const url = 'https://jsonplaceholder.typicode.com/users';
const userApiHandler = {
    async create(newRecord){
        const response = await fetch(`${url}`, {
            method: 'POST',
            body: JSON.stringify(newRecord),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = await response.json();
        return json;
    },
    async read(){
        const response = await fetch(`${url}`);
        const json = await response.json();
        return json;
    },
    async update(updatedRecord){
        const { id } = updatedRecord;
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedRecord),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return response.ok;
    },
    async delete(deleteRecord){
        const { id } = deleteRecord;
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    }
}

export {
    UserInput,
    UserViewRow,
    userApiHandler
}