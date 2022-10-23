import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={`container ${styles.header}`}>
        <span></span>
        <h3>Labyrinth</h3>
        <span></span>
    </header>
  )
}

export default Header