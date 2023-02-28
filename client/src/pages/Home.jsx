import React, { useState, useEffect } from "react";

import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key="post._id" {...post} />);
  } else {
    return (
      <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
        {title}
      </h2>
    );
  }
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [search, setsearch] = useState("");
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const handleSearch = (e) => {
    setsearch(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.prompt.toLowerCase().includes(search.toLowerCase())
        );

        setSearchedResults(searchResults)
      }, 500)
    )
  };

  return (
    <section className="max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-extrabold text-3xl text-[#222328]">
          The Community Showcase
        </h1>
        <p className="mt-3 text-[16px] text-[#666e75] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI
        </p>
      </div>

      {/* Form */}
      <div className="mt-16">
        <FormField
          labelName='Search posts'
          type='text'
          name='text'
          placeholder='Search posts'
          value={search}
          handleChange={handleSearch}
        />
      </div>

      {/* Tela que mostra as imagens, caso elas existam */}
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {search && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Searching results for{" "}
                <span className="text-[#222328]">search</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {search ? (
                <RenderCards data={searchedResults} title="No search results found" />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;