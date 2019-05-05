import React from 'react';
import {
	HashRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';
import './App.css';
import { withCrud } from './CrudApp/Crud';
import { Input, ViewRow, basicApiHandler } from './CrudApp/Deltas/Basic';


const BasicWithCrud = withCrud(Input, ViewRow, basicApiHandler);
const Users = () => { return(<div>Temp</div>); }
const App = () => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route 
					exact
					component={BasicWithCrud}
					path="/" />
				<Route
					component={Users}
					path="/" />
			</Switch>
		</Router>
	);
}


const Header = () => {
	return(
		<div className='container'>
			<Link to="/" className='mr-1'>Home</Link>
			<Link to="/users" className='mr-1'>Users</Link>
		</div>
	);
}


export default App;
/*
    You can easily port with with your own data assuming
    your data is a list of object with a key value of id i.e then any other key-value-pairs
    data = [
        { id: 0, anythingElse: 'my value' },
        { id: 0, anythingElse: 'another value; }
    ]
*/