import { writable } from "svelte/store";
import type { AdminResponse, TicketBody, TicketDto, TicketReply } from "../../types/types";
import { baseUrl, responseMessageStore } from "../variables";

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
    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const getAllTicketsResponse = await fetch(`${baseUrl}/Ticket/GetAllTickets`, requestOptions);
        if (!getAllTicketsResponse.ok) {
            throw new Error(getAllTicketsResponse.statusText);
        }
        const responseMessage: TicketDto[] = await getAllTicketsResponse.json();
        return responseMessage;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Could not create ticket.');
    }
}
export async function GetSpecificTickets(ticketId: string): Promise<TicketDto> {
    try {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(ticketId),
            headers: { 'Content-Type': 'application/json' },
        };
        const getSpecificTicketResponse = await fetch(`${baseUrl}/Ticket/GetSpecificTicket/${ticketId}`, requestOptions);

        if (!getSpecificTicketResponse.ok) {
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
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(ticketType),
            headers: { 'Content-Type': 'application/json' },
        };
        const getSpecificTicketResponse = await fetch(`${baseUrl}/Ticket/GetTicketByType/${ticketType}`, requestOptions);

        if (!getSpecificTicketResponse.ok) {
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
export const ExportedTickets = writable<TicketDto[]>([]);