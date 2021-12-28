import Head from 'next/head';
import Brands from '../components/Brands';
import MoviesCollection from '../components/MoviesCollection';
import Header from '../components/Header';

import Slider from '../components/Slider';
import ShowsCollection from '../components/ShowsCollection';

export default function Home({
  popularMovies, //props
  popularShows,
  top_ratedMovies,
  top_ratedShows,
}) {
  //const [session] = useSession();

  return (
    <div>
      <Head>
        <title>Disney+ | Next Tailwind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/*bg-home imagen en tailwind.config*/}
      {/*un div dentro del main | after-z negativo para que esté la img debajo del contenido */}
      <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
        <Slider />
        <Brands />
        <MoviesCollection results={popularMovies} title="Peliculas populares" />
        <ShowsCollection results={popularShows} title="Series populares" />
        <MoviesCollection
          results={top_ratedMovies}
          title="Peliculas principales"
        />
        <ShowsCollection results={top_ratedShows} title="Shows más valorados" />
      </main>
    </div>
  );
}
//solo se puede usar en el index o en otras paginas, no en componentes
//funcion que preconstruye al cargar
export async function getServerSideProps(context) {
  const [
    //peliculas y shows de la bd
    popularMoviesRes,
    popularShowsRes,
    top_ratedMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
  ]);
  const [popularMovies, popularShows, top_ratedMovies, top_ratedShows] =
    await Promise.all([
      //espera la respuesta de todas las promesas
      popularMoviesRes.json(),
      popularShowsRes.json(),
      top_ratedMoviesRes.json(),
      top_ratedShowsRes.json(),
    ]);
  //se retorna props,se pueden usar en el componente
  return {
    props: {
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
    },
  };
}
