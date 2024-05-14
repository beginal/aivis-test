import React, { useEffect } from "react";
import GetList from "../api/getList";
import { Table } from "@/components/Table";

type Props = {};

const ProjectPage = (props: Props) => {
  console.log(props);
  return (
    <div>
      <Table list={props?.collection || []} />
    </div>
  );
};

export default ProjectPage;

export async function getServerSideProps() {
  const URL = "http://192.168.0.89:8888/api/project.json";
  const res = await fetch(`${URL}?withMembersCount=${1}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjb2RpbmdfdGVzdCIsImF1dGgiOiJST0xFX1VTRVIiLCJ0eXBlIjoiU0VTU0lPTiIsImV4cCI6MTcxNTc0MTMzNn0.0sCIUgmAgWZs4mz3QqUxZ9KaZwalCo2SITOIFLRNxC3ZNT4KgFblTm4lxbHoo37NrvObhRsFg-J9rBIqa2wPYQ"}`,
    },
  });
  const data = await res.json();
  return { props: { ...data } };
}
