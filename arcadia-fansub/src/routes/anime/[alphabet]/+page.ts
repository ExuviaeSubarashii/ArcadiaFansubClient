export async function load({ params }) {
    const alphabet = params.alphabet;
    return {
        props: {
            querydata: {
                alphabet
            }
        }
    };
}