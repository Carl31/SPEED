/**
 * Class that will display the registered articles in the SPEED database already
 */

"use client";

import React, { useState } from "react";
import ArticleTable from "./articlesTable"; // Update the import path
import data from "../tempData/dummydata.json";
import { Article } from "./articlesInterface";

type ArticlesProps = {
  articles: Article[];
};

const ViewAllPage: React.FC<ArticlesProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>();

  const headers: { key: keyof Article; label: string }[] = [
    { key: "articleTitle", label: "Title" },
    { key: "articlePractice", label: "Practice" },
    { key: "articleClaim", label: "Claim" },
    { key: "articleAnalystAgrees", label: "Analyst Decision" },
  ];

  const handleRowClick = (article: Article) => {
    setSelectedArticle(article);
  };


function splitAuthors(authors: string): string {
  let commaSeparatedAuthors;
  if (Array.isArray(authors)) {
    // If authors is already an array, join it with a comma
    commaSeparatedAuthors = authors.join(', ');
  } else if (typeof authors === 'string') {
    // If authors is a string, split it into an array and then join it
    const authorsArray = authors.split(',');
    commaSeparatedAuthors = authorsArray.join(', ');
  } else {
    // Handle any other data type or error condition
    commaSeparatedAuthors = 'N/A';
  }
  
 return commaSeparatedAuthors;
}




  return (
    <div className=" place-items-center">
      <div className="max-w-screen-lg mx-auto">

      <h1 className="max-w-screen-lg mx-auto font-bold mb-12">Articles</h1>
      <ArticleTable
        headers={headers}
        data={articles}
        onRowClick={handleRowClick}
      />
      {selectedArticle && (
        <div className="modal">
          <div className="modal-content ml-36 mr-36">
            <div className="bg-blue-900 p-4 justify-center items-center  rounded-lg w-full grid grid-cols-7">
              <div className="justify-start col-span-3">
                <h1 className="font-bold pb-4">
                  Title: {selectedArticle.articleTitle}
                </h1>
                <p>Practice: {selectedArticle.articlePractice}</p>
                <p>Claim: {selectedArticle.articleClaim}</p>
                <p className="mb-6">
                  Analyst Agrees: {selectedArticle.articleAnalystAgrees}
                </p>
                <p className="mb-6">
                  Summary: {selectedArticle.articleSummary}
                </p>
                <p>Author(s): {splitAuthors(selectedArticle.articleAuthors)}</p>

                {/* Include other fields as needed */}
              </div>
              <div className="justify-start col-span-3">
                <p>Source: {selectedArticle.articleSource}</p>
                <p>DOI: {selectedArticle.articleDoi}</p>
                <p>Volume: {selectedArticle.articleVolume}</p>
                <p>Pages: {selectedArticle.articlePages}</p>
                <p></p>
                <p>Year of Pub: {selectedArticle.articleYear}</p>
              </div>
              <div className="justify-end grid grid-rows-5">
                <div className="row-span-4"></div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-blue-500 rounded p-2 hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        
      )}
    </div>
    </div>
  );
};

export default ViewAllPage;
