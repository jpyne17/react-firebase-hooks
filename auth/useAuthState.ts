import { auth, User } from 'firebase';
import { useEffect } from 'react';
import { LoadingHook, useLoadingValue } from '../util';

export type AuthStateHook = LoadingHook<User, auth.Error>;

export default (auth: auth.Auth): AuthStateHook => {
  const { error, loading, setError, setValue, value } = useLoadingValue<
    User,
    auth.Error
  >(auth ? () => auth.currentUser : null);

  useEffect(
    () => {
      if (auth === null) return;
      const listener = auth.onAuthStateChanged(setValue, setError);

      return () => {
        listener();
      };
    },
    [auth]
  );

  if (auth === null) return [null, null, null];

  return [value, loading, error];
};
