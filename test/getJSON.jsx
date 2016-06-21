import React from 'react';

export default class MyJSON extends React.Component
{
  constructor()
  {
    super();
    this.getJSON = this.getJSON.bind(this);
  }
  getJSON()
  {
    console.log("In getJSON()");

		var url = "https://api.spotify.com/v1/artists/0gOfliKtwRYsD3ST4iBvv3";

		var request = new XMLHttpRequest();
		request.open('GET', url);
		request.setRequestHeader("Content-type", "application/json", true);

		request.onreadystatechange = (e) =>
		{
  		if (request.readyState == 4 && request.status == 200)
			{
    		console.log('success');
				var data = JSON.parse(request.responseText);
				console.log("Data: " + data.name);
				this.setState({json: "Name: " + data.name + " with popularity: " + data.popularity});
  		}
			else
			{

  		}
		}
	request.send();

  }

  render()
  {
    return(<h2>JSON</h2>);
  }
}
