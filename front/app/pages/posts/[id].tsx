import React, { FC, useState, useEffect } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

type Post = {
  id: number;
  content: string;
};

type Props = {
  post: Post;
};

const Post: NextPage<Props> = (props) => {
  const router = useRouter();
  const { id } = props.post;
  const [content, setContent] = useState(props.post.content);

  const handleUpdate = async () => {
    const payload = {
      ...props.post,
      content: content,
    };
    try {
      await axios.put(`http://localhost:3000/posts/${id}`, payload);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/posts/${id}`);
    router.push("/posts");
  };
  return (
    <div>
      <h2>POST詳細</h2>
      <div className="">

      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleUpdate}>更新</button>
      <button onClick={handleDelete}>削除</button>
      </div>
      <Link href="/posts">一覧に戻る</Link>
    </div>
  );
};

const baseUrl = "http://api:3000";
export const getStaticPaths: GetStaticPaths = async (context) => {
  const { data } = await axios.get(`${baseUrl}/posts`);
  const paths = data.map((post) => `/posts/${post.id}`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.id;
  const { data } = await axios.get(`${baseUrl}/posts/${id}`);
  return {
    props: {
      post: data,
    },
  };
};

export default Post;
