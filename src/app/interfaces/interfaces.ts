
export interface RespuestaPosts {
    ok: boolean;
    pagina: number;
    posts: Post[];
  }
  
  export interface Post {
    imgs?: string[];
    _id?: string;
    mensaje?: string;
    coords?: string;
    usuario?: Usuario;
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
  
  