import { Snackbar } from "react-native-paper"

const ThemedSnackbar: React.FC<{
    visible: boolean,
    setVisibility: (visibile: boolean) => void,
    message: string, 
    isError: boolean
}> = ({ visible, setVisibility, message, isError }) => {
    return (
        <Snackbar
            className={`w-11/12 mx-auto mb-5 ${isError ? "bg-red-200" : "bg-green-200"}`}
            visible={visible}
            onDismiss={() => {}}
            action={{
                label: 'Dismiss',
                onPress: () => { setVisibility(false); },
            }}
        >
            {message}
        </Snackbar>
    )
}

export default ThemedSnackbar