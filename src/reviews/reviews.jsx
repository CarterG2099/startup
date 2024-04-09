import React from 'react';

export function Reviews() {
  const [quote, setQuote] = React.useState('');

  React.useEffect(() => {
    fetch('https://api.quotable.io/random')
        .then((response) => response.json())
        .then((data) => {
            setQuote(data.content);
        });  }, []);


  return (
    <main className='container-fluid bg-secondary text-center'>
      <h2>Recipe Reviews</h2>
      <div id="quote" className="quote-box bg-dark text-light"></div>
      <body className="text-center">
        <div id="card-group" className="card-group">{quote}</div> 
      </body>
    </main>
  );
}