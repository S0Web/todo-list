import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    card: {
        backgroundColor: "white",
        flexDirection: "row",
        height: 115,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        elevation: 4,
    },
    txt: {fontSize: 20},
    img: {
        height: 25,
        width: 25,
    },
})