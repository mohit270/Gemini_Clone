import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const GeminiResponse = ({ text }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-2xl shadow-md max-w-2xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-blue-600" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic text-gray-700" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) => (
            <code
              className={`px-1 py-0.5 bg-gray-200 rounded ${
                inline ? "text-pink-600" : "block p-2 my-2 text-sm"
              }`}
              {...props}
            >
              {children}
            </code>
          ),
          li: ({ node, ...props }) => (
            <li className="list-disc ml-6 text-gray-800" {...props} />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default GeminiResponse;
