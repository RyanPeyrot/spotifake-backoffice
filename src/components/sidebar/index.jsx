import {Sidebar} from 'flowbite-react';
import {
  ArrowLeftOnRectangleIcon,
  HomeModernIcon,
  ListBulletIcon,
  MusicalNoteIcon,
  UserIcon,
  Bars3Icon,
} from '@heroicons/react/24/solid';
import {useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';

export const SpotiSidebar = ({sidebarStateChanged}) => {
  const location = useLocation();
  const localStorageSidebarState = localStorage.getItem('sidebar-collapsed');
  const [collapsed, setCollapsed] = useState(
    localStorageSidebarState ? localStorageSidebarState === 'true' : false,
  );

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', collapsed);
    sidebarStateChanged?.(collapsed);
  }, [collapsed]);

  if (location.pathname === '/login' || location.pathname === '/') {
    return null;
  }

  const sidebarItemTheme = {
    base: `${
      collapsed ? 'flex w-10 justify-left -ml-2' : 'justify-center'
    } p-2 flex items-center rounded-lg text-base font-normal text-spotiwhite hover:bg-spotiwhite hover:text-spotiblack`,
    icon: {
      base: `${collapsed ? 'min-w-[24px]' : null} w-6 h-6`,
    },
  };

  return (
    <Sidebar
      className={`duration-300 h-screen p-6 bg-black fixed top-0 left-0 z-40 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
      theme={{
        root: {
          inner: 'bg-black',
        },
        logo: {
          base: 'text-spotiwhite',
        },
      }}
      aria-label="Default sidebar example">
      <div
        className={`flex w-60 items-center justify-between mb-5 duration-300 ${
          collapsed ? '-translate-x-[217px]' : null
        }`}>
        <Sidebar.Logo
          className="mb-0"
          href="#"
          img="/assets/logo/spotify.png"
          imgAlt="Spotifake logo">
          Spotifake
        </Sidebar.Logo>

        <button onClick={() => setCollapsed(!collapsed)}>
          <Bars3Icon className="w-6 h-6 text-spotiwhite" />
        </button>
      </div>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            as={Link}
            theme={sidebarItemTheme}
            href="#"
            to="/home"
            icon={HomeModernIcon}>
            <span className={`${collapsed ? 'hidden' : 'opacity-100'}`}>
              Accueil
            </span>
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            theme={sidebarItemTheme}
            href="#"
            to="/playlists"
            icon={ListBulletIcon}>
            <span className={`${collapsed ? 'hidden' : 'opacity-100'}`}>
              Playlists
            </span>
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            theme={sidebarItemTheme}
            to="/artists"
            href="#"
            icon={UserIcon}>
            <span className={`${collapsed ? 'hidden' : 'opacity-100'}`}>
              Artistes
            </span>
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            theme={sidebarItemTheme}
            href="#"
            to="/songs"
            icon={MusicalNoteIcon}>
            <span className={`${collapsed ? 'hidden' : 'opacity-100'}`}>
              Musiques
            </span>
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            theme={sidebarItemTheme}
            href="#"
            to="/login"
            icon={ArrowLeftOnRectangleIcon}>
            <span className={`${collapsed ? 'hidden' : 'opacity-100'}`}>
              Déconnexion
            </span>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
