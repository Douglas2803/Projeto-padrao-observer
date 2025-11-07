import * as dotenv from "dotenv";
dotenv.config();

import { SujeitoObservavel } from "../interfaces/SujeitoObservavel";
export class EquipamentoDeMonitoramento {
  private monitorDadosClima: SujeitoObservavel | null = null;
  private temperaturaAtual: number = 0;
  private humidadeAtual: number = 0;
  private pressaoAtual: number = 0;

  private readonly API_KEY = process.env.API_KEY;
  private readonly BASE_URL = process.env.BASE_URL;

  constructor() {
    if (!this.API_KEY || !this.BASE_URL) {
      throw new Error("As variáveis de ambiente não foram carregadas");
    }
  }

  public async coletar(): Promise<void> {
    try {
      const cidade = "Caxias do Sul";
      const url = `${this.BASE_URL}?q=${cidade}&appid=${this.API_KEY}&units=metric`;

      const resposta = await fetch(url);
      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(`Erro na API: ${resposta.statusText}`);
      }

      console.log(dados);

      //AJUSTAR
      // this.getTemperaturaAtual = dados.main.temp;
      // this.getHumidadeAtual = dados.main.humidity;
      // this.pressaoAtual = dados.main.pressure;

      if (this.monitorDadosClima) {
        this.monitorDadosClima.dadosMudaram();
      }
    } catch (error) {
      console.error("Erro ao coletar dados da API:");
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public setMonitorDadosClima(monitor: SujeitoObservavel) {
    if (monitor && typeof monitor.dadosMudaram !== "function") {
      throw new Error("Monitor deve implementar metodo: dadosMudaram");
    }

    this.monitorDadosClima = monitor;
  }

  public getTemperaturaAtual(): number {
    return this.temperaturaAtual;
  }

  public getHumidadeAtual(): number {
    return this.humidadeAtual;
  }

  public getPressaoatual(): number {
    return this.pressaoAtual;
  }
}
