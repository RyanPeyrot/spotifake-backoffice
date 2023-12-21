import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {LoginPage} from './pages/login';
import {HomePage} from './pages/home';
import {Flowbite} from 'flowbite-react';
import {ToastServiceProvider} from './services/toast-service';
import ToastContainer from './components/spotiToastContainer';
import {ConfettisServiceProvider} from './services/confettis-service';
import ConfettisContainer from './components/confettisContainer';
import {SpotiSidebar} from './components/sidebar';
import {PlaylistsPage} from './pages/playlists';
import {SongsPage} from './pages/songs';
import {ArtistsPage} from './pages/artists';
import {useState} from 'react';

const buttonSpotigreen =
  'bg-spotigreen text-spotiblack focus:!ring-0 active:opacity-80';

const spotifakeTheme = {
  button: {
    color: {
      // info is default color for Flowbite's Button component, don't know why
      info: buttonSpotigreen,
      spotiwhite: 'bg-spotiwhite text-spotiblack focus:!ring-0',
      spotiblack: 'bg-spotiblack text-spotiwhite border focus:!ring-0',
      spotigreen: buttonSpotigreen,
      danger: 'bg-red-800 text-spotiblack focus:!ring-0',
    },
  },
  label: {
    root: {
      colors: {
        default: 'text-white dark:text-white mb-1 block',
      },
    },
  },
  sidebar: {
    root: {
      colors: {
        default: 'bg-spotiblack text-spotiwhite',
      },
    },
    item: {
      colors: {
        default: 'text-spotiwhite',
        active: 'text-spotigreen',
      },
    },
  },
  table: {
    root: {
      wrapper: 'overflow-x-auto relative',
      base: 'text-left text-sm text-spotiwhite rounded-lg overflow-hidden',
    },
    head: {
      cell: {
        base: 'bg-spotiblack text-spotiwhite px-6 py-3',
      },
    },
    row: {
      base: 'text-spotiblack bg-white',
    },
  },
};

const App = () => {
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  const onSidebarStateChange = value => {
    setCollapsedSidebar(value);
  };

  return (
    <Flowbite theme={{theme: spotifakeTheme}}>
      <div
        id="spotifake-app"
        className={`min-h-screen w-[calc(100% - 288px - 24px)] h-100 bg-spotiblack text-spotiwhite duration-300 p-6 ${
          collapsedSidebar ? 'ml-20' : 'ml-72'
        } `}>
        <ToastServiceProvider>
          <ConfettisServiceProvider>
            <Router>
              <SpotiSidebar
                sidebarStateChanged={value => onSidebarStateChange(value)}
              />
              <Routes>
                <Route exact path="/" element={<LoginPage></LoginPage>} />
                <Route path="/home" element={<HomePage></HomePage>} />
                <Route path="/login" element={<LoginPage></LoginPage>} />
                <Route
                  path="/playlists"
                  element={<PlaylistsPage></PlaylistsPage>}
                />
                <Route path="/artists" element={<ArtistsPage></ArtistsPage>} />
                <Route path="/songs" element={<SongsPage></SongsPage>} />
              </Routes>
            </Router>
            <ConfettisContainer />
          </ConfettisServiceProvider>
          <ToastContainer />
        </ToastServiceProvider>
      </div>
    </Flowbite>
  );
};

export default App;
