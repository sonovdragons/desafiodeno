import { Response, Request, Body } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface User {
  id: string;
  name: string;
}

let users: User[] = [
  {
    id: "1",
    name: "martin",
  },
];

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    message: "encontrados",
    users,
  };
};

export const getUser = ({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) => {
  const userFound = users.find((user) => user.id === params.id);
  if (userFound) {
    response.status = 200;
    response.body = {
      
      userFound,
    };
  } else {
    response.status = 404;
    response.body = {
      message: "no encontrado",
    };
  }
};

export const createUser = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  const body: Body = await request.body();

  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: "faltan datos",
    };
  } else {

    const newUser = body.value;
    newUser.id = v4.generate();

    users.push(newUser);


    response.status = 200;
    response.body = {
      message: "creado",
      newUser,
    };
  }
};

export const updateUser = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: Request;
  response: Response;
}) => {
  const userFound = users.find((user) => user.id === params.id);

  if (!userFound) {
    response.status = 404;
    response.body = {
      message: "no encontrado",
    };
  } else {
    const body = await request.body();
    const updatedProduct = body.value;

    users = users.map((user) =>
      user.id === params.id ? { ...user, ...updatedProduct } : user
    );

    response.status = 200;
    response.body = {
      users,
    };
  }
};

export const deleteUser = ({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) => {
  users = users.filter((user) => user.id !== params.id);
  response.status = 200;
  response.body = {
    message: "borrado",
    users
  };
};