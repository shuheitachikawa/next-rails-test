import React, { FC, useState, useEffect } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import Link from "next/link"

type Post = {
  id: number;
  content: string;
};

type Props = {
  posts: Post[];
};

const baseUrl = "http://api:3000";

const Home: FC<Props> = (props) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(content);
    const payload = {
      content: content,
    };
    try {
      await axios.post("http://localhost:3000/posts", payload);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>POSTの一覧</h2>
      <table>
        <tbody>
          {props.posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}.</td>
              <td><Link href={`/${post.id}`}>{post.content}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
        />
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await axios.get(`${baseUrl}/posts`);

  return {
    props: {
      posts: data,
    },
  };
};

export default Home;
