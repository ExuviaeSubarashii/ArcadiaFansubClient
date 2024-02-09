export async function load({ params }) {
    const userId = params.user;
    return {
        props: {
            userdata: {
                userId
            }
        }
    };
}