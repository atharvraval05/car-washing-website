import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  isMock,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged 
} from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // Load mock users database or initialize
  const getMockUsers = () => {
    const users = localStorage.getItem('as_shine_mock_users');
    return users ? JSON.parse(users) : {};
  };

  const saveMockUser = (email, password, displayName) => {
    const db = getMockUsers();
    db[email.toLowerCase()] = { password, displayName, uid: 'mock_uid_' + Math.random().toString(36).substr(2, 9) };
    localStorage.setItem('as_shine_mock_users', JSON.stringify(db));
    return db[email.toLowerCase()];
  };

  useEffect(() => {
    if (!isMock && auth) {
      // Real Firebase observer
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || 'Client User',
            photoURL: firebaseUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${firebaseUser.uid}`,
            isGoogle: firebaseUser.providerData[0]?.providerId === 'google.com'
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // Mock session observer
      const sessionUser = localStorage.getItem('as_shine_mock_session');
      if (sessionUser) {
        setUser(JSON.parse(sessionUser));
      }
      setLoading(false);
    }
  }, []);

  const loginWithEmail = async (email, password) => {
    setErrorMsg(null);
    setLoading(true);
    try {
      if (!isMock && auth) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        // User state will update via observer
        return result.user;
      } else {
        // Mock auth logic
        const db = getMockUsers();
        const existing = db[email.toLowerCase()];
        if (!existing) {
          // For easy developer demo, auto-register them if user db is empty or just auto-create
          const newMock = saveMockUser(email, password, email.split('@')[0]);
          const logged = {
            uid: newMock.uid,
            email: email,
            displayName: newMock.displayName,
            photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${newMock.uid}`,
            isGoogle: false
          };
          localStorage.setItem('as_shine_mock_session', JSON.stringify(logged));
          setUser(logged);
          return logged;
        }
        if (existing.password !== password) {
          throw new Error("Incorrect credentials (simulated auth).");
        }
        const logged = {
          uid: existing.uid,
          email: email,
          displayName: existing.displayName,
          photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${existing.uid}`,
          isGoogle: false
        };
        localStorage.setItem('as_shine_mock_session', JSON.stringify(logged));
        setUser(logged);
        return logged;
      }
    } catch (err) {
      setErrorMsg(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signupWithEmail = async (email, password, displayName) => {
    setErrorMsg(null);
    setLoading(true);
    try {
      if (!isMock && auth) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        // We can update displayName via updateProfile in firebase, or just let observer run
        return result.user;
      } else {
        const db = getMockUsers();
        if (db[email.toLowerCase()]) {
          throw new Error("Email already registered in local mock db.");
        }
        const newMock = saveMockUser(email, password, displayName || email.split('@')[0]);
        const logged = {
          uid: newMock.uid,
          email: email,
          displayName: newMock.displayName,
          photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${newMock.uid}`,
          isGoogle: false
        };
        localStorage.setItem('as_shine_mock_session', JSON.stringify(logged));
        setUser(logged);
        return logged;
      }
    } catch (err) {
      setErrorMsg(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      if (!isMock && auth && googleProvider) {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
      } else {
        // Simulate google login popup delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        const uid = 'google_mock_' + Math.random().toString(36).substr(2, 9);
        const logged = {
          uid: uid,
          email: 'shine.guest@gmail.com',
          displayName: 'Premium Wash Guest',
          photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${uid}`,
          isGoogle: true
        };
        localStorage.setItem('as_shine_mock_session', JSON.stringify(logged));
        setUser(logged);
        return logged;
      }
    } catch (err) {
      setErrorMsg(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (!isMock && auth) {
        await signOut(auth);
      } else {
        localStorage.removeItem('as_shine_mock_session');
        setUser(null);
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      errorMsg,
      isMock,
      loginWithEmail,
      signupWithEmail,
      loginWithGoogle,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
