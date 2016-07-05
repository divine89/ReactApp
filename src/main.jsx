import React from 'react';
import ReactDOM from 'react-dom';
import List from './list.jsx'
import Modal from "./modal.jsx";

class Main extends React.Component
{

  // <CONSTRUCOTR>
  constructor(props)
  {
    super(props);
    this.state =
    {
      items: [],
      repositoriesArray: [],
      readyArray: [],
      URL: "https://api.github.com/repositories?since=0",
      currentURL: "",
      previousURL: "",
      pageNumber: 0,
      recordsPerPage: 20,
      repositoriesArraySize: 0,
      fetchRepositoriesRequestCount: 0
    }
      this.getResponseFromGitHub = this.getResponseFromGitHub.bind(this);
      this.parseResponseJSON = this.parseResponseJSON.bind(this);
      this.showNextPage = this.showNextPage.bind(this);
      this.showPreviousPage = this.showPreviousPage.bind(this);
      this.getAllPublicReposFromGitHub = this.getAllPublicReposFromGitHub.bind(this);
      this.showFirstPage = this.showFirstPage.bind(this);
      this.showRepositoriesList = this.showRepositoriesList.bind(this);
      this.setNextUrl = this.setNextUrl.bind(this);
      this.setPreviusUrl = this.setPreviusUrl.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.previousPage = this.previousPage.bind(this);
      this.firstPage = this.firstPage.bind(this);
      this.setCurrentUrl = this.setCurrentUrl.bind(this);
      this.getCurrentUrl = this.getCurrentUrl.bind(this);
  }
    // </CONSTRUCOTR>

    // <SET AND GET>
    setNextUrl(url)
    {
      this.setState({URL: url});
    }

    setCurrentUrl(url)
    {
      this.setState({currentURL: url});
    }

    getCurrentUrl()
    {
      var url = this.state.currentURL;

      return url;
    }

    getUrl()
    {
      var url = this.state.URL;

      return url;
    }

    setPreviusUrl(url)
    {
      this.setState({previousURL: url});
    }

    getPreviusUrl()
    {
      var url = this.state.previousURL;

      return url;
    }
    // </SET AND GET>

    // <START FUNCTION>
    // Called from getRepositories Button
    getAllPublicReposFromGitHub()
    {
      var fetchRepositoriesRequestCount = this.state.fetchRepositoriesRequestCount;

      if(fetchRepositoriesRequestCount == 0)
      {
        this.setState({fetchRepositoriesRequestCount: 1});

        var url = this.getUrl();

        this.setPreviusUrl(url);

        this.getResponseFromGitHub(url);
      }
      else
      {
        alert("You have already get all public repositories from GitHub!");
      }
    }
    // </START FUNCTION>

    // Called from getAllPublicReposFromGitHub() //
    // getAllPublicReposFromGitHub ->
    getResponseFromGitHub(url)
    {
      console.debug("getResponseFromGitHub()");

      this.setCurrentUrl(url);

      var request = new XMLHttpRequest();

      request.onreadystatechange = (e) =>
      {
        if (request.readyState == 4 && request.status == 200)
        {
          var response = JSON.parse(request.responseText);

          var nextUrl = this.getLinkFromResponseHeader(request);

          this.setNextUrl(nextUrl);

          this.parseResponseJSON(response);
        }
        else
        {
          console.warn("Some connection problem with GitHub");
        }
      }
        var requestType = "GET";

        request.open(requestType, url, true);

        request.setRequestHeader("Content-type", "application/vnd.github.v3+json", true);

        request.send();
    }

    // Called from getResponseFromGitHub() //
    parseResponseJSON(response)
    {
      console.debug("parseResponseJSON()");

      var repositoriesArray = [];

      var repositoriesArraySize = response.length;

      this.setState({repositoriesArraySize: repositoriesArraySize});

      for (var i = 0; i < repositoriesArraySize; i++)
      {
        var repositoryName = response[i].full_name;

        var repositoryUrl = response[i].html_url;

        var repositoryDescription = response[i].description;

        repositoriesArray.push({name: repositoryName, url: repositoryUrl, desc: repositoryDescription});
      }

      this.setState({repositoriesArray: repositoriesArray});

      var pageNumber = this.state.pageNumber;

      this.showRepositoriesList(pageNumber);
    }

