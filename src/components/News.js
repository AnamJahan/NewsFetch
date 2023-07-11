import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
     country:'in' ,
     pageSize:9,
     category:'general'
  }
  static propTypes = {
    country:PropTypes.string ,
    pageSize:PropTypes.number ,
    category:PropTypes.string 
  }
  capitalizeFirstLetter = (string)=>{
     return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("Hello I am a constructor");
    this.state = {
      articles: [],
      loading: true,
      page:1,
      totalResults:0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsFetch`;
  }
   async updateNews(pageNo){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6fd6338604f74c418ffe7dee7c6fde5a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    this.props.setProgress(30);
    let data = await fetch(url);
    this.props.setProgress(70);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({articles : parseData.articles , 
      totalResults : parseData.totalResults,
    loading : false}) 
    this.props.setProgress(100);
   }
  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6fd6338604f74c418ffe7dee7c6fde5a&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({articles : parseData.articles , 
    //   totalResults : parseData.totalResults,
    // loading : false})
    this.updateNews();
  }
  handlePrevClick = async()=>{
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6fd6338604f74c418ffe7dee7c6fde5a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({
    //     page:this.state.page - 1 ,
    //     articles : parseData.articles,
    //     loading:false
    // })
    this.setState({page:this.state.page - 1})
  this.updateNews();
  }
  handleNextClick = async ()=>{
    // if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))
    // {

    // }
    // else
    // {
    // console.log("Next");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6fd6338604f74c418ffe7dee7c6fde5a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parseData = await data.json()
    // // console.log(parseData);
    // this.setState({
    //     page:this.state.page + 1 ,
    //     articles : parseData.articles,
    //     loading:false
    // })
  // }
  this.setState({page:this.state.page + 1})
  this.updateNews();
  }
  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6fd6338604f74c418ffe7dee7c6fde5a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({articles : this.state.articles.concat(parseData.articles), 
      totalResults : parseData.totalResults,
    loading : false}) 
  };
  render() {
    return (
      <div className="container">
        <h1 class="text-center" style={{margin:'35px 0px' , marginTop:'90px'}}>NewsFetch - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==  this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {/* {!this.state.loading && this.state.articles.map((element) => { */}
          {this.state.articles.map((element) => {
          return  <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title?element.title:""}
                description={element.description?element.description:""}
                imageUrl={element.urlToImage}
                url={element.url}
                author={element.author}
                date={element.publishedAt}
                source ={element.source.name}
              />
            </div>;
          })}
        </div>
        </div>

          </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button"  class="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr;</button>
        </div> */}
      </div>
    );
  }
}
