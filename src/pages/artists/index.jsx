import {Checkbox, Table} from 'flowbite-react';
import {useEffect, useState} from 'react';

export const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectAll = () => {
    if (selectedArtists.length === artists.length) {
      setSelectedArtists([]);
    } else {
      setSelectedArtists(artists.map(artist => artist.id));
    }
  };

  const handleSelect = artistId => {
    if (selectedArtists.includes(artistId)) {
      setSelectedArtists(selectedArtists.filter(id => id !== artistId));
    } else {
      setSelectedArtists([...selectedArtists, artistId]);
    }
  };

  useEffect(() => {
    const fakeArtists = [
      {
        id: 1,
        name: 'Song 1',
        artist: ['Artist 1', 'Artist 2'],
        album: 'Album 1',
        release_date: '2021-06-01 12:00:00',
        thumbnail: 'https://via.placeholder.com/150',
        stocking_reference: 'ABCD1234',
      },
      {
        id: 2,
        name: 'Song 2',
        artist: ['Artist 1'],
        album: 'Album 2',
        release_date: '2021-06-01 12:00:00',
        thumbnail: 'https://via.placeholder.com/150',
        stocking_reference: 'ABCD1234',
      },
    ].map(artist => ({
      ...artist,
      tag: `ID${artist.id}-${artist.name}-${artist.artist.join('-')}-${
        artist.album
      }-${artist.release_date}-${artist.stocking_reference}`,
    }));

    setArtists(fakeArtists);
  }, []);

  const filteredArtists = artists.filter(artist =>
    artist.tag.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Liste des artistes</h1>

      <input
        type="text"
        placeholder="Rechercher un artiste"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mt-4 w-2/3 p-2 border border-gray-300 text-spotiblack rounded"
      />

      <Table className="mt-6">
        <Table.Head>
          <Table.HeadCell
            className="text-center"
            onClick={() => handleSelectAll()}>
            <Checkbox
              checked={selectedArtists.length === artists.length}></Checkbox>
          </Table.HeadCell>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Nom</Table.HeadCell>
          <Table.HeadCell>Artistes</Table.HeadCell>
          <Table.HeadCell>Ajoutée le</Table.HeadCell>
          <Table.HeadCell>Image (URL)</Table.HeadCell>
          <Table.HeadCell>Référence</Table.HeadCell>
        </Table.Head>

        <Table.Body>
          {filteredArtists.map(artist => (
            <Table.Row key={artist.id}>
              <Table.Cell>
                <Checkbox
                  checked={selectedArtists.includes(artist.id)}
                  onChange={() => handleSelect(artist.id)}></Checkbox>
              </Table.Cell>
              <Table.Cell>{artist.id}</Table.Cell>
              <Table.Cell>{artist.name}</Table.Cell>
              <Table.Cell>{artist.artist.join(', ')}</Table.Cell>
              <Table.Cell>
                {new Date(artist.release_date).toDateString()}
              </Table.Cell>
              <Table.Cell>
                <a
                  href={artist.thumbnail}
                  target="_blank"
                  className="text-spotigreen">
                  {artist.thumbnail}
                </a>
              </Table.Cell>
              <Table.Cell>{artist.stocking_reference}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
