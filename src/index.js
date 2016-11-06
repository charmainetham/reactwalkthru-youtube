import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar.js';
import VideoList from './components/video_list.js'
import VideoDetail from './components/video_detail.js'

const API_KEY = 'AIzaSyBFuRiHesnjchHgvGZ5rWkRmHy8F8QmOd0'

// Create a new component
//this component should produce html
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos: [], 
      selectedVideo: null
    };
    this.videoSearch('fox')
  }

  videoSearch (term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
     this.setState({
      videos: videos,
      selectedVideo: videos[0]
      })
    })
  }
  render () {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)
    return  <div> 
      <SearchBar onSearchTermChange={videoSearch}/>  
      <VideoDetail video ={this.state.selectedVideo}/>
      <VideoList 
      onVideoSelect = { selectedVideo => this.setState({selectedVideo})}
      videos = {this.state.videos}/>
    </div>
  }
};


//Take these components(generated html) and put this in the page

ReactDOM.render(<App />, document.querySelector('.container'))