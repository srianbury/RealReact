import React from 'react';
import {
	HashRouter as Router,
	Switch,
	Route,
	NavLink
} from 'react-router-dom';
import './App.css';
import { withCrud } from './CrudApp/Crud';
import { UserInput, UserViewRow, userApiHandler } from './CrudApp/Deltas/Users';
import { PhotoInput, PhotoViewRow, PhotoEdit, photoApiHandler } from './CrudApp/Deltas/Photos';
import { Loading} from './CrudApp/FunctionalComps';


const UsersWithCrud = withCrud(UserInput, UserViewRow, UserInput, Loading, userApiHandler);
const PhotoswithCrud = withCrud(PhotoInput, PhotoViewRow, PhotoInput, Loading, photoApiHandler);
const PhotosWithCrudWithDifferentEditForm = withCrud(PhotoInput, PhotoViewRow, PhotoEdit, Loading, photoApiHandler);
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
				<Route
					component={PhotosWithCrudWithDifferentEditForm}
					path='/photos2' />
			</Switch>
		</Router>
	);
}


const Header = () => {
	const linkStyle = 'mr-3 text-light';
	const activeClassName = 'mr-3 text-info';
	return(
		<div className='p-2' style={{backgroundColor:'#515459'}}>
			<div className='container'>
				<NavLink to="/" className={linkStyle} activeClassName={activeClassName}>Home</NavLink>
				<NavLink to="/users" className={linkStyle} activeClassName={activeClassName}>Users</NavLink>
				<NavLink to="/photos" className={linkStyle} activeClassName={activeClassName}>Photos</NavLink>
				<NavLink to="/photos2" className={linkStyle} activeClassName={activeClassName}>Photos 2</NavLink>
			</div>
		</div>
	);
}


const Home = () => { 
	const highlight = { backgroundColor: '#000000' };
	return(
		<div className='container'>
			<div className="jumbotron mt-3">
				<h1 className="display-3">Welcome!</h1>
				<p className="lead">
					The star of this show is <code>withCrud</code>!  It allows you to develop CRUD views quickly.  All you have to do is write 3 objects!  
					<ol>
						<li>Component for input</li>
						<li>Component for viewing one row of data</li>
						<li>An object that handles your api requests</li>
					</ol>
					withCrud maps your crud functions in your api handler to
					the correct components, handles the toggling of editview, and handles the loading screen while the data is changing.
				</p>
			</div>
			<div>
				<p>
					<h3>What's here?</h3>
					These pages all use the same withEdit component to give you an example of its use.
					withCrud allows you to develop CRUD views quickly because all you have to do is write 3 objects!  A component for input,
					a component for viewing the data, and an object that handles your api requests!  Thanks to 
					<a href='https://jsonplaceholder.typicode.com/'> JSONPlaceholder</a> I was able to write the crud operations
					in <code>withCrud</code> as they would be for any other api so you don't need to reconfigure them.
				</p>

				<p>
					<h3>Description of the pages</h3>
					Users and Photos pull from different data sources but use the same withCrud component.
					Those components look like this:
					<div><code>const UsersWithCrud = withCrud(UserInput, UserViewRow, UserInput, userApiHandler);</code></div>
					<div><code>const PhotoswithCrud = withCrud(PhotoInput, PhotoViewRow, PhotoInput, photoApiHandler);</code></div>

					Photos and Photos2 are the same exept they use a different component for editing. i.e.
					<div><code>const PhotoswithCrudSameForm = withCrud(PhotoInput, PhotoViewRow, <span style={highlight}>PhotoInput</span>, photoApiHandler);</code></div>
					<div><code>const PhotosWithCrudDiffForm = withCrud(PhotoInput, PhotoViewRow, <span style={highlight}>PhotoEdit</span>, photoApiHandler);</code></div>
				</p>
			</div>
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