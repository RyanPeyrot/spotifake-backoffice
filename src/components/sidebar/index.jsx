import {Sidebar} from 'flowbite-react';
import {
  ArrowLeftOnRectangleIcon,
  HomeModernIcon,
  ListBulletIcon,
  MusicalNoteIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import {useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';

export const SpotiSidebar = () => {
  const location = useLocation();

  if (location.pathname === '/login') {
    return null;
  }

  return (
    <Sidebar
      className="h-screen w-72 p-6 bg-black fixed top-0 left-0 z-40"
      theme={{
        root: {
          inner: 'bg-black',
        },
        logo: {
          base: 'text-spotiwhite',
        },
      }}
      aria-label="Default sidebar example">
      <Sidebar.Logo
        href="#"
        img="/assets/logo/spotify.png"
        imgAlt="Spotifake logo">
        Spotifake
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            as={Link}
            theme={{
              base: 'flex items-center justify-center rounded-lg p-2 text-base font-normal text-spotiwhite hover:bg-spotiwhite hover:text-spotiblack',
              icon: {
                base: 'w-6 h-6',
              },
            }}
            href="#"
            to="/home"
            icon={HomeModernIcon}>
            Accueil
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            theme={{
              base: 'flex items-center justify-center rounded-lg p-2 text-base font-normal text-spotiwhite hover:bg-spotiwhite hover:text-spotiblack',
              icon: {
                base: 'w-6 h-6',
              },
            }}
            href="#"
            to="/playlists"
            icon={ListBulletIcon}>
            <Link to={'/playlists'}>Playlists</Link>
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            theme={{
              base: 'flex items-center justify-center rounded-lg p-2 text-base font-normal text-spotiwhite hover:bg-spotiwhite hover:text-spotiblack',
              icon: {
                base: 'w-6 h-6',
              },
            }}
            to="/users"
            href="#"
            icon={UserIcon}>
            Utilisateurs
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            theme={{
              base: 'flex items-center justify-center rounded-lg p-2 text-base font-normal text-spotiwhite hover:bg-spotiwhite hover:text-spotiblack',
              icon: {
                base: 'w-6 h-6',
              },
            }}
            href="#"
            to="/songs"
            icon={MusicalNoteIcon}>
            Musiques
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            theme={{
              base: 'flex items-center justify-center rounded-lg p-2 text-base font-normal text-spotiwhite hover:bg-spotiwhite hover:text-spotiblack',
              icon: {
                base: 'w-6 h-6',
              },
            }}
            href="#"
            to="/login"
            icon={ArrowLeftOnRectangleIcon}>
            Déconnexion
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
