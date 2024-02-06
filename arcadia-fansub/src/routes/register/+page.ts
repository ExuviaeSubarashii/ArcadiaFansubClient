import { IsAuthenticated } from "../../datas/users/authentication";

export async function load() {
    if (await IsAuthenticated() === true) {
        {
            window.location.href = '/';
        }
    }
}