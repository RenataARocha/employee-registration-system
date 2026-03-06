/**
 * Ponto de entrada da aplicação React.
 *
 * Monta o componente raiz (App) no elemento #root do index.html.
 * StrictMode ativa verificações adicionais em desenvolvimento,
 * como detecção de efeitos colaterais duplicados e uso de APIs depreciadas.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)