import React from 'react';
import ReactDOM from 'react-dom';

import Child from './child.jsx';
import Content from './content.jsx'
import List from './list.jsx'
import MyJSON from "./getJSON.jsx";

class Test extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			items: [],
			nazwy: [{name: "Maciek"}, {name: "Ilona"}, {name: "Aurelka"},{name: "Dupa"}, {name: "pizda"}],
			dane: [{component: "First"}, {component: "Second"}, {component: "Third"}, {component: "Kurwa"}],
			data: [],
			text: "Some text",
			header: "Header form state",
			content: "Content from state",
			json: "",
			bands: [],
			search: ""
		}


		this.updateMyData = this.updateMyData.bind(this);

		this.setStateHandler = this.setStateHandler.bind(this);

		this.updateState = this.updateState.bind(this);

		this.clearInput = this.clearInput.bind(this);

		this.getJSON = this.getJSON.bind(this);

		this.getSearchValue = this.getSearchValue.bind(this);

	}

	componentWillMount()
	{
		this.setState({items: this.state.bands});
	}

	updateState(e)
	{
		this.setState({text: e.target.value});
	}

	getSearchValue(e)
	{
		this.setState({search: e.target.value});
	}

	clearInput()
	{
		var array = [];
		this.setState({items: array});
		//ReactDOM.findDOMNode(this.refs.myref).focus();
	}

	setStateHandler()
	{
		var item = this.state.text;
		var myArray = this.state.data;
		myArray.push(item);
		this.setState({data: myArray});

	}

	updateMyData()
	{
		this.setState({data: "Data updated from the child!"});
	}

	getJSON()
	{

		console.log("TIMES");
		var url = "https://api.spotify.com/v1/search?q=";
		url += this.state.search;
		url += "*&type=artist"

		var request = new XMLHttpRequest();
		request.open('GET', url);
		request.setRequestHeader("Content-type", "application/json", true);

		request.onreadystatechange = (e) =>
		{
  		if (request.readyState == 4 && request.status == 200)
			{
    		console.log('success');
				var data = JSON.parse(request.responseText);
				var bandsArray = this.state.bands;

				for(var i = 0; i < data.artists.items.length; i++)
				{
					console.log("Name: " + data.artists.items[i].name);
					bandsArray.push({name: data.artists.items[i].name});
					this.setState({bands: bandsArray});
					console.log("TEST: " + this.state.bands[i].name);
				}
  		}
			else
			{

  		}
		}
	request.send();
	}

	render()
	{
		return(
			<div>
				<div id = "json">
					<input type = "text" onChange = {this.getSearchValue}></input>
					<button onClick = {this.getJSON}>Get JSON</button>
					<button onClick = {this.clearInput}>CLEAR</button>
					<h3>Results<br /></h3>
						<div>
							<ul ref = "myref">
							{this.state.items.map((dynamicComponent, i) => <List key = {i} item={dynamicComponent} />)}
							</ul>
						</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Test />, document.getElementById("app"));
