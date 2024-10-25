import { Text, TouchableOpacity } from "react-native";

interface props {
    onPress: () => void;
    buttonText: string;
    isDisabled?: boolean;
    hasMargin?: boolean;
}

export default function ButtonComponent({ onPress, buttonText, isDisabled, hasMargin }: props) {
    return (
        <TouchableOpacity
            onPress={() => onPress()}
            disabled={isDisabled}
            style={{
                marginTop: hasMargin ? 20 : 0,
                backgroundColor: isDisabled ? 'lightgrey' : 'dodgerblue',
                padding: 12,
                borderRadius: 8,
                width: '60%',
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', textAlign: 'center' }}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
}
