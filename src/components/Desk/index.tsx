import React, { useEffect, useRef, useState } from 'react';
import { BsHandThumbsUpFill, BsFillHandThumbsDownFill } from 'react-icons/bs';
import { getAvaibleDirections, getBeginingBox, getDirection, getNextBox } from '../../game';
import { increaseTurnNumber, setAllDirections, setBeginingBox, setCurrentBox, setDirection, setEndTurn, setResetGame, setScore, setUsersChoice } from '../../redux/gameSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { colValues, rowValues, tableRows } from '../../utils';
import styles from './Desk.module.scss';

const Desk = () => {

    const dispatch = useAppDispatch();
    const gameState = useAppSelector(state => state.game);

    const boxRef = useRef<Array<HTMLTableDataCellElement | null>>([]);
    const testRef = useRef<Array<HTMLTableDataCellElement | null>>([]);

    const handleClick = (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {

        const data = e.currentTarget.getAttribute('data-label');

        dispatch(setUsersChoice(data!));

        if (data === gameState.currentBox) {
            dispatch(setScore());
            e.currentTarget.innerHTML = `
               <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"></path></svg>
            `
        };

        if (data !== gameState.currentBox) {
            e.currentTarget.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"></path></svg>'
        };

        setTimeout(() => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();

            e.currentTarget.innerHTML = '<span>Emre</span>';
            //boxRef.current.forEach(b => b!.innerHTML = 'Ere');
            //testRef.current.forEach(t => t!.innerHTML = 'Emre')
            dispatch(setResetGame());
            startGame();
        }, 2000);
    };

    const startTurn = () => {
        
        dispatch(setDirection());
        dispatch(setAllDirections());
        dispatch(setCurrentBox());
        dispatch(increaseTurnNumber());
        
    };

    const startGame = () => {

        let turnNumber = 0;

        if (turnNumber === 0) {
            dispatch(setBeginingBox());
        };

        while (turnNumber < 2) {
            turnNumber++;
            startTurn();
        };

        if (turnNumber === 2) {
            
            const intr = setInterval(() => {
    
    
                turnNumber++;
                startTurn();
                console.log(turnNumber);
    
                if (turnNumber === 10) {
                    clearInterval(intr);
                    dispatch(setEndTurn());
                };
            }, 1000);
        };
    };

    return (
        <div className={`${styles['desk-wrapper']} container`}>
        <div>
            <button onClick={startGame}>Start game</button>
                <span>Score: { gameState.score }</span>
        </div>
      <table className={styles["desk"]}>
          <thead className={styles['desk__title-hor']}>
              <tr> 
                {colValues.map(v => <th key={v}>{v}</th> )}
              </tr>
          </thead>
          <thead>
              {rowValues.map(v => <tr key={v} ><th className={styles['desk__title-vert']}>{v}</th></tr> )}
          </thead>
          <tbody className={styles['desk__content']}>
              {tableRows.map((row, i) => {
                  return <tr ref={el => testRef.current[i]} className={styles['desk__row']} key={i}>{row.map((col, idx) => (
                       <td className={styles['desk__col']} ref={ el => boxRef.current[idx] = el} onClick={e => handleClick(e)} data-label={col} key={col}>
                          {gameState.beginingBox === col && 'START'}
                       </td>
                  ))}</tr>
            } )}
          </tbody>
    </table>
    </div>
  )
}

export default Desk




/*
import React from 'react';
import styles from './Desk.module.scss';

const Desk = () => {

    const colValues = ['A', 'B', 'C'];
    const rowValues = ['1', '2', '3'];

    const allBoxes: string [] = [];

    colValues.forEach(item => {
        rowValues.forEach(item2 => {
            allBoxes.push(item + item2) // concatenate two items
        });
    });

  return (
      <div className={styles["desk"]}>
          <div className={styles['desk__title-hor']}>
              {colValues.map(v => <span key={v}>{v}</span> )}
          </div>
          <div className={styles['desk__title-vert']}>
              {rowValues.map(v => <span key={v}>{v}</span> )}
          </div>
          <div className={styles['desk__content']}>
              {allBoxes.map(box => <span data-val={box} key={box}>{box}</span> )}
          </div>
    </div>
  )
}

export default Desk





 const startTurn = () => {
        setDirection(getDirection(currentBox));
        console.log(direction);
        setCurrentBox(getNextBox(currentBox, direction));

    };

    const startGame = () => {

        setCurrentBox(beginingBox);
        setStartFlag(currentBox);

        do {
            startTurn();
        } while (turnNumber < 10);

        console.log('Son kutu', currentBox);
    }







    const startGame = () => {

        let turnNumber = 0;

        const intr = setInterval(() => {

            turnNumber++;
            startTurn();
            console.log(turnNumber);

            if (++turnNumber === 10) {
                clearInterval(intr)
            }
            
        }, 2000);
    }







    const startGame = () => {

        let turnNumber = 0;

        while (turnNumber < 10) {
            turnNumber++;
            startTurn();
        }

    }

*/