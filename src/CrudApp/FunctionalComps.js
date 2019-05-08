import React from 'react';


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
    return ({ loading, loader: LoadingComponent, ...props }) => {
        if (loading) {
            return (<LoadingComponent />);
        } else {
            return (<Component {...props} />);
        }
    }
}


export {
    Loading,
    NoData,
    withLoading
}