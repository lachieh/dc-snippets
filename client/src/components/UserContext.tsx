import ApiService from '../api/index';
import { User } from '../api/index';
import React, {
  createContext,
  PropsWithChildren,
  Reducer,
  useReducer,
  useContext,
  useEffect,
} from 'react';

enum Types {
  USER_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
}

interface State {
  loading: boolean;
  user?: User;
}

type Action =
  | { type: Types.USER_LOADING }
  | { type: Types.USER_LOGIN_SUCCESS; user: User }
  | { type: Types.USER_LOGIN_FAILURE }
  | { type: Types.USER_LOGOUT };

const UserContext = createContext({
  state: { loading: false },
  dispatch: (a: any) => a,
});

function userReducer(state: State, action: Action): State {
  switch (action.type) {
    case Types.USER_LOGIN_SUCCESS:
      return { ...state, user: action.user, loading: false };
    case Types.USER_LOGIN_FAILURE:
    case Types.USER_LOGOUT:
      const newState = { ...state, loading: false };
      delete newState.user;
      return newState;
    case Types.USER_LOADING:
      return { ...state, loading: true };
  }
}

export function UserContextProvider({ children }: PropsWithChildren<any>) {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(userReducer, {
    loading: true,
  });

  useEffect(() => {
    dispatch({
      type: Types.USER_LOADING,
    });
    const apiService = new ApiService();
    apiService.getCurrentUser().then((user) => {
      if (!user) {
        dispatch({
          type: Types.USER_LOGIN_FAILURE,
        });
      } else {
        dispatch({
          type: Types.USER_LOGIN_SUCCESS,
          user,
        });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): [State, (state: State, action: Action) => State] {
  const { state, dispatch } = useContext(UserContext);
  return [state, dispatch];
}
