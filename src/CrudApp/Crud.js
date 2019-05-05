import React from 'react';
import { withLoading } from './FunctionalComps';
import { withRowEdit } from './ListView';
import PropTypes from 'prop-types';


const withCrud = (Input, ViewRow, EditRow, apiHandler) => {
    const ListViewWithRowEdit = withRowEdit(EditRow, ViewRow);
    const InputWithLoading = withLoading(Input);
    return class extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                data: null,
                creating: false
            }
        }

        componentDidMount() {
            this.read();
        }

        render() {
            const { data } = this.state;
            return (
                <div className='container mt-4'>
                    <InputWithLoading
                        loading={this.state.creating}
                        data={null}
                        handleSubmit={this.create}   
                        handleCancel={()=>{}}
                        submitText='Add'
                        cancelText='Cancel' />
                    <ListViewWithRowEdit 
                        data={data} 
                        handleSubmit={this.update}
                        handleDelete={this.delete} />
                </div>
            );
        }
        
        create = (newRecord) => {
            this.setState({ creating: true });
            apiHandler.create(newRecord).then(json => {
                let updatedList = this.state.data;
                updatedList.unshift(json);
                this.setState({
                    data: updatedList,
                    creating: false
                });
            });
        }

        read = () => {
            apiHandler.read().then(data => {
                this.setState({ data });
            });
        }

        update = (updatedRecord) => {
            apiHandler.read().then(ok => {
                if(ok){
                    const updatedList = this.state.data.map(row => {
                        if(row.id===updatedRecord.id){ return updatedRecord; }
                        return row;
                    });
                    this.setState({data: updatedList});
                }
            });
        }

        delete = (deleteRecord) => {
            apiHandler.delete(deleteRecord).then(ok => {
                if(ok){
                    const updatedList = this.state.data.filter(row => row.id!==deleteRecord.id);
                    this.setState({data: updatedList});
                }
            });
        }
    }
}


const inputPropTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    submitText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    data: PropTypes.object
}


const viewPropTypes = {
    record: PropTypes.object,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func
}


export {
    withCrud,
    inputPropTypes,
    viewPropTypes
};