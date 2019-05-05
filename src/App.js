import React from 'react';
import {
	HashRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';
import './App.css';
import { withCrud } from './CrudApp/Crud';
import { UserInput, UserViewRow, userApiHandler } from './CrudApp/Deltas/Users';
import { PhotoInput, PhotoViewRow, photoApiHandler } from './CrudApp/Deltas/Photos';

const Home = () => { return(<div className='container'>Welcome!</div>); }
const UsersWithCrud = withCrud(UserInput, UserViewRow, userApiHandler);
const PhotoswithCrud = withCrud(PhotoInput, PhotoViewRow, photoApiHandler);
const App = () => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route 
					exact
					component={Home}
					path="/" />
				<Route
					component={UsersWithCrud}
					path="/users" />
				<Route
					component={PhotoswithCrud}
					path="/photos" />
			</Switch>
		</Router>
	);
}


const Header = () => {
	return(
		<div className='container'>
			<Link to="/" className='mr-1'>Home</Link>
			<Link to="/users" className='mr-1'>Users</Link>
			<Link to="/photos" className='mr-1'>Photos</Link>
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