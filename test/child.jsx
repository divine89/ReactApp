import React from 'react';

export default class Child extends React.Component
{
	render()
	{
		return(
		<div>
			<h1>Child and Name of {this.props.secondProp}</h1>
			<h2>{this.props.myProp}</h2>
				<button type = "button" onClick = {this.props.myUpdatedProp}>Increase</button>
		</div>);
	}
}
