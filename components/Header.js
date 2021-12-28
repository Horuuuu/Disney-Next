import Image from 'next/image';
import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  StarIcon,
} from '@heroicons/react/solid';

import { useRouter } from 'next/router';

function Header() {
  //hook de next
  const router = useRouter();

  return (
    //posicion del header fija,con top 0 | md=media tamaño tablet el padding crezca 12px
    <header className="sticky bg-[#040714] top-0 z-[1000] flex items-center px-10 md:px-12 h-[72px]">
      <Image
        src="/images/logo.svg"
        alt=""
        width={80}
        height={80}
        className="cursor-pointer"
        onClick={() => router.push('/')}
      />
      <div className="hidden ml-10 md:flex items-center space-x-6">
        <a className="header-link group ">
          <HomeIcon className="h-4" onClick={() => router.push('/')} />
          {/*icono de HOME*/}
          <span className="span">Inicio</span>
        </a>
        <a className="header-link group">
          <SearchIcon className="h-4" />
          <span className="span">Busqueda</span>
        </a>
        <a className="header-link group">
          <PlusIcon className="h-4" />
          <span className="span">Mi Lista</span>
        </a>
        <a className="header-link group">
          <StarIcon className="h-4" />
          <span className="span">Originales</span>
        </a>
        <a className="header-link group">
          <img src="/images/movie-icon.svg" alt="" className="h-5" />
          <span className="span">Peliculas</span>
        </a>
        <a className="header-link group">
          <img src="/images/series-icon.svg" alt="" className="h-5" />
          <span className="span">Series</span>
        </a>
      </div>

      <button className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-200">
        Ingresar
      </button>
    </header>
  );
}

export default Header;
