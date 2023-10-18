import React, { useState } from "react";
import { Article } from "./articlesInterface";

interface ArticleTableProps {
  headers: { key: string; label: string }[];
  data: Article[];
  onRowClick: (article: Article) => void;
}

const ArticleTable: React.FC<ArticleTableProps> = ({
  headers,
  data,
  onRowClick,
}) => {
  const handleRowClick = (article: Article) => {
    onRowClick(article); // Call the callback function to trigger modal display
  };

  return (
    <table className="w-full">
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header.key}
              className="px-4 py-2 text-left border-b-2 border-gray-500"
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            className={i % 2 === 0 ? "bg-gray-500" : "bg-gray-800"}
            onClick={() => handleRowClick(row)}
          >
            {headers.map((header) => (
              <td
                key={header.key}
                className="px-4 py-2 border-b border-gray-200"
              >
                {String(row[header.key as keyof Article])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ArticleTable;
