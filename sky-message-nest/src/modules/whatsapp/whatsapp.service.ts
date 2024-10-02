import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioService } from '../admin/usuario/usuario.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WhatsappService {
  constructor(
    private readonly http: HttpService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async getQR(idUsuario: number) {
    const { instance, token } = await this.usuarioService.findOne(idUsuario);
    const response = await lastValueFrom(
      this.http.get(
        `https://api.ultramsg.com/${instance}/instance/qrCode?token=${token}`,
      ),
    );
    const data = response.data?.qrCode;
    if (data) {
      return { qrCode: data };
    } else {
      throw new NotFoundException('QR Code not found');
    }
  }

  async getEstado(idUsuario: number) {
    const { instance, token } = await this.usuarioService.findOne(idUsuario);
    const res = await lastValueFrom(
      this.http.get(
        `https://api.ultramsg.com/${instance}/instance/status?token=${token}`,
      ),
    );
    return res;
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

  async getPerfil(idUsuario: number) {
    try {
      const { instance, token } = await this.usuarioService.findOne(idUsuario);
      const response = await lastValueFrom(
        this.http.get(
          `https://api.ultramsg.com/${instance}/instance/me?token=${token}`,
        ),
      );
      const data = response?.data
      if (!data) {
        throw new NotFoundException('Perfil no encontrado');
      }

      console.log(data);
      
      return {
        phone: data?.id,
        nombre: data?.name,
        imagen: data?.profile_picture,
        is_business: data?.is_business
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener el perfil');
    }
  }
}
