import React from 'react';
import ReactDOM from 'react-dom';


export default class Title extends React.Component
{
	render()
	{
		return(
			<ol>
				<li>{this.props.title}</li>
			</ol>
		);
	}
}



