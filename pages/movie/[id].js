//Pagina individual de la pelicula
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../../components/Header';
import { PlusIcon, XIcon } from '@heroicons/react/solid';
import ReactPlayer from 'react-player/lazy';

function Movie({ result }) {
  const BASE_URL = 'https://image.tmdb.org/t/p/original/';
  const router = useRouter();
  const [showPlayer, setShowPlayer] = useState(false); //estado del reproductor del trailer
  //busca un elemento igual al trailer
  const index = result.videos.results.findIndex(
    //results es un arreglo y es element ,que busca coincidencia
    (element) => element.type === 'Trailer'
  );

  return (
    <div className="relative">
      <Head>
        <title>{result.title || result.original_name}</title>
        {/*para que se muestre en nombre en la barra superior */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="relative z-50">
        <div className="relative min-h-[calc(100vh-72px)]">
          <Image
            src={
              `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
              `${BASE_URL}${result.poster_path}`
            }
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/*div que contiene la info(titulo,descripcion,imagen) de la pelicula */}
        {/*la posicion inset para que este dentro de la imagen  */}
        <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {result.title || result.original_name}
          </h1>
          <div className="flex items-center space-x-3 md:space-x-5">
            <button className="text-xs md:text-base bg-[#f9f9f9] text-black flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]">
              <img
                src="/images/play-icon-black.svg"
                alt=""
                className="h-6 md:h-8"
              />
              <span className="uppercase font-medium tracking-wide">Play</span>
            </button>

            <button
              className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
              onClick={() => setShowPlayer(true)} //cambia el estado inicial y se muestra el reproductor
            >
              <img
                src="/images/play-icon-white.svg"
                alt=""
                className="h-6 md:h-8"
              />
              <span className="uppercase font-medium tracking-wide">
                Trailer
              </span>
            </button>

            <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
              <PlusIcon className="h-6" />
              {/*icono de + */}
            </div>

            <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
              <img src="/images/group-icon.svg" alt="" /> {/*icono de grupo */}
            </div>
          </div>
          {/*detalles de la pelicula */}
          <p className="text-xs md:text-sm">
            {result.release_date || result.first_air_date} •{' '}
            {/*operacion para calcular el tiempo de duracion de la pelicula en horas (h)y minutos(m) */}
            {Math.floor(result.runtime / 60)}h {result.runtime % 60}m •{' '}
            {/*mapea todos los generos y retorna el corespondiente */}
            {result.genres.map((genre) => genre.name + ' ')}{' '}
          </p>
          {/*sinopsis de la pelicula */}
          <h4 className="text-sm md:text-lg max-w-4xl">{result.overview}</h4>
        </div>

        {/* para que el background se oscurezca cuando abre el reproductor del trailer */}
        {showPlayer && (
          <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50"></div>
        )}
        {/*para que se oscurezca solo el bg y no el reproductor */}
        <div
          className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
            showPlayer ? 'opacity-100 z-50' : 'opacity-0'
          }`}
        >
          {/*ventana del reproductor del trailer */}
          <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
            <span className="font-semibold">Play Trailer</span>
            <div
              className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
              onClick={() => setShowPlayer(false)}
            >
              <XIcon className="h-5" />
              {/*X de la esquina superior */}
            </div>
          </div>
          <div className="relative pt-[56.25%]">
            {/*para que sea responsivo,ver docs */}
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${result.videos?.results[index]?.key}`}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: '0', left: '0' }}
              controls={true}
              playing={showPlayer}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Movie;

export async function getServerSideProps(context) {
  //context es un objeto
  const { id } = context.query; //recibe el id de la bd
  //peticion para obtener una pelicula en particular a travez del id
  const request = await fetch(
    //apend request pide info y video a la vez
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos`
  ).then((response) => response.json());

  return {
    props: {
      //detalles de la pelicula
      result: request,
    },
  };
}
