import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { combineReducers } from 'redux';

import schoolReducer from '@/redux/Slices/schoolSlice';
import classReducer from '@/redux/Slices/classSlice';
import sectionReducer from "@/redux/Slices/sectionSlice"
import teacherReducer from '@/redux/Slices/TeacherSlice';
import subjectReducer from "@/redux/Slices/SubjectSlice";
import studentReducer from '@/redux/Slices/StudentSlice';
import parentReducer  from "@/redux/Slices/ParentSlice";
import messageReduer from "@/redux/Slices/MessageSlice"



const rootReducer = combineReducers({
  schoolLogin: schoolReducer,
    class:classReducer,
    section:sectionReducer,
    teacher:teacherReducer,
    subject:subjectReducer,
    student:studentReducer,
    parent:parentReducer,
    message:messageReduer
  // Add other reducers
});


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

/*const store = configureStore({
  reducer: {
    schoolLogin: schoolReducer,
    class:classReducer,
    section:sectionReducer,
    teacher:teacherReducer,
    subject:subjectReducer,
    student:studentReducer,
    parent:parentReducer

  }
});

export default store;*/
