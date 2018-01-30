import React, { Component } from 'react';
import Hero from '../../components/Hero/'
import Categories from '../../components/Categories/'
import Blog from '../../components/Blog/'
import { getAllContents } from '../../api/APIClient'

class Main extends Component {
  render() {
    return (
      <div>
        <Hero/>
        <Categories/>
        <Blog/>
      </div>
    )
  }
}

export default Main
