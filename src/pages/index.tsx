import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useInitialValueStore } from "@/store";

const Home = (props: any) => {
  const { setInitialValue } = useInitialValueStore();
  const router = useRouter();
  useEffect(() => {
    if (props.token) {
      setInitialValue(props.token, props.shortTermToken);
      router.replace("/project");
    }
  }, [props]);
  return (
    <>
      <div>Login중</div>
    </>
  );
};

export async function getServerSideProps() {
  const URL = `http://${process.env.BASE_URL}/authenticate`;
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username: process.env.USERNAME, password: process.env.PASSWORD }),
  });
  const data = await res.json();

  return { props: { ...data } };
}

export default Home;
