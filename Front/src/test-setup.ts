// Configuração global para testes
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Primeiro, inicialize o ambiente de teste do Angular
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Declarações globais para tipos de teste
declare global {
  namespace jasmine {
    interface Matchers<T> {
      // Adicione matchers customizados aqui se necessário
    }
  }
}

// Configurações globais do Jasmine
beforeEach(() => {
  // Configurações que devem ser executadas antes de cada teste
});

afterEach(() => {
  // Limpeza que deve ser executada após cada teste
}); 