import {Tooltip} from 'flowbite-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import stats from './../../data/stats.json';
import {useEffect, useState} from 'react';

export const HomePage = () => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [listenings, setListenings] = useState([]);

  useEffect(() => {
    setAlbums(stats.data.albums);

    setSongs(stats.data.songs);

    setListenings(stats.data.listenings);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold">
        Bienvenue sur le backoffice de l'application Spotifaky
      </h1>

      <h2 className="text-xl font-semibold"></h2>

      <div id="totals" className="mt-4">
        <div className="flex gap-10">
          <div>
            <h4 className="text-lg font-semibold">Nombre total d'albums</h4>
            <p>
              {stats.data.albums
                .reduce((acc, album) => acc + album.value, 0)
                .toLocaleString()}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Nombre total de musiques</h4>
            <p>
              {stats.data.songs
                .reduce((acc, song) => acc + song.value, 0)
                .toLocaleString()}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Nombre total d'écoutes</h4>
            <p>
              {stats.data.listenings
                .reduce((acc, listening) => acc + listening.value, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div id="albums" className="mt-4">
        <h3 className="text-lg font-semibold mb-4">
          Nombre d'albums ajoutés par mois
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={400}
            data={albums}
            margin={{
              left: 10,
            }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--spotigreen)"
              fill="var(--spotigreen)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div id="songs" className="mt-4">
        <h3 className="text-lg font-semibold mb-4">
          Nombre de musiques ajoutées par mois
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={400}
            data={songs}
            margin={{
              left: 10,
            }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--spotigreen)"
              fill="var(--spotigreen)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div id="listenings" className="mt-4">
        <h3 className="text-lg font-semibold mb-4">
          Nombre d'écoutes par mois
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={listenings}
            margin={{
              left: 10,
            }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              connectNulls
              type="monotone"
              dataKey="value"
              stroke="var(--spotigreen)"
              fill="var(--spotigreen)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
