import React from 'react';
import './App.css';
import { withCrud, withLoading } from './CrudApp/FunctionalComps';
import Input from './CrudApp/Input';
import ListView from './CrudApp/ListView';


const InputWithLoading = withLoading(Input);
const UsersWithCrud = withCrud(InputWithLoading, ListView);
const App = () => {
	return (
		<UsersWithCrud />
	);
}


export default App;
