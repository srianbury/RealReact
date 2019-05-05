import React from 'react';
import './App.css';
import { withCrud } from './CrudApp/Crud';
import Input from './CrudApp/Input';
import { ViewRow } from './CrudApp/ListView';
import { basicApiHandler } from './CrudApp/Deltas/Basic';


const UsersWithCrud = withCrud(Input, ViewRow, basicApiHandler);
const App = () => {
	return (
		<UsersWithCrud />
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