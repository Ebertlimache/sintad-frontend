export default interface CreateEntidad {
    tipoDocumento: { idTipoDocumento: number | null };
    tipoContribuyente: { idTipoContribuyente: number | null};
    nroDocumento: string;
    razonSocial: string;
    nombreComercial: string;
    direccion: string;
    telefono: string;
    estado: boolean;
  }