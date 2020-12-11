import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Table = () => {
  const [words, setWords] = useState(null);
  useEffect(() => {
    fetch('/dictinorywords').then(
      (response) => {
        response.json().then((data) => {
          setWords(data);
        });
      });
  }, []);
  if (words === null) {
    return <h3>Loading...</h3>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Word</th>
        </tr>
      </thead>
      <tbody>
        {words.map((row, index) => {
          const { id, word } = row;
          return (
            <tr key={id}>
              <td>{index}</td>
              <td>{word}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const Test_component = () => (
  <div>
    <h2>Dictionary Words</h2>
    <Table />
  </div>
);

Test_component.propTypes = {};

Test_component.defaultProps = {};

export default Test_component;
