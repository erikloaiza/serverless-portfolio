import React from 'react';
import ReactDOMServer from 'react-dom/server';

const SSRApp = () => {
  return <div>Test View</div>;
};

export default ReactDOMServer.renderToString(<SSRApp />);
