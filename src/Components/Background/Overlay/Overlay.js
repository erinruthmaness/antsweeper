import { useContext } from 'react';
import overlayContext from '../../../utils/store/overlayContext';
import styles from './Overlay.module.css';

const Overlay = () => {
    const overlayCtx = useContext(overlayContext);

    const handleClick = () => {
        overlayCtx.hide();
    }

    return (
        <div
            className={overlayCtx.display ? styles.overlay : styles.overlay_hide}
            onClick={handleClick}
      ></div>
    )
}

export default Overlay;