import { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

type ShareButtonProps = {
  index: number,
  type: string,
  id: string,
};

function ShareButton({ index, type, id }: ShareButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = async () => {
    const path = (window.location.href).split('/');
    const newPath = `${path[0]}//${path[2]}/${type}s/${id}`;
    try {
      await navigator.clipboard.writeText(newPath);
      setClicked(true);
    } catch (error) {
      console.error('Erro ao copiar para a área de transferência:', error);
      setClicked(false);
    }
  };

  return (
    <>
      <button
        onClick={ handleClick }
      >
        <img
          src={ shareIcon }
          alt="share"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      { clicked && <span>Link copied!</span>}
    </>

  );
}

export default ShareButton;
