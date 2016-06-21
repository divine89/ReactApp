import React from 'react';

export default class Content extends React.Component
{
	render()
	{
		console.log(this.props);
		return(
		<div>
			<div>{this.props.componentDane.component}</div>
		</div>);
	}
}