import React from "react";
import service from "../appwrite/conf";
import { Container, PostCard } from "../components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function Home() {
  const [posts, setposts] = useState([]);
  const userData = useSelector((state) => state.auth.status);

  useEffect(() => {
    service.getAllPosts().then((posts) => {
      if (posts) {
        setposts(posts.documents);
      }
    });
  }, []);

  if (!userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container >
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read and write Blogs
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => {
            return (<div key={post.$id} className="p-2 w-1/4 max-md:w-full">
                <PostCard {...post} />
              </div>)
            })}
          </div>
        </Container>
      </div>
    );
  }
}
