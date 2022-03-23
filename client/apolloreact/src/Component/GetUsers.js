import React from 'react';
// import { useMutation, gql } from "@apollo/client";
// import { CREATE_USER_MUTATION } from "../GraphQL/Mutation";
// import { GET_USERS } from "../GraphQL/Queries";

function GetUsers() {
    // const [ createUser, {error} ] = useMutation(CREATE_USER_MUTATION, {update(cache, {data: {createUser}}){
    //     const allUser = cache.readQuery({ query: GET_USERS });
    //     console.log('allUser', allUser)
    //     cache.writeQuery({
    //         query: GET_USERS,
    //         data: {getAllUsers: [createUser, ...allUser.getAllUsers]}
    //     })
    // }});
    // const adduser = () => {
    //     createUser({
    //         variables: {
    //             name: 'sasi',
    //             email: 'sasi@gmail.com',
    //             password: 'iiiii'
    //         }
    //     })
    // }
    return ( <div >click to add</div> );
}

export default GetUsers;

