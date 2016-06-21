import React from 'react';
import ReactDOM from 'react-dom';

class Test extends React.Component
{
	constructor()
	{
		super();
		this.state = {count: "dupa"};
	}
	
     getInitialState()
	 {
        return 
		{ 
			count: 0 	
		};
     }
      
	 handleClick() 
	 {
        this.setState(
		{
			count: this.state.count + 1,
        });	
    }
	
    render() 
	{
		console.log("In Tests!")
        return(
			<button onClick={this.handleClick}>
				Click me! Number of clicks: {this.state.count}
			</button>
        );
    }
	
}
      
ReactDOM.render(<Test />, document.getElementById('container'));