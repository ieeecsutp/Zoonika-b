import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import db from "@/libs/db";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const comentarios = await db.comentario.findMany({
        take: 6,
        orderBy: {
          fecha: 'desc',
        },
        include: {
          usuario: {
            select: {
              nombre: true,
            },
          },
        },
      });
      return res.status(200).json(comentarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong while fetching comments' });
    }
  } else if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    console.log("Session in comentarios API:", session);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { mensaje, valoracion } = req.body;

    if (!mensaje) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const comentario = await db.comentario.create({
        data: {
          comentario: mensaje,
          usuarioId: parseInt(session.user.id), // Convert to number
          galeriaId: 1,
          valoracion: valoracion ?? 5,
        },
      });
      res.status(201).json(comentario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
