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
		//alert(this.props.item.name);
	}
	render()
	{
		console.log("ITEM.NAME:" + this.props.name);
		console.log("ITEM.ID:" + this.props.id);
		console.log("ITEM.IMG:" + this.props.img);
		return(
					<tr onClick={this.handleClick}>
						<td>{this.props.name}</td>
						<td>{this.props.id}</td>
						<td>{this.props.img}</td>
					</tr>
			);
	}
}
