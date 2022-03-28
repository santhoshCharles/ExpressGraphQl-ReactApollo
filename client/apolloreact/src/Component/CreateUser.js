import React, { useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_USERS } from "../GraphQL/Queries";
import { CREATE_USER_MUTATION } from "../GraphQL/Mutation";

const PET_DETAILS = gql`
  fragment PetDetails on Pet {
    id
    type
    name
    img
  }
`

const GET_PETS = gql`
  query AllPets { pets{
    id
    type
    name
    img
    age @client
    }}
`

const CREATE_PET = gql`
  mutation CreatePet($input: NewPetInput!) {
    addPet(input: $input) {
      ...PetDetails
    }
  }
  ${PET_DETAILS}
`;

function CreateUser() {
  const pets = useQuery(GET_PETS)

  const [createPet, newPet] = useMutation(CREATE_PET, {
    update(cache, { data: { addPet } }) {
      const { pets } = cache.readQuery({ query: GET_PETS })

      cache.writeQuery({
        query: GET_PETS,
        data: { pets: [addPet, ...pets] }
      })
    }
  })

  if (pets.loading) return <h1>Loading...</h1>
  if (pets.error || newPet.error) return <p>ERROR</p>

  const addPet = (input) => {
    createPet({
      variables: {input},
    
      optimisticResponse: {
        __typename: 'Mutation',
        addPet: {
          __typename: 'Pet',
          id: Math.round(Math.random() * -1000000) + '',
          type: input.type,
          name: input.name,
          img: 'https://via.placeholder.com/300',
          vacinated: true
        }
      }
    })
  }
  // const { error, loading, data } = useQuery(GET_USERS);
  // const [createUsers, createUserFunctions] = useMutation(CREATE_USER_MUTATION, {
  //   update(cache, { data: { createUser } }) {
  //     const allUser = cache.readQuery({ query: GET_USERS });
  //     console.log("allUser", allUser);
  //     cache.writeQuery({
  //       query: GET_USERS,
  //       data: { getAllUsers: [createUser, ...allUser.getAllUsers] },
  //     });
  //   },
  //    optimisticResponse: {
  //       __typename: "Mutation",
  //       createUser: {
  //         __typename: "User",
  //         id: Date.now(),
  //         name: "sasi",
  //         email: "sasi@gmail.com",
  //         password: "iiiii",
  //       },
  //     },
  // });
  // const adduser = () => {
  //   createUsers({
  //     variables: {
  //       name: "sasi",
  //       email: "sasi@gmail.com",
  //       password: "iiiii",
  //     },
  //     // optimisticResponse: {
  //     //   __typename: "Mutation",
  //     //   createUser: {
  //     //     __typename: "User",
  //     //     id: Date.now(),
  //     //     name: "sasi",
  //     //     email: "sasi@gmail.com",
  //     //     password: "iiiii",
  //     //   },
  //     // },
  //   });
  // };
  // console.log('return',data, createUserFunctions, loading);
  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }
  // if (error) {
  //   return <h1>Error!</h1>;
  // }

  return (
    <div>
      {pets.data.pets.map((user) => (
        <div>{JSON.stringify(user)}</div>
      ))}
      <button onClick={()=>addPet({name: 'gggg', type: 'DOG'})}>click to add</button>{" "}
    </div>
  );
}

export default CreateUser;
