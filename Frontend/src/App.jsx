import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import rehypehighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`); // missing closing bracket and quote


const [review , setReview] = useState('')

  useEffect(() => {
    prism.highlightAll();
  }, []);


  async function reviewCode() {
    const response = await axios.post("http://localhost:3000/ai/get-review",{code});
    setReview(response.data);
    
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 20,
                color: "#ffffff",
                height: "100vh",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div 
          onClick={reviewCode}
           className="review">
            <button className="review-btn">Review</button>
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypehighlight]} >
            {review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
