import React from 'react';
import ReactDOM from 'react-dom';

import Header from "./header.jsx";


export default class Layout extends React.Component
{
	constructor()
	{
		super();
		this.state = {title: "welcome"};
	}
	
	changeTitle(title)
	{
		this.setState({title});
	}
	
	render()
	{	
		return(
			<Header title={this.state.title} changeTitle={this.changeTitle.bind(this)} />
		);
	}
}

const app = document.getElementById('layout');

ReactDOM.render(<Layout/>, app);

