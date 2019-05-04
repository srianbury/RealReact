import React from 'react';
import PropTypes from 'prop-types';
import { Loading, NoData, withLoading } from './FunctionalComps';
import Input from './Input';


class ListView extends React.Component{
    render(){
        const { data } = this.props;
        if(data===null){
            return(<Loading />);
        } else if(data.length===0) {
            return(<NoData />);
        } else {
            return(
                <div>
                    {data.map(row => 
                        <Row 
                            key={row.id}
                            record={row}
                            handleSubmit={this.props.handleSubmit}
                            handleDelete={this.props.handleDelete} />)}
                </div>
            );
        }
    }
}
ListView.propTypes = {
    data: PropTypes.array, //not isRequired because null is allower but would throw a console error
    handleSubmit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}


const ViewRow = (props) => {
    return(
        <div>
            {props.value}
            <button onClick={props.handleEdit}>Edit</button>
            <button onClick={props.handleDelete}>Delete</button>
        </div>
    );
}


const InputWithLoading = withLoading(Input);
const ViewWithLoading = withLoading(ViewRow);
class Row extends React.Component{
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

        if(edit){
            return(
                <InputWithLoading
                    loading={loading}
                    value={value}
                    id={id}
                    handleSubmit={this.handleSubmit}
                    handleCancel={()=>this.setState({edit:false})}
                    submitText='Save'
                    cancelText='Cancel' />
            );
        } else {
            return(
                <ViewWithLoading
                    loading={loading}
                    value={value} 
                    handleEdit={()=>this.setState({edit:true})}
                    handleDelete={this.handleDelete} />
            );
        }
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
Row.propTypes = {
    record: PropTypes.any.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}


export default ListView;
