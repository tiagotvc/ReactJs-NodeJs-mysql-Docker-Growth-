import React, { useState } from 'react';
import useDebounce from './useDebounce';
import styles from './Search.module.css';

const SearchInput = ({ value, onChange }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const debouncedChange = useDebounce(onChange, 500);

  function handleChange(event) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
  }

  return (
    <input
      className={styles.search}
      type="search"
      value={displayValue}
      onChange={handleChange}
      placeholder="Aba de pesquisa"
    />
  );
};

export default SearchInput;