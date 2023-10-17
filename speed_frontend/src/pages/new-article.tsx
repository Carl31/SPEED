/**
 * Class for adding a new article 
 */

import { FormEvent, useState } from "react";
import articleStyles from "./Form.module.scss";

const NewArticle = () => {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState<string[]>([]);
    const [source, setSource] = useState("");
    const [pubYear, setPubYear] = useState<number>(0);
    const [doi, setDoi] = useState("");
    const [summary, setSummary] = useState("");
    const [linkedDiscussion, setLinkedDiscussion] = useState("");
  
    const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
  
        console.log(
            JSON.stringify({title,
                authors,
                source,
                publication_year: pubYear,
                doi,
                summary,
                linked_discussion: linkedDiscussion,
            })
        );
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
        <div className="container">
            <h1>Submit new article</h1>
            <form className={articleStyles.form} onSubmit={submitNewArticle}>
            <label htmlFor="title">Title:</label>
            <input
                className={articleStyles.formItem}
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(event) => {
                setTitle(event.target.value);
                }}
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
                    className={articleStyles.formItem}
                    />
                    {/* creating button that allows user to remove the author they type*/}
                    <button
                    onClick={() => removeAuthor(index)}
                    className={articleStyles.buttonItem}
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
                className={articleStyles.buttonItem}
                style={{ marginLeft: "auto" }}
                type="button"
            >
                +
            </button>
    
            <label htmlFor="source">Source:</label>
            <input
                className={articleStyles.formItem}
                type="text"
                name="source"
                id="source"
                value={source}
                onChange={(event) => {
                setSource(event.target.value);
                }}
            />
    
            <label htmlFor="pubYear">Publication Year:</label>
            <input
                className={articleStyles.formItem}
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
            />
    
            <label htmlFor="doi">DOI:</label>
            <input
                className={articleStyles.formItem}
                type="text"
                name="doi"
                id="doi"
                value={doi}
                onChange={(event) => {
                setDoi(event.target.value);
                }}
            />
    
            <label htmlFor="summary">Summary:</label>
            <textarea
                className={articleStyles.formTextArea}
                name="summary"
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
            />
    
            <button className={articleStyles.formItem} type="submit">
                Submit
            </button>
            </form>
        </div>
    );
};
export default NewArticle;