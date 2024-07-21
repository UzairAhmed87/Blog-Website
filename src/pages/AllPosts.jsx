import React from "react";
import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/conf";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {},[])
    service.getAllPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  ;

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex items-center flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
