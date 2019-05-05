import React from 'react';
import { withLoading } from './FunctionalComps';
import { withRowEditSameAsCreateForm } from './ListView';


const withCrud = (Input, ViewRow, apiHandler) => {
    const ListViewWithEditSameAsCreate = withRowEditSameAsCreateForm(Input, ViewRow);
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
                    <ListViewWithEditSameAsCreate 
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


export {
    withCrud
};