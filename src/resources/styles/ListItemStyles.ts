import {StyleSheet} from "react-native";
import ColorRes from "../colors/ColorRes";

export const ListItemStyles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: ColorRes.common.containerBg,
        borderBottomWidth: 1,
        borderBottomColor: ColorRes.common.borderColor,
        paddingHorizontal: 16,
        paddingVertical: 12
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: "500"
    }

});
