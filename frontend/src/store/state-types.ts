export interface IRootState {
  version: string;
}

export interface IAuth {
  isAuthenticated: boolean | undefined;
  email: string;
  password: string;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IAuthModule {
  auth: IAuth,
}

export interface ISetIsAuthenticated extends Omit<IAuth, 'isAuthenticated' | 'loading' | 'error' | 'errorMessage'> {
  isAuthenticated: boolean;
}
