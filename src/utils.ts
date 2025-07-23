export const getUsers = async (page: "1" | "2") => {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
        headers: {
            "x-api-key": "reqres-free-v1"
        },
    });
    console.log("Status:", response.status, response);
    if( !response.ok ) {
        throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
}