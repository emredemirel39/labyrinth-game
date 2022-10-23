import React from 'react';
import styles from './Steps.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { FiArrowLeft, FiArrowRight, FiArrowDown, FiArrowUp } from 'react-icons/fi';

const Steps = () => {

    // Redux
    const gameState = useAppSelector(state => state.game);
    const dispatch = useAppDispatch();

    const totalSteps = Array(10).fill('');

    const condition = (str: string) => {
        
        if (str === 'down') {
            return <FiArrowDown size='1.3em' />
        }

        if (str === 'up') {
            return <FiArrowUp size='1.3em' />
        }

        if (str === 'left') {
            return <FiArrowLeft size='1.3em' />
        }

        if (str === 'right') {
            return <FiArrowRight size='1.3em' />
        }

        return '';
    };

  return (
    <div className={`${styles['steps']} container`} >
          {totalSteps.map((s, i) => <span className={styles['step']} key={i}>
              {gameState.allDirections ? [i] && (
                  condition(gameState.allDirections[i])
              ) : ''}
          </span> )}
    </div>
  )
}

export default Steps

//           {gameState.allDirections?.map((d, i) => <span key={i}>{d}</span>)}