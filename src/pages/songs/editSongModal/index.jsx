import {FileInput, Label, TextInput} from 'flowbite-react';
import {SpotiModal} from '../../../components/modal';
import {useEffect, useState} from 'react';
import axiosService from '../../../services/axios-service';
import Select from 'react-tailwindcss-select';
import {useToastService} from '../../../services/toast-service';

export const EditSongModal = ({show, onClose, song, albums, artists}) => {
  const [newSong, setNewSong] = useState(song);
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [songLink, setSongLink] = useState(null);
  const {addToast} = useToastService();

  useEffect(() => {
    setNewSong(song);
    setThumbnail(song?.thumbnail);
    setSongLink(song?.storage);
  }, [show]);

  const handleClose = (success = false) => {
    setNewSong(null);
    setLoading(false);
    setThumbnail(null);
    onClose(success);
  };

  const handleSubmit = () => {
    setLoading(true);

    axiosService
      .put(`/medias/${newSong._id}`, {
        title: newSong.title,
        album: newSong.album?._id,
        genre: newSong.genre,
        artist: newSong.artist?.map(artist => artist._id),
      })
      .then(({data}) => {
        const hasNewThumbnail = typeof thumbnail != 'string';
        const hasNewSong = typeof songLink != 'string';
        if (!hasNewThumbnail && !hasNewSong) {
          handleClose(true);
          return;
        } else if (hasNewThumbnail && !hasNewSong) {
          handleUploadThumbnail().then(() => {
            handleClose(true);
            addToast({
              title: 'Succès',
              message: 'Musique modifiée avec succès',
              type: 'success',
            });
          });
        } else if (!hasNewThumbnail && hasNewSong) {
          handleUploadSong().then(() => {
            handleClose(true);
            addToast({
              title: 'Succès',
              message: 'Musique modifiée avec succès',
              type: 'success',
            });
          });
        } else if (hasNewThumbnail && hasNewSong) {
          handleUploadThumbnail().then(() => {
            handleUploadSong().then(() => {
              handleClose(true);
              addToast({
                title: 'Succès',
                message: 'Musique modifiée avec succès',
                type: 'success',
              });
            });
          });
        }
      })
      .catch(error => {
        console.error(error);
        setLoading(false);

        addToast({
          title: 'Erreur',
          message: 'Impossible de modifier la musique',
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

  const handleUploadSong = async () => {
    try {
      const formData = new FormData();
      formData.append('file', songLink);

      await axiosService.put(`/medias/song/${song._id}`, formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SpotiModal
      title="Modifier une musique"
      confirm="Modifier"
      show={show}
      onClose={() => handleClose()}
      onSubmit={() => handleSubmit()}
      loading={loading}>
      {!!newSong ? (
        <div className="min-h-[50vh]">
          <div className="mb-4">
            <Label className="text-spotiblack">Nom de la musique</Label>
            <TextInput
              type="text"
              placeholder="Nom de la musique"
              className="mt-1"
              value={newSong.title}
              onChange={e => setNewSong({...newSong, title: e.target.value})}
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
              onChange={e => setSongLink(e.target.files[0])}
            />

            {songLink && (
              <audio className="mt-2" controls>
                <source
                  src={
                    typeof songLink == 'string'
                      ? songLink
                      : URL.createObjectURL(songLink)
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
              value={newSong.artist?.map(album => ({
                value: album._id,
                label: album.name,
              }))}
              onChange={e =>
                setNewSong({
                  ...newSong,
                  artist: e.map(album => ({
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
                value: newSong.album?._id,
                label: newSong.album?.name,
              }}
              onChange={e =>
                setNewSong({
                  ...newSong,
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
              value={newSong.genre.join(',')}
              onChange={e =>
                setNewSong({...newSong, genre: e.target.value.split(',')})
              }
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </SpotiModal>
  );
};
