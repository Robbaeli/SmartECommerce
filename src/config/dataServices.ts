import { collection, getDocs, doc, DocumentData } from "firebase/firestore"
import { db } from "./firebase"



export const getProductsData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"))
        const list: DocumentData[] = []

        querySnapshot.forEach((doc) => {
            list.push(doc.data())
        })
        return list
    } catch (error) {
        console.error("Error getting products data: ", error)
    }
}

export const fetchUserOrders = async (userId: string) => {
    try {
        const userOrdersRef = collection(doc(db, "users", userId), "orders")
       

        const querySnapshot = await getDocs(userOrdersRef)
        const ordersList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        return ordersList
    } catch (error) {
        console.error("Error fetching user orders: ", error);
    }
}

