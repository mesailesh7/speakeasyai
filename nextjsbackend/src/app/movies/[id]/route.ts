import { movies } from '../db'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;

    // we are using + to convert it to the number or we can also use Number(id) to convert it to the number
    const movie = movies.find(movie => movie.id === +id);

    return movie ? new Response(JSON.stringify(movie)) : new Response("Movie not found", { status: 404 })
}


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const movieId = +id;

    //check if the movie exists
    const movie = movies.find(m => m.id === movieId)

    if (!movie) {
        return new Response(JSON.stringify({ error: "Movie not found :(" }), { status: 404 })
    }


}