import React, { useEffect } from 'react';
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_USERS } from "../GraphQL/Queries";
import { CREATE_USER_MUTATION } from "../GraphQL/Mutation";

function CreateUser() {
    const { error, loading, data } = useQuery(GET_USERS);
    const [ createUser, createUserFunctions ] = useMutation(CREATE_USER_MUTATION, {update(cache, {data: {createUser}}){
        const allUser = cache.readQuery({ query: GET_USERS });
        console.log('allUser', allUser)
        cache.writeQuery({
            query: GET_USERS,
            data: {getAllUsers: [createUser, ...allUser.getAllUsers]}
        })
    }});
    const adduser = () => {
        createUser({
            variables: {
                name: 'sasi',
                email: 'sasi@gmail.com',
                password: 'iiiii'
            }
        })
    }
    console.log(data, createUserFunctions, loading)
    if(loading || createUserFunctions.loading) {
        return<h1>Loading...</h1>
    }
    if(error) {
        return<h1>Error!</h1>
    }
    
    return ( <div>{data.getAllUsers.map( user => <div>{ JSON.stringify(user)}</div> )}
    <button onClick={adduser} >click to add</button> </div> );
}

export default CreateUser;