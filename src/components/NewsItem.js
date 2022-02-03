import React, { Component } from 'react';

export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl, author, date, source } = this.props;

        return <div>
            <div className="card" style={{ width: "100%" }}>
                <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%",zindex:1}}>
                    {source}
                </span>
                <img src={imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p class="card-text"><small class="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
                </div>
            </div>

        </div>;
    }
}

export default NewsItem;
