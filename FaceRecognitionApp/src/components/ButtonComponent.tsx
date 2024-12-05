import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface props {
    onPress: () => void;
    buttonText: string;
    isDisabled?: boolean;
    hasMargin?: boolean;
}

const ButtonComponent = ({ onPress, buttonText, isDisabled = false, hasMargin = false }: props) => {
    const containerStyle = [
        Styles.container,
        hasMargin && { marginTop: 20 },
        isDisabled && { backgroundColor: 'lightgrey' },
    ];

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            style={containerStyle}
        >
            <Text style={Styles.messageStyle}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
};

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'dodgerblue',
        padding: 12,
        borderRadius: 8,
        width: '60%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    messageStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});

export default ButtonComponent;
