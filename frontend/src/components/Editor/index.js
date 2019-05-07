import React, { useState } from 'react';

import AceEditor from 'react-ace';

import 'brace/mode/html';
import 'brace/ext/searchbox';
import 'brace/theme/vibrant_ink';

import './styles.css';

const startValue = `<!-- Styles -->
<style>

</style>
<!-- Body -->
<div>

</div>
`;

export default () => {
  const [ view, setView ] = useState(false);
  const [ value, setValue ] = useState(startValue);
  return (
    <div className="editor">
      <div className="editor-timer">15:00</div>
      <AceEditor
        mode="html"
        theme="vibrant_ink"
        style={{ backgroundColor: 'transparent' }}
        value={value}
        onChange={v => setValue(v)}
        fontSize="20px"
        cursorStart={1}
        tabSize={2}
        highlightActiveLine={false}
        showGutter={false}
        width={`${window.innerWidth}px`}
        height={`${window.innerHeight}px`}
        name="code_editor"
        editorProps={{
          showPrintMargin: false,
          $blockScrolling: Infinity
        }}
      />
      {!view && <div className="editor-image" onClick={() => setView(true)}></div>}
      {view && <div className="editor-image-view" onClick={() => setView(false)}></div>}
    </div>
  );
};
