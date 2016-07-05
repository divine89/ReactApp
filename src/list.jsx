import React from 'react';

export default class List extends React.Component
{
    constructor()
    {
        super();
    }
    render()
    {
        return (
          <a href={this.props.url} className="list-group-item">
            <h3>{this.props.name}</h3>
            <p>{this.props.desc}</p>
          </a>
        );
    }
}
