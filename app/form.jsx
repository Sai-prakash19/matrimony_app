import { View, Text, TextInput, StyleSheet, Image, Pressable, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { db } from './../Config/FirebaseConfig';

export default function Register() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        dobDay: '',
        dobMonth: '',
        dobYear: '',
        pob: '',
        tobHour: '',
        tobMinute: '',
        phone: '',
        qualification: '',
        occupation: '',
        heightFeet: '',
        heightInch: '',
        complexion: '',
        fatherName: '',
        fatherOccupation: '',
        motherName: '',
        motherOccupation: '',
        brothers: '',
        sisters: '',
        houseType: '',
        nakshatram: '',
        raashi: '',
        city: '',
        district: '',
        state: '',
    });
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const requestPermissions = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'You need to grant permission to access the image library.');
            }
        };

        requestPermissions();
        navigation.setOptions({
            headerTitle: 'Register'
        });
    }, []);

    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (!image) return null;

        const storage = getStorage();
        const filename = image.substring(image.lastIndexOf('/') + 1);
        const storageRef = ref(storage, `images/${filename}`);

        const response = await fetch(image);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);

        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;
    };

    const handleInputChange = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }));
    };

    const validateForm = () => {
        const { name, surname, dobDay, dobMonth, dobYear, pob, tobHour, tobMinute, phone, qualification, occupation, heightFeet, heightInch, complexion, fatherName, motherName, brothers, sisters, houseType, nakshatram, raashi, city, district, state } = formData;
        return name && surname && gender && dobDay && dobMonth && dobYear && pob && tobHour && tobMinute && phone && qualification && occupation && heightFeet && heightInch && complexion && fatherName && motherName && brothers && sisters && houseType && nakshatram && raashi && city && district && state && image;
    };

    const onSubmit = async () => {
        if (submitted) {
            Alert.alert("Submission Error", "You have already submitted the form.");
            return;
        }

        if (!validateForm()) {
            Alert.alert("Validation Error", "Please fill in all fields, including the image.");
            return;
        }

        try {
            const downloadUrl = await uploadImage();

            await addDoc(collection(db, "users"), {
                ...formData,
                gender,
                imageUrl: downloadUrl 
            });

            setSubmitted(true);
            alert("Form submitted successfully!");
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Failed to submit the form.");
        }
    };

    return (
        <View style={styles.screenContainer}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.heading}>Fill the form to Register.</Text>

                <View style={styles.imagePickerContainer}>
                    <Pressable onPress={imagePicker} style={styles.imagePicker}>
                        <Image 
                            source={image ? { uri: image } : require('./../assets/images/placeholder.jpg')} 
                            style={styles.image} 
                        />
                    </Pressable>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('name', text)}
                        value={formData.name}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Surname*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('surname', text)}
                        value={formData.surname}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Gender*</Text>
                    <Picker 
                        selectedValue={gender}
                        style={styles.input}
                        onValueChange={(itemValue) => setGender(itemValue)}
                    >
                        <Picker.Item label="Select Gender" value="" />
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Date of Birth*</Text>
                    <View style={styles.row}>
                        <TextInput
                            style={styles.dateInput}
                            onChangeText={(text) => handleInputChange('dobDay', text)}
                            value={formData.dobDay}
                            placeholder="DD"
                            maxLength={2}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.dateInput}
                            onChangeText={(text) => handleInputChange('dobMonth', text)}
                            value={formData.dobMonth}
                            placeholder="MM"
                            maxLength={2}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.dateInput}
                            onChangeText={(text) => handleInputChange('dobYear', text)}
                            value={formData.dobYear}
                            placeholder="YYYY"
                            maxLength={4}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Place of Birth*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('pob', text)}
                        value={formData.pob}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Time of Birth*</Text>
                    <View style={styles.row}>
                        <TextInput
                            style={styles.timeInput}
                            onChangeText={(text) => handleInputChange('tobHour', text)}
                            value={formData.tobHour}
                            placeholder="HH"
                            maxLength={2}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.timeInput}
                            onChangeText={(text) => handleInputChange('tobMinute', text)}
                            value={formData.tobMinute}
                            placeholder="MM"
                            maxLength={2}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('phone', text)}
                        value={formData.phone}
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Qualification*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('qualification', text)}
                        value={formData.qualification}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Occupation*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('occupation', text)}
                        value={formData.occupation}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Height*</Text>
                    <View style={styles.row}>
                        <TextInput
                            style={styles.heightInput}
                            onChangeText={(text) => handleInputChange('heightFeet', text)}
                            value={formData.heightFeet}
                            placeholder="Feet"
                            maxLength={2}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.heightInput}
                            onChangeText={(text) => handleInputChange('heightInch', text)}
                            value={formData.heightInch}
                            placeholder="Inch"
                            maxLength={2}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Skin Complexion*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('complexion', text)}
                        value={formData.complexion}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Father's Name*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('fatherName', text)}
                        value={formData.fatherName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Father's Occupation*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('fatherOccupation', text)}
                        value={formData.fatherOccupation}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mother's Name*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('motherName', text)}
                        value={formData.motherName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mother's Occupation*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('motherOccupation', text)}
                        value={formData.motherOccupation}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Number of Brothers*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('brothers', text)}
                        value={formData.brothers}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Number of Sisters*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('sisters', text)}
                        value={formData.sisters}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>House Type*</Text>
                    <Picker 
                        selectedValue={formData.houseType}
                        style={styles.input}
                        onValueChange={(itemValue) => handleInputChange('houseType', itemValue)}
                    >
                        <Picker.Item label="Select House Type" value="" />
                        <Picker.Item label="Own" value="Own" />
                        <Picker.Item label="Rented" value="Rented" />
                    </Picker>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nakshatram*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('nakshatram', text)}
                        value={formData.nakshatram}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Raashi*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('raashi', text)}
                        value={formData.raashi}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>City*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('city', text)}
                        value={formData.city}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>District*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('district', text)}
                        value={formData.district}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>State*</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('state', text)}
                        value={formData.state}
                    />
                </View>

                <TouchableOpacity onPress={onSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0d1db',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    imagePickerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePicker: {
        borderWidth: 1,
        borderColor: '#b95d8d',
        borderRadius: 5,
        overflow: 'hidden',
        width: 100,
        height: 100,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#b95d8d', // Changed border color
        backgroundColor: '#fff', // Kept input fields white
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#b95d8d', // Changed border color
        backgroundColor: '#fff', // Kept input fields white
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        width: '30%',
        marginRight: 5, // Added margin for spacing
    },
    timeInput: {
        borderWidth: 1,
        borderColor: '#b95d8d', // Changed border color
        backgroundColor: '#fff', // Kept input fields white
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        width: '45%',
        marginRight: 5, // Added margin for spacing
    },
    heightInput: {
        borderWidth: 1,
        borderColor: '#b95d8d', // Changed border color
        backgroundColor: '#fff', // Kept input fields white
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        width: '45%',
        marginRight: 5, // Added margin for spacing
    },
    button: {
        backgroundColor: '#b95d8d',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'outfit-medium',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
