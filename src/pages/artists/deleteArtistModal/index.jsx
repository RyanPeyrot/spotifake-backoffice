import {SpotiModal} from '../../../components/modal';
import {useState} from 'react';
import axiosService from '../../../services/axios-service';
import {useToastService} from '../../../services/toast-service';

export const DeleteArtistModal = ({show, onClose, artists}) => {
  const [loading, setLoading] = useState(false);

  const {addToast} = useToastService();

  const handleClose = (success = false) => {
    setLoading(false);
    onClose(success);
  };

  const handleDelete = async () => {
    setLoading(true);

    await Promise.all(
      artists.map(artist => axiosService.delete(`/artists/${artist}`)),
    )
      .then(() => {
        handleClose(true);
        addToast({
          type: 'success',
          message: 'Artistes supprimés avec succès',
          title: 'Succès',
        });
      })
      .catch(error => {
        console.error(error);
        setLoading(false);

        addToast({
          type: 'error',
          message:
            'Une erreur est survenue lors de la suppression des artistes',
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
      <p>Voulez-vous vraiment supprimer les artistes sélectionnés ?</p>
    </SpotiModal>
  );
};
