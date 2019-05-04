import React from 'react';


const Loading = () => {
    return(<div>Loading...</div>);
}


const NoData = () => {
    return(<div>No data.</div>);
}

const withLoading = (Component) => {
    return ({ loading, ...props }) => {
      if (loading){
          return(<Loading />);
      } else {
          return(<Component {...props} />);
      }
    }
  }


export {
    Loading,
    NoData,
    withLoading
}