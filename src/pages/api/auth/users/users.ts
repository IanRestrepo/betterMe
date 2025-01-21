export const prerender = false;
import type { APIRoute } from 'astro';

const users = [
    { username: 'Ian Restrepo', password: 'password123', email: 'ian@betterMe.com', emailVerified: false },
    { username: 'Isabella Restrepo', password: 'password123', email: 'ian@betterMe.com', emailVerified: true },
    { username: 'Alhaya Restrepo', password: 'password123', email: 'ian@betterMe.com', emailVerified: false },
    { username: 'Billie Eilish', password: 'iloveian', email: 'billie@imperfect.com', emailVerified: true },
]

export const GET: APIRoute = ({ request }) => {

    return new Response(
        JSON.stringify({ message: 'Ok!', users: users }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
};

export const POST: APIRoute = async ({ request }) => {
    try {
        // Parsear los datos
        console.log('Receiving request...');
        const data = await request.json();
        const { username, password, email, emailVerified } = data;
        console.log('Parsed data:', data);

        // Validar campos requeridos
        if (!username || !password || !email || typeof emailVerified !== 'boolean') {
            return new Response(
                JSON.stringify({ error: 'Invalid data. Required: username, password, email, emailVerified' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Agregar al arreglo de usuarios
        users.push({ username, password, email, emailVerified });

        // Respuesta exitosa
        return new Response(
            JSON.stringify({ message: 'User added successfully', users }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        // Log del error para depuración
        console.error('Error processing POST request:', error);

        // Devolver un error genérico al cliente
        return new Response(
            JSON.stringify({ errorMessage: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
/*
export const PUT: APIRoute = async ({ request, params }) => {

    try {
        const { username } = params;
        const data = await request.json();

        const userIndex = users.findIndex( user => user.username === username );

        if ( !userIndex ) {
            return new Response(
                JSON.stringify({ error: 'User not found' }),
                { status: 404, headers: {
                    'Content-Type': 'application/json'
                }}
            );
        };

        users[userIndex] = { ...users[userIndex], ...data };

        return new Response(
            JSON.stringify({ message: 'Ok! user updated'}),
            { status: 200, headers: {
                'Content-Type': 'application/json'
            }}
        );
    } catch ( error ) {
        return new Response(
            JSON.stringify( { message: 'Internal Server Error 500', details: error instanceof Error ? error.message : 'Unknown error' }),
            { status: 500, headers: {
                'Content-Type': 'application/json'
            }}
        );
    }

}
*/