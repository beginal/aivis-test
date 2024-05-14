const GetList = async ({ withMembersCount }: any) => {
  const URL = "http://192.168.0.89:8888/api/project.json";
  const res = await fetch(`${URL}?withMembersCount=${withMembersCount}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export default GetList;
