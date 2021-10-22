
export interface RespuestaPosts {
    ok: boolean;
    pagina: number;
    posts: Post[];
  }

  export interface RespuestaReport {
    ok: boolean;
    pagina: number;
    reports: Report[];
  }

  export interface RespuestaComments {
    ok: boolean;
    comments: Comment[];
  }


  export interface RespuestaTypeReport {
    ok: boolean;
    typeReports: TypeReport[];
  }

  export interface GetReport {
    ok: boolean;
    report: Report;
  }
  
  export interface Comment{
    _id?: string;
    created?: string;
    comment: string;
    user?: Usuario;
    status?: string;
    reference: string;
  }
  
  
  export interface Post {
    imgs?: string[];
    _id?: string;
    message?: string;
    likes:string[];
    coords?: string;
    user?: Usuario;
    created?: string;
  }
  
  export interface Report {
    imgs?: string[];
    _id?: string;
    message?: string;
    type?:TypeReport;
    coords?: string;
    user?: Usuario;
    created?: string;
  }

  export interface Usuario {
    image?: string;
    _id?: string;
    names?: string;
    surnames?: string;
    email?: string;
    cui?: string;
    phone?: string;
    password?:string;
  }

  export interface TypeReport {
    _id?: string;
    name?: string;
    status?: string;
  
  }
  
  