export async function load({ params }) {
    const ticketnumber = params.id;
    return {
        props: {
            ticketdata: {
                ticketnumber
            }
        }
    };
}