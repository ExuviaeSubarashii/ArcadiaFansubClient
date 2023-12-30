export async function load({ params }) {
    const episodeId = params.id;
    return {
        props: {
            episodedata: {
                episodeId
            }
        }
    };
}