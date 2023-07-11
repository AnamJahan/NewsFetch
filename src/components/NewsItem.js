import React, { Component } from 'react'

export default class NewsItem extends Component {
   
  render() {
    let {title , description , imageUrl , url  , author , date , source} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{
            display:'flex' ,
            position:'absolute' ,
            justifyContent:'flex-end',
            right:0
          }

          }>
        <span className=' badge rounded-pill bg-danger'>{source}</span>
          </div>
  <img src={!imageUrl?"https://image.cnbcfm.com/api/v1/image/107179018-1673884197059-gettyimages-1246271143-DAVOS_WEF_2023.jpeg?v=1673934170&w=1920&h=1080":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p class="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
  }
}
