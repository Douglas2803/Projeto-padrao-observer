import {Observador} from "./Observador";

export interface SujeitoObservavel {
    registraObservador(o: Observador): void;
    removeObservador(o: Observador): void;
    notificaObservadires(): void;
    dadosMudaram(): void;
}

