import headerSlice from '../features/common/headerSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import userSlice from '../features/common/userSlice'

import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  return configureStore({
    reducer: {
      header : headerSlice,
      rightDrawer : rightDrawerSlice,
      user : userSlice
    }
  })
}