    // Called from getLinkFromResponseHeader()
    // getResponseFromGitHub ->
    getLinkFromResponseHeader(request)
    {
      var linkString = "Link";

      var link = request.getResponseHeader(linkString);

      var parsedLink = this.parseLink(link);

      return parsedLink;
    }

    // getResponseFromGitHub -> getLinkFromResponseHeader ->
    parseLink(link)
    {
      var parts = link.split(';');

      var linkUrl = parts.shift().replace(/[<>]/g, '');

      return linkUrl;
    }

    showRepositoriesList(pageNumber)
    {
      console.debug("showRepositoriesList()");

      var tempArray = [];

      var repositoriesArray = [];

      repositoriesArray = this.state.repositoriesArray;

      var recordsPerPage = this.state.recordsPerPage;

      for(var i = 0; i < recordsPerPage; i++)
      {
        var element = pageNumber + i;

        var repositoryName = repositoriesArray[element].name;

        var repositoryUrl = repositoriesArray[element].url;

        var repositoryDescription = repositoriesArray[element].desc;

        tempArray.push({name: repositoryName, url: repositoryUrl, desc: repositoryDescription});
      }
      this.setState({items: tempArray});
    }

    nextPage()
    {
      var fetchRepositoriesRequestCount = this.state.fetchRepositoriesRequestCount;

      if(fetchRepositoriesRequestCount == 0)
      {
        alert("You have to get repositories first!")
      }
      else
      {
        this.showNextPage();
      }
    }

    previousPage()
    {
      var fetchRepositoriesRequestCount = this.state.fetchRepositoriesRequestCount;

      if(fetchRepositoriesRequestCount == 0)
      {
        alert("You have to get repositories first!")
      }
      else
      {
        this.showPreviousPage();
      }
    }

    firstPage()
    {
      var fetchRepositoriesRequestCount = this.state.fetchRepositoriesRequestCount;

      if(fetchRepositoriesRequestCount == 0)
      {
        alert("You have to get repositories first!")
      }
      else
      {
        this.showFirstPage();
      }
    }

    showNextPage()
    {
      var pageNumber = this.state.pageNumber;

      var recordsPerPage = this.state.recordsPerPage;

      var repositoriesArraySize = this.state.repositoriesArraySize - recordsPerPage;

      if(pageNumber == repositoriesArraySize)
      {
        var url = this.getUrl();

        this.getResponseFromGitHub(url);

        this.setState({pageNumber: 0});
      }
      else
      {
        pageNumber = pageNumber + recordsPerPage;

        this.showRepositoriesList(pageNumber);

        this.setState({pageNumber: pageNumber});
      }
    }

    showPreviousPage()
    {
      var recordsPerPage = this.state.recordsPerPage;

      var pageNumber = this.state.pageNumber;

      pageNumber = pageNumber - recordsPerPage;

      if(pageNumber < 0)
      {
        var currentUrl = this.getCurrentUrl();

        var beginUrl = "https://api.github.com/repositories?since=0";

        if(currentUrl == beginUrl)
        {
          alert("There is no previus page")
        }
        else
        {
          var previousUrl = this.getPreviusUrl();

          var repositoriesArraySize = this.state.repositoriesArraySize;

          pageNumber = repositoriesArraySize - recordsPerPage;

          this.setState({pageNumber: pageNumber});

          this.getResponseFromGitHub(previousUrl);
        }


      }
      else
      {
        this.showRepositoriesList(pageNumber);

        this.setState({pageNumber: pageNumber});
      }
    }

    showFirstPage()
    {
      var url = "https://api.github.com/repositories?since=0";

      this.getResponseFromGitHub(url);
    }

    render()
    {
        return (
            <div>
                <button id="getRepositories" type="button" className="btn btn-primary btn-lg" onClick={this.getAllPublicReposFromGitHub}>Get all public repos from GitHub</button>
                <br />
                <div className="btn-group" role="group" aria-label="...">
                  <button type="button" className="btn btn-default" onClick={this.firstPage}>First</button>
                  <button type="button" className="btn btn-default" onClick={this.previousPage}>Previous</button>
                  <button type="button" className="btn btn-default" onClick={this.nextPage}>Next</button>
                </div>
                <div className="list-group">
                  {this.state.items.map((object, i) => <List key={i} name={object.name} url={object.url} desc={object.desc}/>)}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Main/>, document.getElementById("react"));
