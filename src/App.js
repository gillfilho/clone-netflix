import React, { useEffect, useState } from 'react'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import loading from './assets/loading.gif'
import './App.css';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect( () => {
    const loadAll = async () => {
      //pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegando o filme em destaque
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, [])

  useEffect( () => {
    const scrollListner = () => {
      if (window.scrollY > 100) {
        setBlackHeader(true)
      } else setBlackHeader(false)
    }

    window.addEventListener('scroll', scrollListner)

    return () => {
      window.removeEventListener('scroll', scrollListner)
    }

  }, [])
  
  return(

    <div className='page'>

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className='lists'>
        {movieList.map( (item, key) => (
          <MovieRow 
            key={key} 
            title={item.title} 
            items={item.items}
          />
          
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label='coração'>❤️</span>por Gilberto Ferreira Filho
        <br/>
        Direitos de imagem para Netflix
        <br/>
        As informações utilizadas são do site Themoviedb.org
      </footer>

      {movieList.length <=0 &&
              <div className='loading'>
              <img src={loading} alt="Carregando..." />
          </div>
      }


    </div>

  )

}

export default App;
