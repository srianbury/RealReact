import React from 'react';
import PropTypes from 'prop-types';
import { Loading, NoData, withLoading } from './FunctionalComps';


const withEdit = (EditRow, ViewRow, LoadingScreen) => {
    const EditRowWithLoading = withLoading(EditRow);
    const ViewRowWithLoading = withLoading(ViewRow);
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
            const { record } = this.props;
            const { id } = record;
            let row;
            if(edit){
                row = (
                    <EditRowWithLoading
                        loading={loading}
                        loader={LoadingScreen}
                        data={record}
                        id={id}
                        handleSubmit={this.handleSubmit}
                        handleCancel={()=>this.setState({edit:false})}
                        submitText='Save'
                        cancelText='Cancel' />
                );
            } else {
                row =(
                    <ViewRowWithLoading
                        loading={loading}
                        loader={LoadingScreen}
                        record={record} 
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
            this.props.handleDelete(this.props.record);
        }
    }
}
withEdit.propTypes = {
    data: PropTypes.array, //not isRequired because null is allower but would throw a console error
    handleSubmit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}


const withRowEdit = (EditRow, ViewRow, LoadingScreen) => {
    const RowWithEdit = withEdit(EditRow, ViewRow, LoadingScreen);
    return class extends React.Component{
        render(){
            const { data } = this.props;
            if(data==null){
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
withRowEdit.propTypes = {
    data: PropTypes.array, //not isRequired because null is allower but would throw a console error
    handleSubmit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}


export {
    withRowEdit,
    withEdit
}
