/**
 * Component that displays the data in a table
 */

// import React from "react";
// import { Article } from "./articlesInterface";

// interface SortableTableProps {
//   headers: { key: string; label: string }[];
//   data: Article[];
// }

// const ArticleTable: React.FC<SortableTableProps> = ({ headers, data }) => (
//     <table>
//         <thead>
//         <tr>
//             {headers.map((header) => (
//             <th key={header.key}>{header.label}</th>
//             ))}
//         </tr>
//         </thead>
//         <tbody>
//             {data.map((row, i) => (
//                 <tr key={i}>
//                     {headers.map((header) => (
//                         <td key={header.key}>{row[header.key]}</td>
//                     ))}
//                 </tr>
//             ))}
//         </tbody>
//   </table>
// );

// export default ArticleTable;

import React from "react";
import { Article } from "./articlesInterface";

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: Article[];
}

const ArticleTable: React.FC<SortableTableProps> = ({ headers, data }) => (
  <table>
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header.key}>{header.label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {headers.map((header) => (
            <td key={header.key}>
              {row[header.key as keyof Article]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default ArticleTable;
