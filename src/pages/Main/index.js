import React, { Component } from 'react';
import Hero from '../../containers/Hero/'
import Categories from '../../containers/Categories/'
import Blog from '../../containers/Blog/'
import Footer from '../../components/Footer/'
import { getAllContents } from '../../api/APIClient'

class Main extends Component {
  render() {
    return (
      <div>
        <Hero />
        <Categories />
        <Blog />
        <Footer />
      </div>
    )
  }
}

export default Main
