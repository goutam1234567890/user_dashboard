const baseUrl = 'https://6756f736c0a427baf94b2bcd.mockapi.io/users'
export async function updateUser(userPayload) {
    const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPayload),
    };
      
      const url = `${baseUrl}/${userPayload.id}`;
  
      const response = await fetch(url, requestOptions);
      return response
}

export async function getAllUsers(pageSize, pageNumber) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };
    const url=`${baseUrl}?page=${pageNumber}&limit=${pageSize}`
    return await fetch(url, options);
}

export async function DeleteUser(id) {
    const options = {
        method: "DELETE"
    }
    const url = `${baseUrl}/${id}`
    return await fetch(url, options)
}

