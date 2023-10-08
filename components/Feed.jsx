'use client';

import { useState, useEffect} from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return( 
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);


  const [searchText, setsearchText] = useState("");
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {

    const response = await fetch('/api/prompt');
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag is for case-insensitive search
    return allPosts.filter(
      (item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut);
    setsearchText(e.target.value);

    setSearchTimeOut(
      setTimeout(() => {
        const searchResults = filterPrompts(e.target.value);
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  const handleTagClick = (tagname) => {
    setsearchText(tagname);

    const searchResults = filterPrompts(tagname);
    setSearchedResults(searchResults);
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type="text" 
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={(handleSearchChange)}
          required
          className='search_input peer'
        />
      </form>
      
      {searchText ? (
        <PromptCardList 
        data={searchResults}
        handleTagClick = {handleTagClick}
      />
      ): (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;