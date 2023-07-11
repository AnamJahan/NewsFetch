import './App.css';
import NavBar from  './components/NavBar';

import React, { Component } from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
export default class App extends Component {
  pageSize = 15;
  // apiKey=process.env.REACT_APP_NEWS_API;
  state ={
    progress:0
  }
  setProgress = (progress) =>{
    this.setState({ progress: progress})
  }
  // render() {
  //   return (
  //     <div>
  //       <Route>
  //        <NavBar />
  //        <Switch>
  //         <Route path="/">
  //        <News setProgress={this.setProgress}  setProgress={this.setProgress}  setProgress={setProgress}  setPregress={setProgress}  pageSize={this.pageSize} country="in" category='general'/>
  //         </Route>
  //       </Switch>
  //        </Route>
  //     </div>
  //   )
  // }
  render() {
    return (
      <div>
        <Router>
          <NavBar /><LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
          <Routes>
            <Route exact path='/' element={<News setProgress={this.setProgress}  key='general' pageSize={this.pageSize} country='us' category='general' />}></Route>
            <Route exact path='/business' element={<News setProgress={this.setProgress}  key='business' pageSize={this.pageSize} country='us' category='business' />}></Route>
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress}   key='entertainment' pageSize={this.pageSize} country='us' category='entertainment' />}></Route>
            <Route exact path='/health' element={<News setProgress={this.setProgress}     key='health' pageSize={this.pageSize} country='us' category='health' />}></Route>
            <Route exact path='/science' element={<News setProgress={this.setProgress}  key='science' pageSize={this.pageSize} country='us' category='science' />}></Route>
            <Route exact path='/sports' element={<News setProgress={this.setProgress}    key='sports' pageSize={this.pageSize} country='us' category='sports' />}></Route>
            <Route exact path='/technology' element={<News setProgress={this.setProgress}   key='technology' pageSize={this.pageSize} country='us' category='technology' />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}
