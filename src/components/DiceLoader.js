
import classes from './DiceLoader.module.css';
import dice from '../d20.png';

function DiceLoader() {
    return (
        <div className={classes['spinner']}>
            <img src={dice} alt="Loading..."/>
        </div>
    );
}

export default DiceLoader;