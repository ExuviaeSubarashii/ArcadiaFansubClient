import { writable } from "svelte/store";
import type { AdminResponse, TicketBody, TicketDto, TicketReply } from "../../types/types";
import { baseUrl, responseMessageStore } from "../variables";
import currentUser from "../users/user";
import { IsAdmin, IsAuthenticated } from "../users/authentication";
import { IsNullOrEmpty } from "../emptychecker";

export async function CreateTicket(ticketBody: TicketBody) {
    try {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(ticketBody),
            headers: { 'Content-Type': 'application/json' },
        };
        const createTicketResponse = await fetch(`${baseUrl}/Ticket/CreateTicket`, requestOptions);
        if (!createTicketResponse.ok) {
            throw new Error(createTicketResponse.statusText);
        }
        const responseMessage = await createTicketResponse.text();
        responseMessageStore.set(responseMessage);
        window.location.href='/tickets';
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Could not create ticket.');
    }
}
export async function DeleteTicket(ticketId: string) {
    try {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(ticketId),
            headers: { 'Content-Type': 'application/json' },
        };
        const deleteTicketResponse = await fetch(`${baseUrl}/Ticket/DeleteTicket/${ticketId}`, requestOptions);
        if (!deleteTicketResponse.ok) {
            throw new Error(deleteTicketResponse.statusText);
        }
        const responseMessage = await deleteTicketResponse.text();
        responseMessageStore.set(responseMessage);
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Could not create ticket.');
    }
}
export async function GetAllTickets(): Promise<TicketDto[]> {
    if (await IsAuthenticated() === true) {
        try {
            if (await IsAdmin()===true) {

                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                };
                const getAllTicketsResponse = await fetch(`${baseUrl}/Ticket/GetAllTickets`, requestOptions);
                if (!getAllTicketsResponse.ok) {
                    return[];
                    throw new Error(getAllTicketsResponse.statusText);
                }
                const responseMessage: TicketDto[] = await getAllTicketsResponse.json();
                return responseMessage;
            }
            else {

                const body = {
                    userToken: currentUser.userToken
                }
                const requestOptions = {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' },
                };

                const getAllTicketsResponse = await fetch(`${baseUrl}/Ticket/GetAllTicketsByUser`, requestOptions);
                if (!getAllTicketsResponse.ok) {
                    return[];
                    throw new Error(getAllTicketsResponse.statusText);
                }
                const responseMessage: TicketDto[] = await getAllTicketsResponse.json();
                return responseMessage;

            }
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Could not create ticket.');
        }
    }
    else {
        return [];
    }
}
export async function GetSpecificTickets(ticketId: string): Promise<TicketDto> {
    try {
        const body = {
            userToken: currentUser.userToken
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const getSpecificTicketResponse = await fetch(`${baseUrl}/Ticket/GetSpecificTicket/${ticketId}`, requestOptions);

        if (!getSpecificTicketResponse.ok) {
            window.location.href = "/tickets"
            throw new Error(getSpecificTicketResponse.statusText);
        }

        const responseMessage: TicketDto = await getSpecificTicketResponse.json();
        return responseMessage;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Could not create ticket.');
    }

}
export async function GetTicketReplies(ticketId: string): Promise<TicketReply[]> {
    try {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(ticketId),
            headers: { 'Content-Type': 'application/json' },
        };
        const getSpecificTicketResponse = await fetch(`${baseUrl}/Ticket/GetTicketReply/${ticketId}`, requestOptions);

        if (!getSpecificTicketResponse.ok) {
            return[];
            throw new Error(getSpecificTicketResponse.statusText);
        }

        const responseMessage: TicketReply[] = await getSpecificTicketResponse.json();
        return responseMessage;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Could not create ticket.');
    }
}
export async function CreateAdminResponse(adminResponse: AdminResponse) {
    try {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(adminResponse),
            headers: { 'Content-Type': 'application/json' },
        };
        const getSpecificTicketResponse = await fetch(`${baseUrl}/Ticket/CreateAdminResponse`, requestOptions);

        if (!getSpecificTicketResponse.ok) {
            throw new Error(getSpecificTicketResponse.statusText);
        }

        const responseMessage = await getSpecificTicketResponse.text();
        responseMessageStore.set(responseMessage);

    } catch (error) {
        console.error('Error:', error);
        throw new Error('Could not create ticket.');
    }
}
export async function GetTicketByType(ticketType: string): Promise<TicketDto[]> {
    try {
        const body = {
            userToken: currentUser.userToken
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const getSpecificTicketResponse = await fetch(`${baseUrl}/Ticket/GetTicketByType/${ticketType}`, requestOptions);

        if (!getSpecificTicketResponse.ok) {
            return[];
            throw new Error(getSpecificTicketResponse.statusText);
        }

        const responseMessage: TicketDto[] = await getSpecificTicketResponse.json();
        return responseMessage;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Could not create ticket.');
    }
}
export async function UpdateTicketStatus(ticketStatus: string, ticketId: string) {
    const body = {
        ticketId: ticketId,
        ticketStatus: ticketStatus
    }
    try {
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const updateTicketStatusResponse = await fetch(`${baseUrl}/Ticket/UpdateTicket`, requestOptions);

        if (!updateTicketStatusResponse.ok) {
            
            throw new Error(updateTicketStatusResponse.statusText);
        }

        const responseMessage = await updateTicketStatusResponse.text();
        responseMessageStore.set(responseMessage);
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Could not create ticket.');
    }
}
export async function GetTicketById(ticketId: string) {
    let ticketBySearch: TicketDto;
    ticketBySearch = await GetSpecificTickets(ticketId)
    if (ticketBySearch.ticketId !== null) {
        window.location.href = `/tickets/${ticketId}`
        return ticketBySearch;
    }
    else {
        window.location.href = "/404"
    }

}
export async function GetTicketBySearch(inputValue: string): Promise<TicketDto[]> {
    if (IsNullOrEmpty(inputValue)===false) {
        try {
            const body = {
                userToken: currentUser.userToken
            }
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            };
            const getAllTicketsResponse = await fetch(`${baseUrl}/Ticket/GetTicketsBySearch/${inputValue}`, requestOptions);
            if (!getAllTicketsResponse.ok) {
                return [];
                throw new Error(getAllTicketsResponse.statusText);
            }
            const responseMessage: TicketDto[] = await getAllTicketsResponse.json();
            return responseMessage;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Could not create ticket.');
        }
    }
    else {
        return [];
    }
}
export async function DeleteAdminResponse(responseId: any) {
    const body = {
        responseId: responseId,
        userToken: currentUser.userToken
    }
    try {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        };
        const deleteAdminReplyStatusResponse = await fetch(`${baseUrl}/Ticket/DeleteAdminResponse`, requestOptions);

        if (!deleteAdminReplyStatusResponse.ok) {
            throw new Error(deleteAdminReplyStatusResponse.statusText);
        }

        const responseMessage = await deleteAdminReplyStatusResponse.text();
        responseMessageStore.set(responseMessage);
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Could not delete reply.');
    }
}
export const ExportedTickets = writable<TicketDto[]>([]);