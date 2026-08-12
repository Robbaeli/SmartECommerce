import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import MyOrdersScreen from "../screens/profile/MyOrdersScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUserData } from "../store/reducers/userSlice";
import { useEffect } from "react";

import type { RootState } from "../store";
import { ActivityIndicator, View } from "react-native";
import { AppColors } from "../styles/colors";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createStackNavigator()

export default function MainAppStack() {
    const dispatch = useDispatch();
    const { userData, isLoading } = useSelector((state: RootState) => state.userSlice);

    const isUserLoggedIn = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem('USER_DATA')
            if (storedUserData) {
                dispatch(setUserData(JSON.parse(storedUserData)))
            }else   {
                dispatch(setLoading(false))
            }
        } catch (error) {
            console.error("Error retrieving user data from storage:", error);
        }
    }

    useEffect(() => {
        isUserLoggedIn()
    }, [])

        useEffect(() => {
            onAuthStateChanged(auth, (userData) => {
                if (userData) {
                    console.log("User is logged in:", userData);

                } else {
                    console.log("User is logged out");
                }
            });
        }, []);


    if (isLoading) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={AppColors.primary} />
        </View>
        );
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={userData?.uid && !isLoading ? "MainAppBottomTabs" : "AuthStack"}
        >
            <Stack.Screen name="AuthStack" component={AuthStack}/>
            <Stack.Screen name="MainAppBottomTabs" component={MainAppBottomTabs} />
            <Stack.Screen name="CheckoutScreen" options={{headerShown: true}} component={CheckoutScreen} />
            <Stack.Screen name="MyOrdersScreen" options={{headerShown: true}} component={MyOrdersScreen} />
        </Stack.Navigator>
    )

}