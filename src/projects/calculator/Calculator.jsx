import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleClick = (value) => {
    if (display === '0') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
    setEquation(equation + value);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleCalculate = () => {
    try {
      const result = eval(equation);
      setDisplay(result.toString());
      setEquation(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <div className="calculator p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="display bg-gray-700 p-2 rounded mb-2 text-right text-white text-2xl">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
          <button
            key={btn}
            onClick={() => btn === '=' ? handleCalculate() : handleClick(btn)}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            {btn}
          </button>
        ))}
        <button
          onClick={handleClear}
          className="col-span-4 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Calculator;
