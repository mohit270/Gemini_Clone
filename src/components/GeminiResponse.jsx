import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./GeminiResponse.css";

const GeminiResponse = ({ text }) => {
  const [copiedCode, setCopiedCode] = useState("");

  const handleCopy = async (code) => {
    if (!navigator.clipboard) return alert("Clipboard not supported");
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // Code block component
  const CodeBlock = ({ className, children }) => {
    const language = className?.replace("language-", "") || "";
    const codeString = Array.isArray(children) ? children.join("") : children;

    return (
      <div className="gemini-code-block-wrapper">
        <button
          className="gemini-copy-btn"
          onClick={() => handleCopy(codeString)}
        >
          {copiedCode === codeString ? "Copied!" : "Copy"}
        </button>
        <SyntaxHighlighter language={language} style={oneDark} showLineNumbers>
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  };

  return (
    <div className="gemini-container">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Unwrap paragraphs with only a code node
          p: ({ node, children, ...props }) => {
            if (
              node &&
              node.children &&
              node.children.length === 1 &&
              (node.children[0].type === "code" || node.children[0].type === "inlineCode")
            ) {
              return <>{children}</>;
            }
            return <p {...props}>{children}</p>;
          },

          // Wrap code blocks with CodeBlock safely
          pre: ({ node, children }) => {
            const codeElement = Array.isArray(children) ? children[0] : children;

            if (codeElement && codeElement.props && codeElement.props.children) {
              const className = codeElement.props.className;
              return (
                <CodeBlock className={className}>
                  {codeElement.props.children}
                </CodeBlock>
              );
            }

            // fallback
            return <pre>{children}</pre>;
          },

          // Inline code styling
          code: ({ inline, children, ...props }) => {
            if (inline) {
              return (
                <code className="gemini-code" {...props}>
                  {children}
                </code>
              );
            }
            return <code {...props}>{children}</code>;
          },

          strong: ({ node, ...props }) => <strong className="gemini-strong" {...props} />,
          em: ({ node, ...props }) => <em className="gemini-em" {...props} />,
          li: ({ node, ...props }) => <li className="gemini-li" {...props} />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default GeminiResponse;
