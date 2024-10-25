import { Image } from "react-native";

interface props {
    photo: string;
}

export default function ImageComponent({ photo }: props) {
    return (
        <Image
            source={{ uri: photo }}
            style={{
                width: 300,
                height: 300,
                marginTop: 20,
                borderRadius: 8,
                alignSelf: 'center',
            }}
        />
    );
}
