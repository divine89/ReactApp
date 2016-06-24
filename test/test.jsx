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
			data: [],
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

		this.scrollDown = this.scrollDown.bind(this);

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

	scrollDown()
	{
		 $('html, body').animate({scrollTop: '+=250px'}, 900);
	}

	getJSON()
	{
		this.scrollDown();
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
				var data = JSON.parse(request.responseText);
				var bandsArray = this.state.bands;
				console.log("GET ID: " + data.artists.items[0].id);
				console.log("GET IMG: " + data.artists.items[0].images[0].url);

				for(var i = 0; i < data.artists.items.length; i++)
				{
					bandsArray.push({name: data.artists.items[i].name, id: data.artists.items[i].id, img: data.artists.items[i].images[0].url});
				//	bandsArray.push({id: data.artists.items[i].id});
				//	bandsArray.push({img: data.artists.items[i].images[0].url});

				}
				this.setState({bands: bandsArray});
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
				<div className="test">
					<input className="form-control" type="text" onChange = {this.getSearchValue}></input>
						<span className="input-group-btn">
							<button className="btn btn-default" type="button" onClick = {this.getJSON}>search</button>
							<button className="btn btn-default" type="button" onClick = {this.clearInput}>clear</button>
						</span>

						<br />
				</div>
						<table className="table table-hover">
							<thead>
								<tr>
									<th>Name</th>
									<th>Popularity</th>
									<th>Email</th>
								</tr>
							</thead>
							<tbody>
									{this.state.items.map((object) => <List key={object.id} id={object.id} name={object.name} img={object.img} />)}
							</tbody>
						</table>

				</div>
		);
	}
}

ReactDOM.render(<Test />, document.getElementById("react"));
