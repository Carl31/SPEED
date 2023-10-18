/**
 * Class for adding a new article
 */
"use client";

import { FormEvent, useState } from "react";
import articleStyles from "../app/Form.module.scss";
import { showNotification } from './notification';
import { useSearchParams } from 'next/navigation'

const SubmitPage = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([""]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [summary, setSummary] = useState("");
  const [practice, setPractice] = useState("");
  const [claim, setClaim] = useState("");
  const [volume, setVolume] = useState("");
  const [pages, setPages] = useState<number>(0);

  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  //console.log(username);

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();

    // Check if there's at least one author
  if (authors.length === 0) {
    alert("Please add at least one author.");
    return;
  }

    // Create an object with all the article data
    const newArticle = {
      articleTitle: title,
      articleAuthors: authors,
      articleSource: source,
      articleYear: pubYear,
      articleDoi: doi,
      articleSummary: summary,
      articlePractice: practice, 
      articleClaim: claim, 
      articleVolume: volume, 
      articlePages: pages, 
    };

    // Send the new article data to the backend
    try {
      const response = await fetch("http://localhost:4000/articles/new", {
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
      console.log("Response data:", data);
      alert("Your article has been submitted! Now awaiting analyst approval.");

      // add article to analyst queue
      const analystArticle = {articleDoi: newArticle.articleDoi, articleSubmitter: username}
      const res = await fetch("http://localhost:4000/analyst/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(analystArticle),
      });

      // Reset the form fields or perform other actions
      setTitle("");
      setAuthors([]);
      setSource("");
      setPubYear(0);
      setDoi("");
      setSummary("");
      setPractice("");
      setClaim("");
      setVolume("");
      setPages(0);
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Fetch error:", error);
    }
  };

  /**
   * Functions for the authors state variable that is set as an array at the top.
   */

  // Method to add author.
  const addAuthor = () => {
    setAuthors(authors.concat([""]));
  };

  // Method to remove author
  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index)); // using filter method, which will take the index of the author array specified then remove it
  };

  // Method to change the author
  const changeAuthor = (index: number, value: string) => {
    setAuthors(
      authors.map((oldValue, i) => {
        return index === i ? value : oldValue;
      })
    );
  };

  /**
   * Returning articles form to be displayed on the page.
   */
  return (
    <div className=" place-items-center">
      <div className="max-w-screen-lg mx-auto">
        <form
          className={`${articleStyles.form} max-w-screen-lg mx-auto`}
          onSubmit={submitNewArticle}
        >
          <h1 className="mb-12 mt-12 font-bold">Submit new article</h1>
          <label htmlFor="title">Title:</label>
          <input
            className={`${articleStyles.formItem} text-black`}
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            required
          />

          <label htmlFor="author">Authors:</label>
          {authors.map((author, index) => {
            return (
              <div key={`author ${index}`} className={articleStyles.arrayItem}>
                <input
                  type="text"
                  name="author"
                  value={author}
                  onChange={(event) => changeAuthor(index, event.target.value)}
                  className={`${articleStyles.formItem} text-black`}
                />
                {/* creating button that allows user to remove the author they type*/}
                <button
                  onClick={() => removeAuthor(index)}
                  className={`${articleStyles.buttonItem}`}
                  style={{ marginLeft: "3rem" }}
                  type="button"
                >
                  -
                </button>
              </div>
            );
          })}
          {/* Creating button that allows the user to add another author if needed */}
          <button
            onClick={() => addAuthor()}
            className={`${articleStyles.buttonItem}`}
            style={{ marginLeft: "auto" }}
            type="button"
          >
            +
          </button>

          <label htmlFor="source">Source:</label>
          <input
            className={`${articleStyles.formItem} text-black`}
            type="text"
            name="source"
            id="source"
            value={source}
            onChange={(event) => {
              setSource(event.target.value);
            }}
            required
          />

          <label htmlFor="pubYear">Publication Year:</label>
          <input
            className={`${articleStyles.formItem} text-black`}
            type="number"
            name="pubYear"
            id="pubYear"
            value={pubYear}
            onChange={(event) => {
              const val = event.target.value;
              if (val === "") {
                setPubYear(0);
              } else {
                setPubYear(parseInt(val));
              }
            }}
            required
          />

          <label htmlFor="doi">DOI:</label>
          <input
            className={`${articleStyles.formItem} text-black`}
            type="text"
            name="doi"
            id="doi"
            value={doi}
            onChange={(event) => {
              setDoi(event.target.value);
            }}
            required
          />

          <label htmlFor="summary">Summary:</label>
          <textarea
            className={`${articleStyles.formTextArea} text-black`}
            name="summary"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            required
          />

          <label htmlFor="practice">Practice:</label>
          <input
            className={`${articleStyles.formItem} text-black`}
            type="text"
            name="practice"
            id="practice"
            value={practice}
            onChange={(event) => {
              setPractice(event.target.value);
            }}
            required
          />
          <label htmlFor="claim">Claim:</label>
          <input
            className={`${articleStyles.formItem} text-black`}
            type="text"
            name="claim"
            id="claim"
            value={claim}
            onChange={(event) => {
              setClaim(event.target.value);
            }}
            required
          />
          <label htmlFor="volume">Volume:</label>
          <input
            className={`${articleStyles.formItem} text-black`}
            type="text"
            name="volume"
            id="volume"
            value={volume}
            onChange={(event) => {
              setVolume(event.target.value);
            }}
            required
          />
          <label htmlFor="pages">Pages:</label>
          <input
            className={`${articleStyles.formItem} text-black`}
            type="number"
            name="pages"
            id="pages"
            value={pages}
            onChange={(event) => {
              const val = event.target.value;
              if (val === "") {
                setPages(0);
              } else {
                setPages(parseInt(val));
              }
            }}
            required
          />

          <button
            className={`${articleStyles.formItem} text-white bg-blue-400 hover:bg-blue-600 font-bold py-2 px-4 rounded items-center justify-center`}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default SubmitPage;
