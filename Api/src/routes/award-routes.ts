import express from "express";
import getProducerIntervals from "../controllers/award-controller";

/**
 * @swagger
 * tags:
 *   name: Awards
 *   description: Endpoints relacionados aos Golden Raspberry Awards
 */

const router = express.Router();

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
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/awards/producer-intervals", getProducerIntervals);

export default router;
