import React from 'react';
import ReactDOM from 'react-dom';

import Title from "./title.jsx";

export default class Header extends React.Component
{
	handleChange(e)
	{
		const title = e.target.value;
		this.props.changeTitle(title);
	}
	
	addItem()
	{
		this.setState({})
	}
	render()
	{
		console.log(this.props);
	
		
		return(
			<div>
				<Title title={this.props.title}/>
				<input value = {this.props.title} onChange = {this.handleChange.bind(this)}/>
				<button onClick = "">Add</button>
			</div>
		);
	}
}



