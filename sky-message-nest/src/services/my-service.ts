import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { lastValueFrom } from 'rxjs';
import { EnvioService } from 'src/modules/envio/envio.service';

@Injectable()
export class MyService {

    constructor(
        private readonly envioService: EnvioService,
        private readonly http: HttpService
    ) {

    }
  @Interval(5000)
  async handleInterval() {
    try {
        let envios = await this.envioService.findAll();
        envios.forEach(async (envio) => {
            const res = await lastValueFrom(this.http.post('http://localhost:3000/envio', envio));
        });
    } catch (error) {
        console.log(error);
    }
  }
}
