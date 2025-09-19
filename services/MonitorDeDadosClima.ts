import { SujeitoObservavel } from "../interfaces/SujeitoObservavel";
import { Observador } from "../interfaces/Observador";
import { EquipamentoDeMonitoramento } from "./EquipamentoDeMonitoramento";

export class MonitorDeDadosClima implements SujeitoObservavel{
    private const observadores: Observador[] = [];
    private const temperatura: number = 0;
    private const humidade: number = 0;
    private const pressao: number = 0;
    private const equipamento: EquipamentoDeMonitoramento;

    constructor(equipamento: EquipamentoDeMonitoramento)  {
        this.equipamento = equipamento;
        this.temperatura = this.equipamento.getTemperaturaAtual();
        this.humidade = this.equipamento.getHumidadeAtual();
        this.pressao = this.equipamento.getPressaoatual();
    }

    registraObresvador(o: Observador): void {
        if (!this.observadores.includes(o)) {
            this.observadores.push(o);
            o.atualizar(this.temperatura, this.humidade, this.pressao);
        }
    }

    removeObservador(o: Observador): void {
        this.observadores = this.observadores.filter(obs => obs !== o);
    }

    notificaObservadores(): void {
        for (const obs of this.observadores){
            obs.atualizar(this.temperatura, this.humidade, this.pressao);
        }
    }

    dadosMudaram(): void {
        this.temperatura = this.equipamento.getTemperaturaAtual();
        this.humidade = this.equipamento.getHumidadeAtual();
        this.pressao = this.equipamento.getPressaoatual();
        this.notificaObservadores();
    }

}