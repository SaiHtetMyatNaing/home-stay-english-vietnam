"use client";

import { dataProvider } from "@/lib/data-providers";
import { Resource } from "ra-core";
import { Admin } from "@/components/admin";
import { ListGuesser } from "../list-guesser";
import { EditGuesser } from "../edit-guesser";
import { ShowGuesser } from "../show-guesser";

const AdminApp = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="users"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
    </Admin>
  );
};

export default AdminApp;
