import {gql} from "@apollo/client";

export const  GET_USERS = gql`query GetAllUser{
  getAllUsers{
    name
    email
    password
    id
  }
}`