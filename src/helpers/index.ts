import request, {Test} from "supertest";
import {Handler} from "../handler";
import {API_URL} from "../config/constants";

export const GET = (url: string) => {
    return request(Handler.app).get(`${API_URL}/${url}`) as Test;
}

export const POST = (url: string, body: any) => {
    return request(Handler.app).post(`${API_URL}/${url}`).send(body) as Test;
}
