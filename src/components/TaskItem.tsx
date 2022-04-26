import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/editIcon.png";
import React, { useState, useRef, useEffect } from "react";

const TaskItem = ({ toggleTaskDone, task, removeTask, index, editTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const textInputRef = useRef<TextInput>(null)
    const handleStartEditing = () => {
        setIsEditing(true)
    }
    const handleCancelEditing = () => {
        setNewTitle(task.title)
        setIsEditing(false)
    }
    const handleSubmitEditing = () => {
        editTask(task.id, newTitle)
        setIsEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

    return (
        <>
        <View style={styles.container}>
            <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
            >
                <View
                    testID={`marker-${index}`}
                    style={!task.done ? styles.taskMarker : styles.taskMarkerDone}
                >
                    {task.done && (
                        <Icon
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                    )}
                </View>

                <TextInput
                    ref={textInputRef}
                    style={ task.done ? styles.taskTextDone : styles.taskText}
                    value={newTitle}
                    editable={isEditing}
                    onChangeText={setNewTitle}
                    onSubmitEditing={handleSubmitEditing}
                />

            </TouchableOpacity>
        </View>

        <View style={ styles.iconsContainer } >
            { isEditing ? (
                <TouchableOpacity
                    onPress={handleCancelEditing}
                >
                    <Icon name="x" size={24} color="#b2b2b2" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={handleStartEditing}
                >
                    <Image source={editIcon} />
                </TouchableOpacity>
            ) }

            <View
                style={ styles.iconsDivider }
            />

            <TouchableOpacity
                disabled={isEditing}
                onPress={() => removeTask(task.id)}
            >
                <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
            </TouchableOpacity>
        </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"

    },
    iconsContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 12,
        paddingRight: 24,

    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: '#C4C4C4',
        marginHorizontal: 12
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    }
})

export default TaskItem;