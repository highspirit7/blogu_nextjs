import highlight from "highlight.js";
import { createRef, useEffect } from "react";
import { findDOMNode } from "react-dom";

const HighlightCode = ({ children, language }) => {
  const code = createRef();

  useEffect(() => {
    // highlightBlock() is deprecated (to be removed in 12.0).
    // So, used highlightElement instead.
    highlight.highlightElement(findDOMNode(code.current));
  }, []);

  return (
    <pre>
      <code ref={code} className={language}>
        {children}
      </code>
    </pre>
  );
};

export default HighlightCode;
