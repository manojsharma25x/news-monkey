import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 12,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props) {
        super(props);
        console.log("first");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            


        }
        
        document.title=`${this.capitalize(this.props.category)} - NewsMonkey`

        
    }
    capitalize = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    updateNews = async () => {
        this.setState({ loading: true })
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af9c5e9a47404860b2369577054801b5&page=${this.state.page}&pageSize=${this.props.pageSize}`);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    }
    async componentDidMount() {

        this.updateNews();
    }

    handlePrevious = async () => {
        console.log("prev");

        this.setState(
            { loading: false, page: this.state.page - 1 }
        )
        this.updateNews();
    }
    handleNext = async () => {
        console.log("nxt");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        } else {
            this.setState(
                { loading: true, page: this.state.page + 1 }
            )

            this.updateNews();

        }





    }
    render() {


        return <div>
            <div className="container my-3">
                <h1 className='text-center'>NewsMonkey - Top headlines from {this.capitalize(this.props.category)}</h1>
                {this.state.loading && <Spinner />}
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrevious} className="btn btn-dark"> &#8592; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNext} className="btn btn-dark">Next &#8594; </button>

                </div>
                <div className="row py-3">
                    {
                        !this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage ? element.urlToImage : "https://imgk.timesnownews.com/story/YouTube_IANS_2_4.jpg?tr=w-560,h-292,fo-top"} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                            </div>

                        })
                    }

                </div>
            </div>
            <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrevious} className="btn btn-dark"> &#8592; Previous</button>
                <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNext} className="btn btn-dark">Next &#8594; </button>

            </div>
        </div>;
    }
}

export default News;
