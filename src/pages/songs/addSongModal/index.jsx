import {FileInput, Label, TextInput} from 'flowbite-react';
import {SpotiModal} from '../../../components/modal';
import {useEffect, useState} from 'react';
import axiosService from '../../../services/axios-service';
import Select from 'react-tailwindcss-select';
import {useToastService} from '../../../services/toast-service';

export const AddSongModal = ({show, onClose, albums, artists}) => {
  const [song, setSong] = useState({
    title: '',
    album: null,
    genre: [],
    artists: [],
  });
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [songFile, setSongFile] = useState(null);
  const {addToast} = useToastService();

  const handleClose = (success = false) => {
    setSong({
      title: '',
      album: null,
      genre: [],
      artists: [],
    });
    setLoading(false);
    setThumbnail(null);
    onClose(success);
  };

  const handleSubmit = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('file', songFile);
    axiosService
      .post(`/medias`, formData)
      .then(({data}) => {
        // if (!thumbnail) {
        //   handleClose(true);
        //   return;
        // } else if (thumbnail && !songFile) {
        //   handleUploadThumbnail().then(() => {
        //     handleClose(true);
        //     addToast({
        //       title: 'Succès',
        //       message: 'Musique ajoutée avec succès',
        //       type: 'success',
        //     });
        //   });
        // } else if (!thumbnail && songFile) {
        //   handleUploadSong().then(() => {
        //     handleClose(true);
        //     addToast({
        //       title: 'Succès',
        //       message: 'Musique ajoutée avec succès',
        //       type: 'success',
        //     });
        //   });
        // } else if (thumbnail && songFile) {
        //   handleUploadThumbnail().then(() => {
        //     handleUploadSong().then(() => {
        //       handleClose(true);
        //       addToast({
        //         title: 'Succès',
        //         message: 'Musique ajoutée avec succès',
        //         type: 'success',
        //       });
        //     });
        //   });
        // }
      })
      .catch(error => {
        console.error(error);
        setLoading(false);

        addToast({
          title: 'Erreur',
          message: "Impossible d'ajouter la musique",
          type: 'error',
        });
      });
  };

  const handleUploadThumbnail = async () => {
    try {
      const formData = new FormData();
      formData.append('file', thumbnail);

      await axiosService.put(`/medias/thumbnail/${song._id}`, formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SpotiModal
      title="Ajouter une musique"
      confirm="Ajouter"
      show={show}
      onClose={() => handleClose()}
      onSubmit={() => handleSubmit()}
      loading={loading}>
      <div className="min-h-[50vh]">
        <div className="mb-4">
          <Label className="text-spotiblack">Nom de la musique</Label>
          <TextInput
            type="text"
            placeholder="Nom de la musique"
            className="mt-1"
            value={song.title}
            onChange={e => setSong({...song, title: e.target.value})}
          />
        </div>

        <div className="mb-4">
          <Label className="text-spotiblack">Image de la musique</Label>
          <FileInput
            placeholder="Lien de l'image de la musique"
            className="mt-1"
            onChange={e => setThumbnail(e.target.files[0])}
          />

          {thumbnail && (
            <img
              className="mt-2 h-20 w-20"
              src={
                typeof thumbnail == 'string'
                  ? thumbnail
                  : URL.createObjectURL(thumbnail)
              }
            />
          )}
        </div>

        <div className="mb-4">
          <Label className="text-spotiblack">Lien de la musique</Label>
          <FileInput
            placeholder="Lien de la musique"
            className="mt-1"
            onChange={e => setSongFile(e.target.files[0])}
          />

          {songFile && (
            <audio className="mt-2" controls>
              <source
                src={
                  typeof songFile == 'string'
                    ? songFile
                    : URL.createObjectURL(songFile)
                }
              />
            </audio>
          )}
        </div>

        <div className="mb-4">
          <Label className="text-spotiblack">Artistes</Label>
          <Select
            isSearchable={true}
            isClearable={true}
            isMultiple={true}
            placeholder="Artistes de la musique"
            className="mt-1"
            value={song.artists?.map(album => ({
              value: album._id,
              label: album.name,
            }))}
            onChange={e =>
              setSong({
                ...song,
                artists: e.map(album => ({
                  ...album,
                  _id: album.value,
                  name: album.label,
                })),
              })
            }
            options={artists || []}
          />
        </div>

        <div className="mb-4">
          <Label className="text-spotiblack">Album</Label>
          <Select
            placeholder="Album de la musique"
            className="mt-1"
            isSearchable={true}
            isClearable={true}
            value={{
              value: song.album?._id,
              label: song.album?.name,
            }}
            onChange={e =>
              setSong({
                ...song,
                album: {...e, _id: e.value, name: e.label},
              })
            }
            options={albums || []}
          />
        </div>

        <div className="mb-4">
          <Label className="text-spotiblack">Genres</Label>
          <TextInput
            type="text"
            placeholder="Genres de la musique (séparés par des virgules)"
            className="mt-1"
            value={song.genre.join(',')}
            onChange={e => setSong({...song, genre: e.target.value.split(',')})}
          />
        </div>
      </div>
    </SpotiModal>
  );
};
