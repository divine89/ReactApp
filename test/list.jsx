import React from 'react';

export default class List extends React.Component
{
	render()
	{
		return(
					<li>{this.props.item.name}</li>
			);
	}
}