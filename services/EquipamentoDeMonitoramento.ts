import { SujeitoObservavel } from "../interfaces/SujeitoObservavel";

export class EquipamentoDeMonitoramento {
    private gerador: () => number;
    private monitorDadosClima: SujeitoObservavel | null = null;
    private temperaturaAtual: number = 0;
    private humidadeAtual: number = 0;
    private pressaoAtual: number = 0;

    constructor() {
        this.gerador = () => Math.random();
        this.temperaturaAtual = this.getNumero(15, 25); 
        this.humidadeAtual = this.getNumero(40,60);
        this.pressaoAtual = this.getNumero(980, 1020);
    }

    public async coletar(): Promise<void> {
        for (let i=0; i < 10; i++)  {
            this.temperaturaAtual = this.getNumero(0, 35);
            this.humidadeAtual = this.getNumero(10, 100);
            this.pressaoAtual = this.getNumero(900, 1100);
            
            if (this.monitorDadosClima) {
                this.monitorDadosClima.dadosMudaram();
            }
        }

        await this.delay(3000);
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    public setMonitorDadosClima(monitor: SujeitoObservavel){
        if(monitor && typeof monitor.dadosMudaram !== "function"){
            throw new Error("Monitor deve implementar metodo: dadosMudaram");
        }

        this.monitorDadosClima = monitor;
    }


    private getNumero(min: number, max: number):number {
        return parseFloat((this.gerador() * (max - min) + min).toFixed(2));
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