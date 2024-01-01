import { GetAllAnimes } from '../../datas/animes/getanimes';
import { IsAdmin } from '../../datas/users/authentication';

export async function load() {
    try {
        const adminCheck = await IsAdmin();
        await GetAllAnimes();
        return{
            props: {
                isUserAdmin: {
                    adminCheck
                }
            }
        };
    } catch (error) {
        console.error("Error loading data:", error);
        return {
            props: {
                isUserAdmin: {
                    adminCheck: false
                }
            }
        };
    }
}
