import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const updateNews = async () => {
        props.setProgress(10);
        setLoading(true);
        let data = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        );
        props.setProgress(45);
        let parsedData = await data.json();
        props.setProgress(75);

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    };
    useEffect(() => {
        document.title = `${capitalize(props.category)} - NewsMonkey`
        updateNews();
        // eslint-disable-next-line
    }, []);
    // const handlePrevious = async () => {
    //     setLoading(true);
    //     setPage(page - 1);
    //     updateNews();
    // }
    // const handleNext = async () => {
    //     if (page + 1 > Math.ceil(totalResults / props.pageSize)) {

    //     } else {
    //         setLoading(true);
    //         setPage(page + 1);
    //         updateNews();
    //     }
    // }
    const fetchMoreData = async () => {
        setLoading(true);
        let data = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        );
        setPage(page + 1);

        let parsedData = await data.json();

        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };
    return (
        <div>
            <h1
                className="text-center"
                style={{ marginTop: "90px", marginBottom: "1rem" }}
            >
                NewsMonkey - Top Headlines From {capitalize(props.category)}
            </h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row py-3">
                        {articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title}
                                        description={element.description}
                                        imgUrl={
                                            element.urlToImage
                                                ? element.urlToImage
                                                : "https://imgk.timesnownews.com/story/YouTube_IANS_2_4.jpg?tr=w-560,h-292,fo-top"
                                        }
                                        newsUrl={element.url}
                                        author={element.author ? element.author : "Unknown"}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
};

News.defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general",
};
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};
export default News;
