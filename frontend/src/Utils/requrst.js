import axios from "axios"

const request=axios.create({
    baseURL:"https://sketch-blog-server-rho.vercel.app"
});

export default request
