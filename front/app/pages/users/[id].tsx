import React, { FC, useState, useEffect } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

type User = {
  id: number;
  name: string;
  password: string;
};

type Props = {
  user: User;
};

const User: NextPage<Props> = (props) => {
  const router = useRouter();
  const { id } = props.user;
  const [name, setName] = useState(props.user.name);

  const handleUpdate = async () => {
    const payload = {
      ...props.user,
      name: name,
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
      <h2>User詳細</h2>
      <div className="">
      <p>ID: {props.user.id}</p>
      <p>pass: {props.user.password}</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
  const { data } = await axios.get(`${baseUrl}/users`);
  const paths = data.map((user) => `/users/${user.id}`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.id;
  const { data } = await axios.get(`${baseUrl}/users/${id}`);
  return {
    props: {
      user: data,
    },
  };
};

export default User;
