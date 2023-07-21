import React from 'react';
import './Header.scss';
import '../../../styles/_icons.scss';

interface HeaderProps {
  title: string;
  onAddClick: () => void;
}

const Header = ({ title, onAddClick }: HeaderProps) => {
  return (
    <header>
      <h1>
        {title} <i className="icon-add" onClick={onAddClick}></i>
      </h1>
    </header>
  );
};

export default Header;
