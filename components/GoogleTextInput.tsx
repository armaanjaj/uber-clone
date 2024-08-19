import { GoogleInputProps } from "@/types/type";
import { Text, View } from "react-native";

export default function GoogleTextInput({
    icon,
    containerStyle,
    handlePress,
    textInputBackgroundColor,
    initialLocation,
}: GoogleInputProps) {
    return (
        <View
            className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
        >
            <Text>Search</Text>
        </View>
    );
}
