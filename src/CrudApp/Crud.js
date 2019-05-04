import React from 'react';
import Input from './Input';
import ListView from './ListView';
import { withLoading } from './FunctionalComps';


const InputWithLoading = withLoading(Input);
class Crud extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            creating: false,
            editing: false,
            deleting: false
        }
    }

    componentDidMount() {
        this.read();
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <InputWithLoading
                    loading={this.state.creating}
                    id={-1}
                    value=''
                    handleSubmit={this.create}
                    handleCancel={()=>{}}
                    submitText='Add'
                    cancelText='Cancel' />
                <ListView 
                    data={data} 
                    handleSubmit={this.update}
                    handleDelete={this.delete} />
            </div>
        );
    }

    create = (data) => {
        this.setState({ creating: true });
        setTimeout(() => {
            let updatedData = this.state.data;
            updatedData.push(data);
            this.setState({ data: updatedData, creating: false });
        }, 1000);
    }

    read = () => {
        setTimeout(() => {
            const data = [{ id: 1, value: 'brian' }, { id: 2, value: 'pete' }];
            this.setState({ data });
        }, 1000);
    }

    update = (data) => {
        setTimeout(() => {
            const updatedData = this.state.data.map(row => {
                if (row.id === data.id) { return data; }
                return row;
            });
            this.setState({ data: updatedData });
        }, 1000);
    }

    delete = (data) => {
        const updatedData = this.state.data.filter(row => row.id !== data.id);
        setTimeout(() => {
            this.setState({ data: updatedData });
        }, 1000);
    }
}


export default Crud;