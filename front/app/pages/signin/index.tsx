import React, { FC, useState, useEffect } from "react";
import { NextPage } from "next";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

type User = {
  id: number;
  uuid: string;
  name: string;
  password: string;
};

type Props = {
  user: User;
};

const Signup: NextPage<Props> = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: name,
    };
    const { data } = await axios.post(`http://localhost:3000/users`, payload);
    router.push(`/users/${data.id}`);
  };

  return (
    <div>
      <h2>新規ユーザー登録</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">新規登録</button>
      </form>
    </div>
  );
};

export default Signup;
