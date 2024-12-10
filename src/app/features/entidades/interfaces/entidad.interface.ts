export default interface Entidad {
    idEntidad: number;
    tipoDocumento: { idTipoDocumento: number };
    tipoContribuyente: { idTipoContribuyente: number };
    nroDocumento: string;
    razonSocial: string;
    nombreComercial: string;
    direccion: string;
    telefono: string;
    estado: boolean;
  }