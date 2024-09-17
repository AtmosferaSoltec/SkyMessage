import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class WhatsappService {
  constructor(
    private readonly http: HttpService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async getQR(idUsuario: number) {
    const { instance, token } = await this.usuarioService.findOne(idUsuario);
    const response = await this.http
      .get(
        `https://api.ultramsg.com/${instance}/instance/qrCode?token=${token}`,
      )
      .toPromise();
    const data = response.data?.qrCode;
    if (data) {
      return { qrCode: data };
    } else {
      throw new NotFoundException('QR Code not found');
    }
  }

  async getEstado(idUsuario: number) {
    const { instance, token } = await this.usuarioService.findOne(idUsuario);
    const response = await this.http
      .get(
        `https://api.ultramsg.com/${instance}/instance/status?token=${token}`,
      )
      .toPromise();
    const data = response.data?.status?.accountStatus?.status;
    return { estado: data == 'authenticated' };
  }

  async logout(idUsuario: number) {
    const { instance, token } = await this.usuarioService.findOne(idUsuario);

    const data = new URLSearchParams();
    data.append('token', token);

    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const res = await this.http
      .post(
        `https://api.ultramsg.com/${instance}/instance/logout`,
        data,
        headers,
      )
      .toPromise();

    if (res.data?.message?.success == 'done') {
      return 'Logout exitoso';
    } else {
      return 'Logout fallido';
    }
  }
}
