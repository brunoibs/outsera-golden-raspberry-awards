/// <reference types="jest" />
import request from "supertest";
import app from "../src/app";
import loadCsvData from "../src/services/load-csv-data";
import { AwardIntervalsResponse } from "../src/types";

// Configuração global para os testes - carrega os dados CSV antes de executar os testes
beforeAll(async () => {
  await loadCsvData();
});

describe("API Integration Tests", () => {
  describe("GET /api/awards/producer-intervals", () => {
    // Teste principal: verifica se a API retorna os intervalos corretos dos produtores
    it("should return the correct award intervals for producers", async () => {
      // Resposta esperada baseada nos dados conhecidos do CSV
      const expectedResponse: AwardIntervalsResponse = {
        min: [
          {
            producers: "Joel Silver",
            interval: 1,
            previousWin: 1990,
            followingWin: 1991,
          },
        ],
        max: [
          {
            producers: "Matthew Vaughn",
            interval: 13,
            previousWin: 2002,
            followingWin: 2015,
          },
        ],
      };

      const res = await request(app).get("/api/awards/producer-intervals");
      
      // Verifica se o status da resposta é 200 (sucesso)
      expect(res.statusCode).toBe(200);
      // Verifica se a resposta contém as propriedades esperadas
      expect(res.body).toHaveProperty("min");
      expect(res.body).toHaveProperty("max");
      // Verifica se a resposta é exatamente igual ao esperado
      expect(res.body).toEqual(expectedResponse);
    });

    // Teste básico: verifica se o endpoint retorna status 200
    it("should return 200 status code", async () => {
      const res = await request(app).get("/api/awards/producer-intervals");
      expect(res.statusCode).toBe(200);
    });

    // Teste de tipo de conteúdo: verifica se a resposta é JSON
    it("should return JSON content type", async () => {
      const res = await request(app).get("/api/awards/producer-intervals");
      expect(res.headers["content-type"]).toMatch(/application\/json/);
    });

    // Teste de estrutura: verifica se o array 'min' tem a estrutura correta
    it("should have min array with correct structure", async () => {
      const res = await request(app).get("/api/awards/producer-intervals");
      
      // Verifica se é um array e não está vazio
      expect(Array.isArray(res.body.min)).toBe(true);
      expect(res.body.min.length).toBeGreaterThan(0);
      
      // Verifica se o primeiro elemento tem todas as propriedades necessárias
      const minInterval = res.body.min[0];
      expect(minInterval).toHaveProperty("producers");
      expect(minInterval).toHaveProperty("interval");
      expect(minInterval).toHaveProperty("previousWin");
      expect(minInterval).toHaveProperty("followingWin");
      
      // Verifica se os tipos de dados estão corretos
      expect(typeof minInterval.producers).toBe("string");
      expect(typeof minInterval.interval).toBe("number");
      expect(typeof minInterval.previousWin).toBe("number");
      expect(typeof minInterval.followingWin).toBe("number");
    });

    // Teste de estrutura: verifica se o array 'max' tem a estrutura correta
    it("should have max array with correct structure", async () => {
      const res = await request(app).get("/api/awards/producer-intervals");
      
      // Verifica se é um array e não está vazio
      expect(Array.isArray(res.body.max)).toBe(true);
      expect(res.body.max.length).toBeGreaterThan(0);
      
      // Verifica se o primeiro elemento tem todas as propriedades necessárias
      const maxInterval = res.body.max[0];
      expect(maxInterval).toHaveProperty("producers");
      expect(maxInterval).toHaveProperty("interval");
      expect(maxInterval).toHaveProperty("previousWin");
      expect(maxInterval).toHaveProperty("followingWin");
      
      // Verifica se os tipos de dados estão corretos
      expect(typeof maxInterval.producers).toBe("string");
      expect(typeof maxInterval.interval).toBe("number");
      expect(typeof maxInterval.previousWin).toBe("number");
      expect(typeof maxInterval.followingWin).toBe("number");
    });

    // Teste de cálculo: verifica se os intervalos são calculados corretamente
    it("should have valid interval calculations", async () => {
      const res = await request(app).get("/api/awards/producer-intervals");
      
      // Verifica se o intervalo mínimo é calculado corretamente
      const minInterval = res.body.min[0];
      expect(minInterval.followingWin - minInterval.previousWin).toBe(minInterval.interval);
      
      // Verifica se o intervalo máximo é calculado corretamente
      const maxInterval = res.body.max[0];
      expect(maxInterval.followingWin - maxInterval.previousWin).toBe(maxInterval.interval);
    });

    // Teste de lógica de negócio: verifica se o intervalo mínimo é menor ou igual ao máximo
    it("should have min interval less than or equal to max interval", async () => {
      const res = await request(app).get("/api/awards/producer-intervals");
      
      const minInterval = res.body.min[0];
      const maxInterval = res.body.max[0];
      
      expect(minInterval.interval).toBeLessThanOrEqual(maxInterval.interval);
    });

    // Teste de validação: verifica se os anos são números positivos
    it("should have valid years (positive numbers)", async () => {
      const res = await request(app).get("/api/awards/producer-intervals");
      
      const minInterval = res.body.min[0];
      const maxInterval = res.body.max[0];
      
      expect(minInterval.previousWin).toBeGreaterThan(0);
      expect(minInterval.followingWin).toBeGreaterThan(0);
      expect(maxInterval.previousWin).toBeGreaterThan(0);
      expect(maxInterval.followingWin).toBeGreaterThan(0);
    });

    // Teste de lógica temporal: verifica se o ano seguinte é maior que o anterior
    it("should have followingWin greater than previousWin", async () => {
      const res = await request(app).get("/api/awards/producer-intervals");
      
      const minInterval = res.body.min[0];
      const maxInterval = res.body.max[0];
      
      expect(minInterval.followingWin).toBeGreaterThan(minInterval.previousWin);
      expect(maxInterval.followingWin).toBeGreaterThan(maxInterval.previousWin);
    });
  });

  describe("Error handling tests", () => {
    // Teste de rota inválida: verifica se retorna 404 para rotas inexistentes
    it("should handle invalid routes gracefully", async () => {
      const res = await request(app).get("/api/invalid-route");
      expect(res.statusCode).toBe(404);
    });

    // Teste de rota raiz: verifica se retorna 404 para o caminho raiz
    it("should handle root path", async () => {
      const res = await request(app).get("/");
      expect(res.statusCode).toBe(404);
    });

    // Teste de método HTTP inválido: verifica se retorna 404 para POST
    it("should handle POST method on producer-intervals endpoint", async () => {
      const res = await request(app).post("/api/awards/producer-intervals");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("API Documentation tests", () => {
    // Teste de documentação Swagger: verifica se a documentação está acessível
    it("should serve Swagger documentation", async () => {
      const res = await request(app).get("/api-docs/");
      expect(res.statusCode).toBe(200);
    });

    // Teste de interface Swagger: verifica se a UI do Swagger está acessível
    it("should have Swagger UI accessible", async () => {
      const res = await request(app).get("/api-docs/");
      expect(res.statusCode).toBe(200);
    });
  });
});
