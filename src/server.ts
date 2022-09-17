import express from "express";
import { PrismaClient } from "@prisma/client";
import { convertHourToMin, convertMinToHour } from "./utils/hourConverter";
import cors from "cors";

const app = express();
app.use(express.json())
app.use(cors({}))
const prisma = new PrismaClient()

app.post('/games/:id/ads', async (req: any, res: any) => {
    const gameId = req.params.id
    const body = req.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            timePlaying: body.timePlaying,
            disc: body.disc,
            days: body.days,
            hourIn: convertHourToMin(body.hourIn),
            hourOut: convertHourToMin(body.hourOut),
            voice: body.voice
        }
    })
    return res.status(201).json(ad)
})

app.get('/ads/:adid/discord', async (req: any, res: any) => {
    const id = req.params.adid;
    const ad = await prisma.ad.findUniqueOrThrow({
        where: {
            id: id
        },
        select: { disc: true }
    })

    res.json({ discord: ad.disc });
})

app.get('/games', async (req: any, res: any) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })
    return res.json(games)
})

app.get('/games/:gameid/ads', async (req: any, res: any) => {
    const id = req.params.gameid
    const gameAd = await prisma.ad.findMany({
        where: {
            gameId: id
        },
        select: {
            id: true,
            createdAt: true,
            days: true,
            game: true,
            gameId: true,
            hourIn: true,
            hourOut: true,
            name: true,
            timePlaying: true,
            voice: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    res.json(gameAd.map(ad => {
        return {
            ...ad, days: ad.days.split(','),
            hourIn: convertMinToHour(ad.hourIn),
            hourOut: convertMinToHour(ad.hourOut)
        }
    }));
})

app.listen(3000)