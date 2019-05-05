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
        
        create = (data) => {
            this.setState({ creating: true });
            setTimeout(()=>{
                const newList = apiHandler.create(this.state.data, data);
                this.setState({ data: newList, creating: false });
            }, 1000);
        }

        read = () => {
            setTimeout(() => {
                const data = apiHandler.read();
                this.setState({ data });
            }, 1000);
        }

        update = (data) => {
            setTimeout(() => {
                const updatedData = apiHandler.update(this.state.data, data);
                this.setState({ data: updatedData });
            }, 1000);
        }

        delete = (data) => {
            setTimeout(() => {
                const updatedData = apiHandler.delete(this.state.data, data);
                this.setState({ data: updatedData });
            }, 1000);
        }
    }
}


export {
    withCrud
};