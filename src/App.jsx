import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import {Flowbite} from 'flowbite-react';
import {ToastServiceProvider} from './services/toast-service';
import ToastContainer from './components/spotiToastContainer';
import {ConfettisServiceProvider} from './services/confettis-service';
import ConfettisContainer from './components/confettisContainer';
import {SpotiSidebar} from './components/sidebar';
import {Playlists} from './pages/playlists';

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
};

const App = () => {
  return (
    <Flowbite theme={{theme: spotifakeTheme}}>
      <div
        id="spotifake-app"
        className="min-h-screen w-screen w-100 h-100 bg-spotiblack text-spotiwhite ml-72 p-6">
        <ToastServiceProvider>
          <ConfettisServiceProvider>
            <Router>
              <SpotiSidebar />
              <Routes>
                <Route exact path="/" element={<Home></Home>} />
                <Route path="/home" element={<Home></Home>} />
                <Route path="/login" element={<Login></Login>} />
                <Route path="/playlists" element={<Playlists></Playlists>} />
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
