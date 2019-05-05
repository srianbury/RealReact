import React from 'react';
import PropTypes from 'prop-types';


class PhotoInput extends React.Component {
    constructor(props) {
        super(props);
        const { data } = this.props;
        this.state = {
            albumId: (data == null) ? '' : data.albumId,
            title: (data == null) ? '' : data.title,
            url: (data == null) ? '' : data.url,
            thumbnailUrl: (data == null) ? '' : data.thumbnailUrl,
        }
    }

    render() {
        return (
            <div className='border rounded'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className="form-group row">
                                <label
                                    className="col-sm-2 col-form-label">
                                    Album ID
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        id="albumId"
                                        value={this.state.albumId}
                                        onChange={this.handleChange}
                                        type="text"
                                        className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className="form-group row">
                                <label
                                    className="col-sm-2 col-form-label">
                                    Title
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        id="title"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        type="text"
                                        className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className="form-group row">
                                <label
                                    className="col-sm-2 col-form-label">
                                    Url
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        id="url"
                                        value={this.state.url}
                                        onChange={this.handleChange}
                                        type="text"
                                        className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className="form-group row">
                                <label
                                    className="col-sm-2 col-form-label">
                                    Thumbnail Url
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        id="thumbnailUrl"
                                        value={this.state.thumbnailUrl}
                                        onChange={this.handleChange}
                                        type="text"
                                        className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex justify-content-end mt-2'>
                        <button onClick={this.handleAdd} className='btn btn-sm btn-primary'>{this.props.submitText}</button>
                        <button onClick={this.handleClear} className='btn btn-sm btn-danger ml-1'>{this.props.cancelText}</button>
                    </div>
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
            albumId: '',
            title: '',
            url: '',
            thumbnailUrl: ''
        });
        this.props.handleCancel();
    }
}
PhotoInput.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    submitText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    data: PropTypes.object
}


const PhotoViewRow = (props) => {
    const { record } = props;
    return(
        <div className='border rounded'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-3'>
                        <img src={record.thumbnailUrl} className='img-fluid' alt='img' />
                    </div>
                    <div className='col-sm-9'>
                        {record.title}
                        <div className='d-flex justify-content-between'>
                            <div>{record.url}</div>
                            <div>{record.albumId}</div>
                        </div>
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


const url = 'https://jsonplaceholder.typicode.com/photos';
const photoApiHandler = {
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
        const ten = json.splice(4990);
        console.log(ten);
        return ten;
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
    PhotoInput,
    PhotoViewRow,
    photoApiHandler
}