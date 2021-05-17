import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header/';

  export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null)
    const [blackHeader, setblackHeader] = useState(false);

    useEffect(()=>{
      const loadALL = async () => {
        // Pegando a lista total
        let list = await Tmdb.getHomeList();
          setMovieList(list);
        
          let originals = list.filter(i=>i.slug === 'originals');
          let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length-1)); 
          let chosen = originals[0].items.results[randomChosen]; 
          let choseninfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
          setFeaturedData(choseninfo);
      }

      loadALL();
    }, []);

      useEffect(()=>{
        const scrollListener = () => {
          if(window.scrollY > 10) {
            setblackHeader(true);
          } else {
            setblackHeader(false);
          }

        }
        
        window.addEventListener('scroll' , scrollListener);

        return() => {
          window.removeEventListener('scroll scrollListener');
        }

      }, [] );

    return (
      <div className="page">

        <Header black={blackHeader} />

            {featuredData &&
          <FeaturedMovie item={featuredData} />
        }
        
        <section className="lists">
          {movieList.map((item, key)=>(
            <MovieRow key={key} title={item.title} items={item.items}/>
          ))}
        </section>

        <footer>
            Feito com <span role="img" aria-label="coração"> ❤</span> Produzido por Vinicius Martins <br/>
            Direitos de imagem para Netflix <br/>
            Dados pegos do site Themoviedb.org<br/>

        </footer>

        <div className="loanding">
          


        </div>
      </div>
    );
  }