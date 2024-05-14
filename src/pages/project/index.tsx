import React, { useEffect, useState } from "react";
import GetList from "../api/getList";
import { Table } from "@/components/Table";
import { useInitialValueStore } from "@/store";

type Props = {};

const ProjectPage = (props: Props) => {
  const { token } = useInitialValueStore();
  const [list, setList] = useState([]);
  async function GET_DATA() {
    const URL = "http://192.168.0.89:8889/api/project.json";
    const response = await fetch(`${URL}?withMembersCount=${1}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    const data = result.collection.map(v => {
      return {
        name: v.name,
        total: 0,
        annotated: v.numberOfAnnotations,
        review: v.numberOfReviewedAnnotations,
        members: v.membersCount,
        subrow: {
          id: v.id,
          description: v.description ?? "",
          slideAnnotation: "",
          objectAnnotation: "",
          createOn: v.created,
          creator: v.ontologyName,
          members: 0,
          actions: "",
        },
        expanded: true,
      };
    });
    setList(data);
  }
  useEffect(() => {
    GET_DATA();
  }, []);

  console.log(list);
  return (
    <div>
      <Table data={list || []} />
    </div>
  );
};

export default ProjectPage;

// export async function getServerSideProps() {
//   const URL = "http://192.168.0.89:8889/api/project.json";
//   const res = await fetch(`${URL}?withMembersCount=${1}`, {
//     method: "GET",
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjb2RpbmdfdGVzdCIsImF1dGgiOiJST0xFX1VTRVIiLCJ0eXBlIjoiU0VTU0lPTiIsImV4cCI6MTcxNTc0MTMzNn0.0sCIUgmAgWZs4mz3QqUxZ9KaZwalCo2SITOIFLRNxC3ZNT4KgFblTm4lxbHoo37NrvObhRsFg-J9rBIqa2wPYQ"}`,
//     },
//   });
//   const data = await res.json();

//   return { props: { ...data } };
// }
