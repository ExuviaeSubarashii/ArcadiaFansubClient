export async function load({ params }) {
    const querynumber = params.q;
    return {
        props: {
            querydata: {
                querynumber
            }
        }
    };
}