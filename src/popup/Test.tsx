import React, { useState } from 'react';

function Test() {
  const [count, setCount] = useState(1);
  return (
    <>
      dong dong
      <h1>{count}</h1>
      <div>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default Test;
