/**
 * Class that handles the different routes that will be used for the 
 * articles buttons in dash.tsx
 * 
 * UNUSED DELETE LATER
 */

import Link from 'next/link';

function ArticlesButtons() {
  return (
    <div>
      <div className="flex justify-start">
        <Link href="/articles">
          <a>
            <button className="m-5 text-white">
              <h1>View Articles</h1>
            </button>
          </a>
        </Link>
      </div>
      <div className="flex justify-start">
        <Link href="/new-article">
          <a>
            <button className="m-5 text-white">
              <h1>Create New Article</h1>
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default ArticlesButtons;