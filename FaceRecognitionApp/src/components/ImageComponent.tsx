import { Image, StyleSheet } from "react-native";

interface props {
    photo: string;
}

const ImageComponent = ({ photo }: props) => {
    return (
        <Image
            source={{ uri: photo }}
            style={Styles.container}
        />
    );
}

const Styles = StyleSheet.create({
    container: {
        width: 300,
        height: 300,
        marginTop: 20,
        borderRadius: 8,
        alignSelf: 'center',
    },
});

export default ImageComponent;
