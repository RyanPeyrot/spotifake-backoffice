import {SpotiModal} from '../../../components/modal';
import {useState} from 'react';
import axiosService from '../../../services/axios-service';
import {useToastService} from '../../../services/toast-service';

export const DeletePlaylistModal = ({show, onClose, playlists}) => {
  const [loading, setLoading] = useState(false);

  const {addToast} = useToastService();

  const handleClose = (success = false) => {
    setLoading(false);
    onClose(success);
  };

  const handleDelete = async () => {
    setLoading(true);

    await Promise.all(
      playlists.map(playlist => axiosService.delete(`/playlists/${playlist}`)),
    )
      .then(() => {
        handleClose(true);
        addToast({
          type: 'success',
          message: 'Playlists supprimés avec succès',
          title: 'Succès',
        });
      })
      .catch(error => {
        console.error(error);
        setLoading(false);

        addToast({
          type: 'error',
          message:
            'Une erreur est survenue lors de la suppression des playlists/albums',
          title: 'Erreur',
        });
      });
  };

  return (
    <SpotiModal
      title="Supprimer"
      confirm="Supprimer"
      show={show}
      onClose={() => handleClose()}
      onSubmit={() => handleDelete()}
      loading={loading}>
      <p>Voulez-vous vraiment supprimer les playlists/albums sélectionnés ?</p>
    </SpotiModal>
  );
};
