/**
 * Class that will display the registered articles in the SPEED database already
 */

import { NextPage } from "next";
import ArticleTable from "../components/table/ArticlesTable";
import { useState, useEffect } from "react";
import data from "../registeredArticles/dummydata.json"

type Article = {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string;
  evidence: string;
};

const Articles: NextPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const normalizedData = data.articles.map((article: any) => ({
        id: article.id ?? article._id,
        title: article.title,
        authors: article.authors,
        source: article.source,
        pubyear: article.pubyear,
        doi: article.doi,
        claim: article.claim,
        evidence: article.evidence,
    }));
    setArticles(normalizedData);
  }, []);

  const headers = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
  ];

  return (
    <div className="backdrop-blur absolute inset-0 bg-blue-800 opacity-70">
      <h1>Articles in SPEED </h1>
      <ArticleTable headers={headers} data={articles} />
    </div>
  );
};

export default Articles;