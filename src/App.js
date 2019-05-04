import React from 'react';
import './App.css';
import { withCrud } from './CrudApp/FunctionalComps';
import Input from './CrudApp/Input';
import { ViewRow } from './CrudApp/ListView';


const UsersWithCrud = withCrud(Input, ViewRow);
const App = () => {
	return (
		<UsersWithCrud />
	);
}


export default App;
