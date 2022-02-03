import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

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
            totalResults: 0



        }

        document.title = `${this.capitalize(this.props.category)} - NewsMonkey`


    }
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    updateNews = async () => {
        this.props.setProgress(10);
        this.setState({ loading: true })
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`);
        this.props.setProgress(45);
        let parsedData = await data.json();
        this.props.setProgress(75);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
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
    fetchMoreData = async () => {
        this.setState(
            {page: this.state.page + 1 }
        )
        this.setState({ loading: true })
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`);
        let parsedData = await data.json();
        this.setState({
             articles: this.state.articles.concat(parsedData.articles), 
             totalResults: parsedData.totalResults, 
             loading: false })

      };
    render() {


        return <div>
                <h1 className='text-center my-3'>NewsMonkey - Top Headlines From {this.capitalize(this.props.category)}</h1>
                {this.state.loading && <Spinner />}
                
                <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner/>}
                    >
                        <div className="container">

                     
                <div className="row py-3">
                    

                        {
                            this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage ? element.urlToImage : "https://imgk.timesnownews.com/story/YouTube_IANS_2_4.jpg?tr=w-560,h-292,fo-top"} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                                </div>

                            })
                        }
                </div>
                </div>
                    </InfiniteScroll>
            
        </div>;
    }
}

export default News;
