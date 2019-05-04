import React from 'react';
import Input from './Input';
import ListView from './ListView';
import { withLoading } from './FunctionalComps';


const InputWithLoading = withLoading(Input);
/*
    You can easily port with with your own data assuming 
    your data is a list of object with a key value of id i.e then any other key-value-pairs
    data = [
        { id: 0, anythingElse: 'my value' },
        { id: 0, anythingElse: 'another value; }
    ]
*/
class Crud extends React.Component {
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
            <div>
                <InputWithLoading
                    loading={this.state.creating}
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
            //fetch and return an id upon successfully creation
            data.id = new Date().getTime();
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
        setTimeout(() => {
            const updatedData = this.state.data.filter(row => row.id !== data.id);
            this.setState({ data: updatedData });
        }, 1000);
    }
}


export default Crud;