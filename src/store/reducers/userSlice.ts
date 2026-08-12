import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface UserData {
    uid: string;
    email?: string | null;
    [key: string]: any;
}

interface userState  {
    userData: UserData | null;
    isLoading: boolean;
}

const initialState: userState = {
    userData: null,
    isLoading: true,
}

const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserData>) => {
            state.userData = action.payload
            state.isLoading = false
            AsyncStorage.setItem('USER_DATA', JSON.stringify(action.payload))
        },
        clearUserData: (state) => {
            state.userData = null
            state.isLoading = false
            AsyncStorage.removeItem('USER_DATA')
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    }
});

export const { setUserData, clearUserData, setLoading } = userSlice.actions
export default userSlice.reducer