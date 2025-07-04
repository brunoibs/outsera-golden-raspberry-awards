import { Request, Response } from "express";
import getProducerIntervals from "../services/award-service";

/**
 * @swagger
 * components:
 *   schemas:
 *     AwardInterval:
 *       type: object
 *       properties:
 *         producers:
 *           type: string
 *           description: Nome do(s) produtor(es)
 *           example: "Joel Silver"
 *         interval:
 *           type: integer
 *           description: Intervalo em anos entre as duas vitórias
 *           example: 1
 *         previousWin:
 *           type: integer
 *           description: Ano da primeira vitória
 *           example: 1990
 *         followingWin:
 *           type: integer
 *           description: Ano da segunda vitória
 *           example: 1991
 *     AwardIntervalsResponse:
 *       type: object
 *       properties:
 *         min:
 *           type: array
 *           description: Lista de produtores com menor intervalo entre vitórias
 *           items:
 *             $ref: '#/components/schemas/AwardInterval'
 *         max:
 *           type: array
 *           description: Lista de produtores com maior intervalo entre vitórias
 *           items:
 *             $ref: '#/components/schemas/AwardInterval'
 */

/**
 * @swagger
 * /api/awards/producer-intervals:
 *   get:
 *     summary: Obtém os intervalos de prêmios dos produtores
 *     description: Retorna os produtores com o menor e maior intervalo entre duas vitórias consecutivas nos Golden Raspberry Awards
 *     tags: [Awards]
 *     responses:
 *       200:
 *         description: Sucesso - Retorna os intervalos de prêmios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AwardIntervalsResponse'
 *             example:
 *               min:
 *                 - producers: "Joel Silver"
 *                   interval: 1
 *                   previousWin: 1990
 *                   followingWin: 1991
 *               max:
 *                 - producers: "Matthew Vaughn"
 *                   interval: 13
 *                   previousWin: 2002
 *                   followingWin: 2015
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error getting awards ranges"
 *                 error:
 *                   type: string
 */
const getProducerIntervalsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getProducerIntervals();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error getting awards ranges", error });
  }
};

export default getProducerIntervalsController;
