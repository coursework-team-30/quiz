import {rest} from "msw"
import data from "../../../backendData";

export const handlers = [
    rest.get('http://localhost:8091/api/quiz/get10', (req,res,ctx) => {
        return res(
            ctx.json([data])
        )
    })
]

