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
      console.log(props);
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
  const URL = "http://192.168.0.89:8888/api/authenticate";
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username: "coding_test", password: "coding0000" }),
  });
  const data = await res.json();

  console.log("le", data);
  return { props: { ...data } };
}

export default Home;
