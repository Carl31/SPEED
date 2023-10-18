/**
 * Class for adding a new article
 */
"use client";

import { FormEvent, useState } from "react";
import articleStyles from "../app/Form.module.scss";
import { Article } from "./articlesInterface";
import ViewAllPage from "./viewAllPage";


export default function ArticleForm() {
  const [articleTitle, setArticleTitle] = useState<string>('');
  const [articleAuthor, setArticleAuthor] = useState<string>('');
  const [articleSource, setArticleSource] = useState<string>('');
  const [articleDoi, setArticleDoi] = useState<string>('');
  const [articlePractice, setArticlePractice] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);

  const searchArticle = async (event: React.FormEvent) => {
    event.preventDefault();
    
    

    // Create an object with all the article data
    const newArticle = {
      articleTitle: articleTitle,
      articleAuthors: articleAuthor,
      articleSource: articleSource,
      articleDoi: setArticleDoi,
      articlePractice: articlePractice, 
    };

    // Send the new article data to the backend
    try {
      const response = await fetch("http://localhost:4000/articles/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticle),
      });

      if (!response.ok) {
        // Handle non-successful response (e.g., HTTP error status)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle success or other actions as needed
      const data = await response.json();
      //console.log("Response data:", data);
      setSearchResults(data);

      // Reset the form fields or perform other actions
      setArticleTitle("");
      setArticleAuthor("");
      setArticleSource("");
      setArticleDoi("");
      setArticlePractice("");
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className=" place-items-center">
       <div className="max-w-screen-lg mx-auto">
    <form
      className={`${articleStyles.form} max-w-screen-lg mx-auto mb-12`}
      onSubmit={searchArticle}
    >
      <h1 className="mb-12 mt-12 font-bold">Search for an article</h1>

      <label htmlFor="title">Title:</label>
      <input
        className={`${articleStyles.formItem} text-black form-input`}
        type="text"
        id="title"
        name="title"
        value={articleTitle}
        onChange={(event) => setArticleTitle(event.target.value)}
      />

      <label htmlFor="author">Author:</label>
      <input
        className={`${articleStyles.formItem} text-black form-input`}
        type="text"
        id="author"
        name="author"
        value={articleAuthor}
        onChange={(event) => setArticleAuthor(event.target.value)}
      />


      <label htmlFor="source">Source:</label>
      <input
         className={`${articleStyles.formItem} text-black`}
        type="text"
        id="source"
        name="source"
        value={articleSource}
        onChange={(event) => setArticleSource(event.target.value)}
      />

      <label htmlFor="doi">DOI:</label>
      <input
         className={`${articleStyles.formItem} text-black`}
        type="text"
        id="doi"
        name="doi"
        value={articleDoi}
        onChange={(event) => setArticleDoi(event.target.value)}
      />

      <label htmlFor="practice">Practice:</label>
      <input
        className={`${articleStyles.formItem} text-black`}
        type="text"
        id="practice"
        name="practice"
        value={articlePractice}
        onChange={(event) => setArticlePractice(event.target.value)}
      />

      <button
        className="form-input bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Search
      </button>
    </form>

    <ViewAllPage articles={searchResults} />
    </div>
    </div>
  );
}














// const SearchPage = () => {
//   const [title, setTitle] = useState("");
//   const [authors, setAuthors] = useState<string[]>([]);
//   const [source, setSource] = useState("");
//   const [pubYear, setPubYear] = useState<number>(0);
//   const [doi, setDoi] = useState("");
//   const [summary, setSummary] = useState("");
//   const [linkedDiscussion, setLinkedDiscussion] = useState("");

//   const searchForArticle = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     console.log(
//       JSON.stringify({
//         title,
//         authors,
//         source,
//         publication_year: pubYear,
//         doi,
//         summary,
//         linked_discussion: linkedDiscussion,
//       })
//     );
//   };

//   /**
//    * Functions for the authors state variable that is set as an array at the top.
//    */

//   // Method to add author.
//   const addAuthor = () => {
//     setAuthors(authors.concat([""]));
//   };

//   // Method to remove author
//   const removeAuthor = (index: number) => {
//     setAuthors(authors.filter((_, i) => i !== index)); // using filter method, which will take the index of the author array specified then remove it
//   };

//   // Method to change the author
//   const changeAuthor = (index: number, value: string) => {
//     setAuthors(
//       authors.map((oldValue, i) => {
//         return index === i ? value : oldValue;
//       })
//     );
//   };

//   /**
//    * Returning articles form to be displayed on the page.
//    */
//   return (
//     <div className=" place-items-center">
//       <div className="max-w-screen-lg mx-auto">
        
//         <form className={`${articleStyles.form} max-w-screen-lg mx-auto`} onSubmit={searchForArticle}>
//         <h1 className="mb-12 mt-12 font-bold" >Search for an article</h1>
//           <label htmlFor="title">Title:</label>
//           <input
//             className={`${articleStyles.formItem} text-black`}
//             type="text"
//             name="title"
//             id="title"
//             value={title}
//             onChange={(event) => {
//               setTitle(event.target.value);
//             }}
//           />

//           <label htmlFor="author">Authors:</label>
//           {authors.map((author, index) => {
//             return (
//               <div key={`author ${index}`} className={articleStyles.arrayItem}>
//                 <input
//                   type="text"
//                   name="author"
//                   value={author}
//                   onChange={(event) => changeAuthor(index, event.target.value)}
//                   className={`${articleStyles.formItem} text-black`}
//                 />
//                 {/* creating button that allows user to remove the author they type*/}
//                 <button
//                   onClick={() => removeAuthor(index)}
//                   className={`${articleStyles.buttonItem}`}
//                   style={{ marginLeft: "3rem" }}
//                   type="button"
//                 >
//                   -
//                 </button>
//               </div>
//             );
//           })}
//           {/* Creating button that allows the user to add another author if needed */}
//           <button
//             onClick={() => addAuthor()}
//             className={`${articleStyles.buttonItem}`}
//             style={{ marginLeft: "auto" }}
//             type="button"
//           >
//             +
//           </button>

//           <label htmlFor="source">Source:</label>
//           <input
//             className={`${articleStyles.formItem} text-black`}
//             type="text"
//             name="source"
//             id="source"
//             value={source}
//             onChange={(event) => {
//               setSource(event.target.value);
//             }}
//           />

//           <label htmlFor="pubYear">Publication Year:</label>
//           <input
//             className={`${articleStyles.formItem} text-black`}
//             type="number"
//             name="pubYear"
//             id="pubYear"
//             value={pubYear}
//             onChange={(event) => {
//               const val = event.target.value;
//               if (val === "") {
//                 setPubYear(0);
//               } else {
//                 setPubYear(parseInt(val));
//               }
//             }}
//           />

//           <label htmlFor="doi">DOI:</label>
//           <input
//             className={`${articleStyles.formItem} text-black`}
//             type="text"
//             name="doi"
//             id="doi"
//             value={doi}
//             onChange={(event) => {
//               setDoi(event.target.value);
//             }}
//           />

//           <label htmlFor="summary">Summary:</label>
//           <textarea
//             className={`${articleStyles.formTextArea} text-black`}
//             name="summary"
//             value={summary}
//             onChange={(event) => setSummary(event.target.value)}
//           />

//           <button className={`${articleStyles.formItem} text-white bg-blue-400 hover:bg-blue-600 font-bold py-2 px-4 rounded items-center justify-center`} type="submit">
//             Search
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default SearchPage;
