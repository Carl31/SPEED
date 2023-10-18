/**
 * Class that will display the registered articles in the SPEED database already
 */

import { GetStaticProps, NextPage } from "next";
import ArticleTable from "./articlesTable";
import data from "../tempData/dummydata.json";
import { Article } from "./articlesInterface";

type ArticlesProps = {
  articles: Article[];
};

// const ViewAllPage: NextPage<ArticlesProps> = ({ articles }) => {
//     const headers: { key: keyof Article; label: string }[] = [
//         { key: "title", label: "Title" },
//         { key: "authors", label: "Authors" },
//         { key: "source", label: "Source" },
//         { key: "pubyear", label: "Publication Year" },
//         { key: "doi", label: "DOI" },
//         { key: "claim", label: "Claim" },
//         { key: "evidence", label: "Evidence" },
//     ];

//     return (
//         <div className="container">
//             <h1>Articles</h1>
//             <ArticleTable headers={headers} data={articles} />
//         </div>
//     );
// };

// export const getStaticProps: GetStaticProps<ArticlesProps> = async (_) => {
//     // Map the data to ensure all articles have consistent property names
//     const articles = data.articles.map((article) => ({
//         id: article.id ?? article._id,
//         title: article.title,
//         authors: article.authors,
//         source: article.source,
//         pubyear: article.pubyear,
//         doi: article.doi,
//         claim: article.claim,
//         evidence: article.evidence,
//     }));

//     return {
//         props: {
//             articles,
//         },
//     };
// };

// export default ViewAllPage;

const ViewAllPage: NextPage = () => {
  const headers: { key: keyof Article; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
  ];

  const articles = data.articles.map((article) => ({
    id: article.id ?? article._id,
    title: article.title,
    authors: article.authors,
    source: article.source,
    pubyear: article.pubyear,
    doi: article.doi,
    claim: article.claim,
    evidence: article.evidence,
  }));

  return (
    <div className=" place-items-center">
      <div className="max-w-screen-lg mx-auto">
      <h1 className="mb-12 mt-12 font-bold" >All Articles</h1>
        <ArticleTable headers={headers} data={articles} />
      </div>
    </div>
  );
};

export default ViewAllPage;
