import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="container">
          <h1 class="app-title">
            Teste OutSera - Raspberry Awards
          </h1>
          <p class="app-subtitle">Pior Filme do Golden Raspberry Awards</p>
          
          <!-- Menu de Navegação -->
          <nav class="app-nav">
            <a 
              routerLink="/dashboard" 
              routerLinkActive="active" 
              class="nav-link"
            >
              Dashboard
            </a>
            <a 
              routerLink="/movies" 
              routerLinkActive="active" 
              class="nav-link"
            >
              Lista de Filmes
            </a>
          </nav>
        </div>
      </header>
      
      <main class="app-main">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>
      
      <footer class="app-footer">
        <div class="container">
          <p>&copy; Desenvolvido por: <a href="https://www.linkedin.com/in/bruno-mazzinghy-78779145/" target="_blank" class="developer-link">Bruno Mazzinghy</a>. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg,rgb(82, 82, 83) 0%,rgb(72, 74, 77) 100%);
    }

    .app-header {
      background: rgba(170, 171, 173, 0.1);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding: 2rem 0;
      text-align: center;
    }

    .app-title {
      color: white;
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .app-subtitle {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.1rem;
      margin: 0 0 2rem 0;
      font-weight: 300;
    }

    /* Navegação */
    .app-nav {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      transform: translateY(-2px);
    }

    .nav-link.active {
      background: linear-gradient(135deg, #ffd700, #ffed4e);
      color: #333;
      font-weight: 600;
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
    }

    .app-main {
      flex: 1;
      padding: 2rem 0;
    }

    .app-footer {
      background: rgba(0, 0, 0, 0.1);
      color: rgba(255, 255, 255, 0.7);
      text-align: center;
      padding: 1rem 0;
      font-size: 0.9rem;
    }

    .developer-link {
      color: var(--primary-orange);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .developer-link:hover {
      color: var(--primary-orange-hover);
      text-decoration: underline;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    @media (max-width: 768px) {
      .app-title {
        font-size: 2rem;
      }
      
      .app-subtitle {
        font-size: 1rem;
      }

      .app-nav {
        flex-direction: column;
        align-items: center;
      }

      .nav-link {
        width: 100%;
        max-width: 200px;
        justify-content: center;
      }
    }
  `]
})
export class AppComponent {
  title = 'raspberry-awards-frontend';
} 