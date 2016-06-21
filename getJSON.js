import React from 'react';

export default class MyJSON extends React.Component
{
  getJSON()
  {
    consloe.log("In getJSON()");
    var url = "https://api.spotify.com/v1/artists/0gOfliKtwRYsD3ST4iBvv3";

    var results = document.getElementById("json");

    var hr = new XMLHttpRequest();

    hr.open("GET", url, true);

    hr.setRequestHeader("Content-type", "application/json", true);

    hr.onreadystatechange = function()
    {
      if(hr.readyState == 4 && hr.status == 200)
      {
        var data = JSON.parse(hr.responseText);

        results.innerHTML = "Name: " + data.name + " with popularity " + data.popularity + " and followers " + data.followers.total;

        for(var i = 0; i < data.images.length; i++)
        {
          console.log("In for. I: " + i);
          results.innerHTML += " Img: " + data.images[i].url;
        }
      }
    }

  }

  render()
  {
    return(<div>{this.name}</div>);
  }
}
