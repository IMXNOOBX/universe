import Quoutes from "./list"
export async function GET(req: Request) {
    const random = Math.floor(Math.random() * Quoutes.length)

    return Response.json({
        quote: Quoutes[random]
    }, { status: 200 })
}