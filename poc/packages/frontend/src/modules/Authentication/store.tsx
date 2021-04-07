import * as React from "react";

type Action = {
  type: string;
  payload: any;
};

interface IAuthenticationStore {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    loggedIn: boolean;
  };
}

const initialState: IAuthenticationStore = {
  user: { id: 0, name: "", email: "", role: "", loggedIn: false },
};

const dispatchInitialState: React.Dispatch<Action> = () => ({
  type: null,
  payload: null,
});

const reducer = (
  state: IAuthenticationStore,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "login": {
      return { ...state, user: { ...action.payload, loggedIn: true } };
    }
    case "logout": {
      return { user: initialState };
    }
    default:
      return initialState;
  }
};

export const AuthenticationStore = React.createContext({
  state: initialState,
  dispatch: dispatchInitialState,
});

const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthenticationStore.Provider value={{ state, dispatch }}>
      {children}
    </AuthenticationStore.Provider>
  );
};

export default AuthenticationProvider;
