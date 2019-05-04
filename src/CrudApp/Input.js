import React from 'react';
import PropTypes from 'prop-types';


//Form with one input component
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || ''
        }
    }

    render() {
        return (
            <div>
                <input value={this.state.value} onChange={this.handleChange} />
                <button onClick={this.handleAdd}>{this.props.submitText}</button>
                <button onClick={this.handleClear}>{this.props.cancelText}</button>
            </div>
        );
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    handleAdd = () => {
        this.props.handleSubmit(this.state);
    }

    handleClear = () => {
        this.setState({
            value: ''
        });
        this.props.handleCancel();
    }
}


export default Input;


Input.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    submitText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    value: PropTypes.any,
    id: PropTypes.any
}
