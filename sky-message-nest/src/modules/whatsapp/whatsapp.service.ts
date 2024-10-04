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
    try {
      const { instance, token } = await this.usuarioService.findOne(idUsuario);
      const url = `https://api.ultramsg.com/${instance}/instance/status?token=${token}`;

      const call = await lastValueFrom(this.http.get(url));

      if (call?.data) {
        return call?.data;
      } else {
        throw new NotFoundException('Estado no encontrado');
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al obtener el estado');
    }
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

    const url = `https://api.ultramsg.com/${instance}/instance/logout`;

    const res: any = await lastValueFrom(this.http.post(url, data, headers));

    if (res.data?.success == 'done') {
      return { message: 'Sesión cerrada' };
    } else {
      throw new InternalServerErrorException('Error al cerrar sesión');
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
      const data = response?.data;
      if (!data) {
        throw new NotFoundException('Perfil no encontrado');
      }

      console.log(data);

      return {
        phone: data?.id,
        nombre: data?.name,
        imagen: data?.profile_picture,
        is_business: data?.is_business,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener el perfil');
    }
  }
}
