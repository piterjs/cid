import React, { useEffect } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/html';
import 'brace/ext/searchbox';
import 'brace/theme/vibrant_ink';

import './styles.css'

const value = `<!-- Styles -->
<style>
h1 {
  font-size: 16px;
}
</style>
<!-- Body -->
<div>
<h1>Test</h1>
<h2>Test</h2>
</div>
`;

const renderHtml = (html) => {
  const iframe = document.getElementById('view-preview');
  if (iframe) {
    iframe.contentWindow.document.open('text/html', 'replace');
    iframe.contentWindow.document.write(`<html><body>${html}</body></html>`);
    iframe.contentWindow.document.close();
  }
}

export default ({ match: { params: { id } } }) =>  {
  useEffect(() => {
    renderHtml(value);
  });
  return (
    <div className="view">
      <div className="view-code">
        <AceEditor
          mode="html"
          theme="vibrant_ink"
          style={{ backgroundColor: 'transparent' }}
          value={value}
          fontSize="20px"
          tabSize={2}
          showGutter={false}
          highlightActiveLine={false}
          readOnly
          width="100%"
          height={`${window.innerHeight}px`}
          name="code_editor"
          editorProps={{ $blockScrolling: Infinity }}
        />
        <div className="view-code-bg"/>
      </div>
      <div className="view-preview">
        <iframe title="sandbox" width="100%" height="100%" sanbox="true" id="view-preview"/>
      </div>
      <h1 className="view-title">Name {id}</h1>
      <h1 className="view-timer">15:00</h1>
    </div>
  );
}
