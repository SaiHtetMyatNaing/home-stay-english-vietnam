"use client";
import { useOne } from "@refinedev/core";

const Page = () => {
  const {
    result,
    query: { isLoading },
  } = useOne({ resource: "products", id: 1 });

  if (isLoading) {
    return <>Loading...</>;
  }

  return <>
  {result?.name}
  </>;
};

export default Page;
