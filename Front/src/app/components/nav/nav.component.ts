  styles: [`
    .nav-container {
      background: rgba(44, 62, 80, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 2px solid var(--primary-orange);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: var(--white);
    }

    .nav-logo {
      font-size: 1.8rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-subtitle {
      font-size: 0.9rem;
      color: var(--lighter-gray);
      font-weight: 400;
    }

    .nav-menu {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-item {
      position: relative;
    }

    .nav-link {
      color: var(--white);
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.3s ease;
      position: relative;
    }

    .nav-link:hover {
      color: var(--primary-orange);
      background: rgba(255, 107, 53, 0.1);
    }

    .nav-link.active {
      color: var(--primary-orange);
      background: rgba(255, 107, 53, 0.15);
      border: 1px solid rgba(255, 107, 53, 0.3);
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 3px;
      background: var(--primary-orange);
      border-radius: 2px;
    }

    /* Responsividade */
    @media (max-width: 768px) {
      .nav-content {
        padding: 0 1rem;
        flex-direction: column;
        gap: 1rem;
      }

      .nav-menu {
        gap: 1rem;
      }

      .nav-link {
        padding: 0.5rem 0.75rem;
        font-size: 0.9rem;
      }

      .nav-logo {
        font-size: 1.5rem;
      }

      .nav-subtitle {
        font-size: 0.8rem;
      }
    }
  `] 