import React from 'react';
import PropTypes from 'prop-types';


const Loading = () => {
    return(
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
}


const NoData = () => {
    return(<div>No data.</div>);
}


const withLoading = (Component) => {
    return ({ loading, ...props }) => {
        if (loading) {
            return (<Loading />);
        } else {
            return (<Component {...props} />);
        }
    }
}


const withEdit = (EditRow, ViewRow) => {
    return class extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                edit: false,
                loading: false
            }
        }

        render(){
            const { edit, loading } = this.state;
            const { value, id } = this.props.record;
            let row;
            if(edit){
                row = (
                    <EditRow
                        loading={loading}
                        value={value}
                        id={id}
                        handleSubmit={this.handleSubmit}
                        handleCancel={()=>this.setState({edit:false})}
                        submitText='Save'
                        cancelText='Cancel' />
                );
            } else {
                row =(
                    <ViewRow
                        loading={loading}
                        value={value} 
                        handleEdit={()=>this.setState({edit:true})}
                        handleDelete={this.handleDelete} />
                );
            }
    
            return(
                <div className='mt-1'>{row}</div>
            );
        }

        componentDidUpdate(prevProps){
            if(prevProps!==this.props){
                this.setState({
                    edit: false,
                    loading: false
                });
            }
        }

        handleSubmit = (updatedRecord) => {
            this.setState({loading:true});
            updatedRecord.id = this.props.record.id;
            this.props.handleSubmit(updatedRecord);
        }
    
        handleDelete = () => {
            this.setState({loading: true});
            this.props.handleDelete(this.props.record);
        }
    }
}
withEdit.propTypes = {
    data: PropTypes.array, //not isRequired because null is allower but would throw a console error
    handleSubmit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}


const withListViewEditSameAsCreate = (EditRow, ViewRow) => {
    const RowWithEdit = withEdit(withLoading(EditRow), withLoading(ViewRow));
    return class extends React.Component{
        render(){
            const { data } = this.props;
            if(data===null){
                return(<Loading />);
            } else if(data.length===0) {
                return(<NoData />);
            } else {
                return(
                    <div className='mt-2'>
                        {data.map(row => 
                            <RowWithEdit
                                key={row.id}
                                record={row}
                                handleSubmit={this.props.handleSubmit}
                                handleDelete={this.props.handleDelete} />)}
                    </div>
                );
            }
        }
    }
}


const withCrud = (Input, ViewRow) => {
    const ListViewWithEditSameAsCreate = withListViewEditSameAsCreate(Input, ViewRow);
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
                    <Input
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
}


export {
    Loading,
    NoData,
    withLoading,
    withCrud,
    withEdit
}