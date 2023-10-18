/**
 * Class that will display the registered articles in the SPEED database already
 */

"use client";

import React, { useState, useEffect } from "react";
import MailTable from "./mailTable"; // Update the import path
import data from "../tempData/dummydata.json";
import { AnalystArticle } from "./analystArticleInterface";
import { Article } from "./articlesInterface";
import { User } from "./userInterface";
import { useRouter } from "next/navigation";

type ArticlesProps = {
  mail: AnalystArticle[];
  articles: Article[];
  userdata: User;
};

const MailPage: React.FC<ArticlesProps> = ({ articles, mail, userdata }) => {
  const [selectedAnalystArticle, setSelectedAnalystArticle] =
    useState<AnalystArticle | null>();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>();

  const router = useRouter();

  const headers: { key: keyof AnalystArticle; label: string }[] = [
    { key: "articleDoi", label: "Article DOI" },
    { key: "articleStatus", label: "Approval status" },
    { key: "articleSubmitter", label: "Submitted by" },
  ];

  const handleRowClick = (article: AnalystArticle) => {
    setSelectedAnalystArticle(article);
  };

  async function approveArticle() {
    try {
      const response = await fetch(`http://localhost:4000/analyst/${selectedAnalystArticle?.articleDoi}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "approved",
        }),
      });

      const res = await fetch(`http://localhost:4000/articles/${selectedAnalystArticle?.articleDoi}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "approved",
        }),
      });
  
      articles = await response.json();
      console.log(articles);
      alert("Article has been approved.");
      resetSelection();
      router.refresh();
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Fetch error:", error);
      return null;
    }
  }

  async function rejectArticle() {
    try {
      const response = await fetch(`http://localhost:4000/analyst/${selectedAnalystArticle?.articleDoi}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "rejected",
        }),
      });

      const res = await fetch(`http://localhost:4000/articles/${selectedAnalystArticle?.articleDoi}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "rejected",
        }),
      });
  
      articles = await response.json();
      console.log(articles);
      alert("Article has been rejected.");
      resetSelection();
      router.refresh();
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Fetch error:", error);
      return null;
    }
  }

  useEffect(() => {
    // Code to run when selectedAnalystArticle changes
    if (selectedAnalystArticle) {
      // Get the DOI of the selected AnalystArticle
      const selectedArticleDoi = selectedAnalystArticle.articleDoi;

      // Find the article in the mail array with a matching DOI
      const matchingArticle = articles.find(
        (article) => article.articleDoi === selectedAnalystArticle.articleDoi
      );

      // Set the selected article
      setSelectedArticle(matchingArticle);
    }
  }, [selectedAnalystArticle]);

  function splitAuthors(authors: string | undefined): string {
    let commaSeparatedAuthors;
    if (Array.isArray(authors)) {
      // If authors is already an array, join it with a comma
      commaSeparatedAuthors = authors.join(", ");
    } else if (typeof authors === "string") {
      // If authors is a string, split it into an array and then join it
      const authorsArray = authors.split(",");
      commaSeparatedAuthors = authorsArray.join(", ");
    } else {
      // Handle any other data type or error condition
      commaSeparatedAuthors = "N/A";
    }

    return commaSeparatedAuthors;
  }

  function resetSelection() {
    setSelectedAnalystArticle(null);
    setSelectedArticle(null);
  }

  return (
    <div className=" place-items-center">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="max-w-screen-lg mx-auto font-bold mb-12">Mail</h1>
        <MailTable headers={headers} data={mail} onRowClick={handleRowClick} />
        {selectedAnalystArticle && (
          <div className="modal">
            <div className="modal-content ml-36 mr-36">
              <div className="bg-blue-900 p-4 justify-center items-center  rounded-lg w-full grid grid-cols-7">
                <div className="justify-start col-span-3">
                  <h2 className="font-bold pb-4">
                    Title: {selectedArticle?.articleTitle}
                  </h2>
                  <p>Practice: {selectedArticle?.articlePractice}</p>
                  <p>Claim: {selectedArticle?.articleClaim}</p>
                  <p className="mb-6">
                    Analyst Agrees: {selectedArticle?.articleAnalystAgrees}
                  </p>
                  <p className="mb-6">
                    Summary: {selectedArticle?.articleSummary}
                  </p>
                  <p>
                    Author(s): {splitAuthors(selectedArticle?.articleAuthors)}
                  </p>

                  {/* Include other fields as needed */}
                </div>
                <div className="justify-start col-span-3">
                  <p>Source: {selectedArticle?.articleSource}</p>
                  <p>DOI: {selectedArticle?.articleDoi}</p>
                  <p>Volume: {selectedArticle?.articleVolume}</p>
                  <p>Pages: {selectedArticle?.articlePages}</p>
                  <p></p>
                  <p>Year of Pub: {selectedArticle?.articleYear}</p>
                </div>
                <div className="justify-end grid grid-rows-5">
                  <div className="row-span-2"></div>
                  {userdata.role == "analyst" && (
                    <span className="row-span-2">
                      <button
                        onClick={() => approveArticle()}
                        className="bg-green-500 rounded p-2 hover:bg-green-800 mb-2 w-20"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectArticle()}
                        className="bg-red-500 rounded p-2 hover:bg-red-800 mb-4 w-20"
                      >
                        Reject
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => resetSelection()}
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

export default MailPage;
