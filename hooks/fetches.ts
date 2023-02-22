import axios from "axios";

export const blogComments = async (id: string) => {
    const { data } = await axios.get(
        `http://localhost:4000/comment/by-blog/${id}`
    );
    return data;
};
