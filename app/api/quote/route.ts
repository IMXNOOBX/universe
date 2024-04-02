import Quoutes from "./list"

/**
 * @brief Get a random quote from the list. TCW quotes.
 * @param req Request
 * @returns Response
 */
export async function GET(req: Request) {
    const random = Math.floor(Math.random() * Quoutes.length)

    return Response.json({
        quote: Quoutes[random]
    }, { status: 200 })
}