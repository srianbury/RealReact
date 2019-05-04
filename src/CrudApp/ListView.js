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
                            data={row}
                            handleSubmit={this.props.handleSubmit}
                            handleDelete={this.props.handleDelete} />)}
                </div>
            );
        }
    }
}
ListView.propTypes = {
    //data: PropTypes.array.isRequired
}


const View = (props) => {
    return(
        <div>
            {props.value}
            <button onClick={props.handleEdit}>Edit</button>
            <button onClick={props.handleDelete}>Delete</button>
        </div>
    );
}


const InputWithLoading = withLoading(Input);
const ViewWithLoading = withLoading(View);
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
        const { data } = this.props;

        if(edit){
            return(
                <InputWithLoading
                    loading={loading}
                    value={data.value}
                    id={data.id}
                    handleSubmit={this.handleSubmit}
                    handleCancel={()=>this.setState({edit:false})}
                    submitText='Save'
                    cancelText='Cancel' />
            );
        } else {
            return(
                <ViewWithLoading
                    loading={loading}
                    value={data.value} 
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

    handleSubmit = (data) => {
        this.setState({loading:true});
        this.props.handleSubmit(data);
    }

    handleDelete = () => {
        this.setState({loading: true});
        this.props.handleDelete(this.props.data);
    }
}
Row.propTypes = {
    data: PropTypes.any.isRequired
}


export default ListView;
