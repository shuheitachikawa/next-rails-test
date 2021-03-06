import React, { FC, useState, useEffect } from "react";
import { NextPage, GetStaticProps } from "next";
import axios from "axios";
import Link from "next/link";
import Head from 'next/head'

type Post = {
  id: number;
  content: string;
};

type Props = {
  posts: Post[];
};

const baseUrl = "http://18.183.169.37:80";

const Posts: NextPage<Props> = (props) => {
  const [posts, setPosts] = useState(props.posts);
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      content: content,
      user_id: 1
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/posts`,
        payload
      );
      setPosts([...posts, data]);
      setContent("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <h2>POSTの一覧1</h2>
      <table>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}.</td>
              <td>
                <Link href={`/posts/${post.id}`}>{post.content}</Link>
              </td>
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
  // const { data } = await axios.get(`${baseUrl}/posts`);
  const data = []


  return {
    props: {
      posts: data,
    },
  };
};

export default Posts;
