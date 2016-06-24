import React from 'react';

export default class List extends React.Component
{
	constructor()
	{
		super();

		this.handleClick = this.handleClick.bind(this);
	}
	handleClick()
	{
		console.log("HANDLE");
		alert(this.props.item.name);
	}
	render()
	{
		return(
					<tr onClick={this.handleClick}>
						<td>{this.props.item.name}</td>
						<td>50</td>
						<td>email@email.com</td>
					</tr>
			);
	}
}
