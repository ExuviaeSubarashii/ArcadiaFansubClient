export async function load({ params }) {
    const animename = params.animename;
    return {
        props: {
            animedata: {
                animename
            }
        }
    };
}