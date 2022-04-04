import React from 'react';
import ArticleHome from './ArticleHome/ArticleHome';
import ImageHome from './ImageHome/ImageHome';
import './Home.scss';

const Home = () => {
  return (
    <main className='home'>
      <ImageHome />
      <ArticleHome />
    </main>
  );
};

export default Home;