import React from 'react';

export default class List extends React.Component
{
	render()
	{
		return(
					<tr>
						<td>{this.props.item.name}</td>
						<td>50</td>
					</tr>
			);
	}
}
